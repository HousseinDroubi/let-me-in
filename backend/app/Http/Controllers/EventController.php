<?php

namespace App\Http\Controllers;

use Auth;
use DateTime;
use Validator;
use App\Models\Admin;
use App\Models\User;
use App\Models\Event;
use App\Models\UserDetail;
use App\Models\AdminDetail;
use App\Mail\Acknowledgement;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;

class EventController extends Controller{

    public function getEvents(){
        // In this function, we are getting the non duplicates rows, and then catch any row that has the arrival time
        // equal to the time of arrival time of this non duplicate row. Hence, we might have in one day many events that happened
        $dates = Event::selectRaw('date(arrival_time) as date')->groupBy('date')->get();
        $all_events =[];
        foreach($dates as $date){
            $day_numbers = json_decode($date);
            $events_per_day= Event::whereDate('arrival_time','=',$day_numbers->date)->get();
          
            foreach($events_per_day as $event_per_day){
                
                $event_per_day->user->userDetail;
                
                // Here, we are getting the difference between the arrival date and departure date
                if($event_per_day->departure_time!=null){
                    $interval =(new DateTime($event_per_day->arrival_time))->diff((new DateTime($event_per_day->departure_time)));
                    $month= $interval->m;
                    $hour = $interval->h;
                    $min = $interval->i;
                    $sec = $interval->s;
                    $difference="";
                    if($month!=0)
                        $difference.=$month."m,";
                    if($hour!=0)
                        $difference.=$hour."hr,";
                    if($min)
                        $difference.=$min."min,";
                    if($sec)
                        $difference.=$sec."sec,"; 
                    $event_per_day->setAttribute('difference',substr($difference,0,-1));
                }else{
                    $event_per_day->setAttribute('difference','');
                }
            }   
            $all_events[]=[
                'date'=>$day_numbers->date,
                'events'=>$events_per_day,
            ];
            }   
        return response()->json([
            "status" => "done",
            "data" => $all_events
        ]);
    }

    public function checkCarPlate(Request $request){
        // Get the image from Raspberry Pi
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:png,jpg,jpeg|max:2048'
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        
        // Save the image inside public folder with same name
        $info = pathinfo($_FILES['image']['name']);
        $image = $info['basename'];
        $image_path = public_path()."/assets/images/car/".$image;

        // If the file saved successfully, we have to execute the ocr.py implemented into public/OCR
        // Otherwise, we have to return close
        if(move_uploaded_file($_FILES['image']['tmp_name'],$image_path)){
            // Get the path of ocr.py from .evn file
            $ocr_python_url= env('OCR_PYTHON_PATH');

            // The command to be executed
            $command_order = "python ".$ocr_python_url;

            // Execute the command and get the output
            $command = escapeshellcmd($command_order);
            $output=shell_exec($command);
            $new_output = "";
            for($i=0;$i<strlen($output);$i++){
                if (preg_match('~[0-9]+~', $output[$i]) || preg_match('~[A-Z]+~', $output[$i]) ) {
                    $new_output .=$output[$i];
                }
            }
            // Redirect to 'add_update_event' route implemented in this controller below with the car plate
            // number
            $request = Request::create('/add_update_event', 'POST', ['car_plate_number' => $new_output]);    
            return $this->addOrUpdateEvent($request); 
        }
        // Return 'close' if the image is not uploaded successfully
        return "close";
    }

    public function addOrUpdateEvent(Request $request){
        $validator = Validator::make($request->all(), [
            'car_plate_number' => 'required|string|min:2|max:7',
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Here, we are checking if someone is already waiting, so, we should return 'close' in order to get the 
        // admin's acknowledgement about the last 'waiting user'
        $user_details = UserDetail::where('status','2')->first();
        if($user_details){
            return 'close';
        }
        
        $user_details = UserDetail::where('car_plate_number',$request->car_plate_number)->first();
        if($user_details){
            // In case the user status was '1', which means the user is blocked and cannot enter.
            if($user_details->status=='1')
                return 'close';
            else{
                // Otherwise, we should insert a new row into events table
                date_default_timezone_set('Asia/Beirut');
                $current_time = date ("Y-m-d H:i:s");
                $event = Event::where('user_id',$user_details->user_id)->whereNull('departure_time')->first();
                // In case the event is existed before, that means the car was existing in the building before
                if($event){
                    $event->departure_time = $current_time;
                    if($event->save()){
                        return 'open';
                    }
                    return 'close';
                }
                // In case the above event wasn't exist, we should insert a new event
                Event::create([
                    'user_id' => $user_details->user_id,
                    'arrival_time' => $current_time,
                ]);
                return 'open';
            }    
        }
        // In this case, this user wasn't existed in our system. Hence, we should add him/her to the system with status = '2'
        // which means 'waiting user', in order to get admin's acknowledgement later on
        $user = User::create([
            'username' => 'Unkown',
            'profile_url' => NULL,
            
        ]);

        $user_details = UserDetail::create([
            'user_id'=>$user->id,
            'car_type' => 'Unkown',
            'car_plate_number' => $request->car_plate_number,
            'status' => '2',
        ]);
    
        // Get the username of the admin
        $admin = User::where('id',1)->first();
        $admin->adminDetail;
        // Send an email to the admin taking the new car plate number and the date and time this user came at
        Mail::to($admin->adminDetail->email)->send(new Acknowledgement($admin->username,$user->created_at->format('Y-m-d H:i:s'),$request->car_plate_number));
       
        //Return the the car plate number to the Raspberry Pi in case we have a new user
        //So, the Raspberyy Pi will ask for this car plate number maximum 3 times each 10 seconds 
        return $request->car_plate_number;
    }

    public function getCarDecision($car_plate_number){
        if(strlen($car_plate_number)<2 || strlen($car_plate_number)>8){
            return 'wrong entry';
        }
        $user_details = UserDetail::where('car_plate_number',$car_plate_number)->first();
        if(!$user_details){
            return 'wrong entry';
        }
        // Here, if we got status = '2', that means the admin didn't confirm the 'waiting user' yet
        if($user_details->status=='2')
            return 'wait';
        // Here, if we got status = '1', that means the admin has blocked the 'waiting user'     
        else if($user_details->status=='1')
            return 'close';

        // In case the was no event made by this user before, that means we should redirect this function to another
        // route which is addOrUpdateEvent in order to insert a new event since the barrier will 'open'
        $request = Request::create('/add_update_event', 'POST', ['car_plate_number' => $car_plate_number]);    
        return $this->addOrUpdateEvent($request);  
    }
}
