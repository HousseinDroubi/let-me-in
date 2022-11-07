<?php

namespace App\Http\Controllers;

use Auth;
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
        // equal to this non duplicate row. Hence, we might have in one day many events that happened
        $dates = Event::selectRaw('date(arrival_time) as date')->groupBy('date')->get();
        $all_events =[];
        foreach($dates as $date){
            $day_numbers = json_decode($date);
            $events_per_day= Event::whereDate('arrival_time','=',$day_numbers->date)->get();
            foreach($events_per_day as $event_per_day){
                $event_per_day->user;
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
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:png,jpg,jpeg|max:2048'
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        
        $info = pathinfo($_FILES['image']['name']);
        $image = $info['basename'];
        $image_path = public_path()."/assets/images/car/".$image;
        move_uploaded_file($_FILES['image']['tmp_name'],$image_path);
        // TODO: Get the number of plate car number 
    }

    public function addOrUpdateEvent(Request $request){
        $validator = Validator::make($request->all(), [
            'car_plate_number' => 'required|string|min:2|max:7',
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $user_details = UserDetail::where('status','2')->first();
        if($user_details){
            return 'close';
        }

        $user_details = UserDetail::where('car_plate_number',$request->car_plate_number)->first();
        if($user_details){
            if($user_details->status=='1')
                return 'close';
            else{
                date_default_timezone_set('Asia/Beirut');
                $current_time = date ("Y-m-d H:i:s");
                $event = Event::where('user_id',$user_details->user_id)->whereNull('departure_time')->first();
                if($event){
                    $event->departure_time = $current_time;
                    if($event->save()){
                        return 'open';
                    }
                    return 'close';
                }
                Event::create([
                    'user_id' => $user_details->user_id,
                    'arrival_time' => $current_time,
                ]);
                return 'open';
            }    
        }

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
    
        $admin = User::where('id',1)->first();
        $admin->adminDetail;
        Mail::to($admin->adminDetail->email)->send(new Acknowledgement($admin->username,$user->created_at->format('Y-m-d H:i:s'),$request->car_plate_number));
        return 'wait';
    }
}
