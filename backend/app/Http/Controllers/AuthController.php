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
        $admin = User::create([
                'username' => $request->username,
                'profile_url' => $request->profile_url,
                'user_type' => '1',
            ]);
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
}
