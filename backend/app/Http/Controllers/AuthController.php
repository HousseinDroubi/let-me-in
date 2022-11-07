<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use App\Models\User;
use App\Models\Code;
use App\Models\AdminDetail;
use Illuminate\Http\Request;
use App\Mail\Code as MailCode;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller{

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:3|max:20|unique:users',
            'email' => 'required|string|email|min:5|max:30|unique:admin_details',
            'password' => 'required|string|min:5|max:30',
            'profile_url' => 'required|string',
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $request->profile_url = $this->saveImage($request->profile_url);
            
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error while adding an admin',
                'err'=> $th->getMessage()
            ], 400);
        }

        // Create user of type '1' since this function is just for admins
        $admin = User::create([
                'username' => $request->username,
                'profile_url' => $request->profile_url,
                'user_type' => '1',
            ]);
        //Create admin details contains user_id from user table, email and password 
        $admin_details = AdminDetail::create([
            'user_id'=>$admin->id,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        
        return response()->json([
            'message' => 'Admin successfully registered'
        ], 201);
    }

    public function saveImage($profile_url){
        // Base path of saving images
        $users_images_path = public_path()."\\assets\\images\\user\\";

        // Get the current date and time
        date_default_timezone_set('Asia/Beirut');
        $current_time = date ("Y-m-d H:i:s");

        // Decode the image
        $image_decoded =base64_decode($profile_url);

        // Give it new unique name
        $user_image_path = $users_images_path.strtotime($current_time).".png";

        // Save it into base path
        file_put_contents($user_image_path, $image_decoded);
        return $user_image_path;
    }

    public function login(Request $request){
        auth()->shouldUse('api');
        $credentials = $request->only('email','password');
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function getAdminData(){
        $admin= [
            "user"=>auth()->user(),
            "admin_deitls"=>auth()->user()->user,  
        ];
        return response()->json(auth()->user());
    }

    protected function respondWithToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function denyAccess(){
        return response()->json([
            'message' => "access_denied"
        ]);
    }

    public function updateAdminData(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'string|min:3|max:20|unique:users',
            'email' => 'string|email|min:5|max:30|unique:admin_details',
            'profile_url' => 'string',
        ]);
        if(count($request->all()) == 0){
            return response()->json([
                'message' => 'At least one field required'
            ], 400);
        }else  if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } 
        // Get the admin
        $admin = auth()->user();
        // Change the admin if he/she is requesting to change the username, email or profile picture
        $admin->user->username = ($request->username!='') ? $request->username : $admin->user->username;
        $admin->email = ($request->email!='') ? $request->email : $admin->email;

        if($request->profile_url){
            try {
                unlink($admin->user->profile_url);
                $admin->user->profile_url = $this->saveImage($request->profile_url);
            } catch (\Throwable $th) {
                return response()->json([
                    'message' => 'Error while updating admin',
                    'err'=> $th->getMessage()
                ], 400);
            }
        }

        // Save the changes in both tables, users and admin_details
        if($admin->save() &&  $admin->user->save()){
            return response()->json([
                "message" => "Admin updated Successfully",
                "data" => $admin
            ]);
        }
        return response()->json([
            "message" => "Error while updating admin"
        ]);
    }
    
    public function sendCode(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|min:5|max:30',
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        // Here, we are checking if there's an admin with the same email passed to this function
        $admin = AdminDetail::where("email",$request->email)->first();
        if(!$admin){
            return response()->json([
                "message" => "Email not exist."
            ]);
        }
        // Here, we are checking if the admin's id is 1 or not, since he's the only one who can ask for this route 
        else if($admin->user_id!='1'){
            return redirect()->route('access-denied');
        }

        // In the below syntax, we are checking if there's a code existed before and not verified yet.
        $code = Code::where("user_id",$admin->user_id)->where('verified','0')->first();
        // In case we got the code, no need to add new row to the codes table
        if($code){
            // Send the email to the admin
            Mail::to($request->email)->send(new MailCode($code->code,$admin->user->username));
            return response()->json([
                "message" => "done",
                "data" => "Code re-sent"
            ]);
        }
        // In case we didn't get the code, we have to initiate new code and send it to user, in addition, to add
        // this code to the codes table
        $randome_code = random_int(100000, 999999);

        $code = Code::create([
            'code' => $randome_code,
            'user_id' => $admin->user_id
        ]);
        // Send the email
        Mail::to($request->email)->send(new MailCode($randome_code,$admin->user->username));
        return response()->json([
            "message" => "done",
            "data" => "Code sent"
        ]);
    }

    public function verifyCode(Request $request){
        $validator = Validator::make($request->all(), [
            'code' => 'required|digits:6',
            'email' => 'required|string|email|min:5|max:30',
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        // Here, we are checking if there's an admin with the same email passed to this function
        $admin = AdminDetail::where("email",$request->email)->first();
        if(!$admin){
            return response()->json([
                "message" => "Email not exist."
            ]);
        }
        
        // Here, we are checking if the admin's id is 1 or not, since he's the only one who can ask for this route 
        if($admin->user_id!='1'){
            return redirect()->route('access-denied');
        }
        $code = Code::where('verified',0)->first();
        if(!$code){
            return redirect()->route('access-denied');
        }

        // In the below syntax, we are checking if the code passed to this function is exisitng in table codes.
        // But, we've also added verified condition, because the generator may generate two equal codes.
        $code = Code::where('code',$request->code)->where('verified',0)->first();
        if($code){
            return response()->json([
                "message" => "correct code"
            ]);
        }
        return response()->json([
            "message" => "wrong code"
        ]);
    }

    public function changeForgottenPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'code' => 'required|digits:6',
            'email' => 'required|string|email|min:5|max:30',
            'password' => 'required|string|min:5|max:30',
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Here, we are checking if there's an admin with the same email passed to this function
        $admin = AdminDetail::where("email",$request->email)->first();

        if(!$admin){
            return response()->json([
                "message" => "Email not exist."
            ]);
        }

        // Here, we are checking if the admin's id is 1 or not, since he's the only one who can ask for this route 
        if($admin->user_id!='1'){
            return redirect()->route('access-denied');
        }
        $code = Code::where('verified',0)->first();
        if(!$code){
            return redirect()->route('access-denied');
        }

        // In the below syntax, we are checking if the code passed to this function is exisitng in table codes.
        // But, we've also added verified condition, because the generator may generate two equal codes.
        $code = Code::where('code',$request->code)->where('verified',0)->first();

        if($code){
            $admin->password = Hash::make($request->password);
            $code->verified = 1;
            if($admin->save() && $code->save()){
                return response()->json([
                    "message" => "Password changed."
                ]);
            }
            return response()->json([
                "message" => "Something went wrong!"
            ]);
        }
        // access denied here is because the code must be existed, after verifying it from verifycode() above.
        return redirect()->route('access-denied');
    }
}
