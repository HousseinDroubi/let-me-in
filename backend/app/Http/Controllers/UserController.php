<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;



class UserController extends Controller{

    public function addUser(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:3|max:20',
            'car_type' => 'required|string|min:3|max:30',
            'car_plate_number' => 'required|string|min:2|max:7|unique:user_details',
            'profile_url' => 'string',
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        if($request->profile_url){
            try {
                $request->profile_url =  (new AuthController)->saveImage($request->profile_url);
                
            } catch (\Throwable $th) {
                return response()->json([
                    'message' => 'Error while adding a user',
                    'err'=> $th->getMessage()
                ], 400);
            }
        }

        // Create new user
        $user = User::create([
            'username' => $request->username,
            'profile_url' => $request->profile_url,
        ]);

         // Continue creating user details in user_details table
        $user_details = UserDetail::create([
            'user_id' => $user->id,
            'car_type' => $request->car_type,
            'car_plate_number' => $request->car_plate_number,
        ]);

        $data = [    
            "user"=>$user,
            "user_details"=>$user_details
        ];

        return response()->json([
            'message' => 'User successfully registered',
            'data' => $data
            ], 201);
    }

    public function updateUserData(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|min:3',
            'username' => 'string|min:3|max:20|unique:users',
            'car_type' => 'string|min:3|max:30',
            'car_plate_number' => 'string|min:2|max:7|unique:user_details',
            'profile_url' => 'string',
            'decision'=>'integer|min:0|max:1'
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        // Since the id is required. Hence, if the count of the fields of request is 1, that means nothing
        // has been sent with the id
        else if(count($request->all()) == 1){
            return response()->json([
                'message' => 'At least one field required'
            ], 400);
        }
        // Get the user in order to update data
        $user = User::find($request->id);
        if(!$user){
            return response()->json([
                'message' => 'User not found'
            ], 400);
        }

        // The decision here is for the car plate that's neither in the approved list, nor in the blocked list.
        // Hence, in case this user has been approved or blocked from admin, the decision must be '0' or '1'
        // Otherwise, the admin will be updating a user from users page
        if($request->decision)
        $user->status = $request->decision;
    
        $user->username = ($request->username!='') ? $request->username : $user->username;
        $user->userDetail->car_type = ($request->car_type!='') ? $request->car_type : $user->userDetail->car_type;
        $user->userDetail->car_plate_number = ($request->car_plate_number!='') ? $request->car_plate_number : $user->userDetail->car_plate_number;

        if($request->profile_url){
            try {
                unlink($user->profile_url);
                $user->profile_url = (new AuthController)->saveImage($request->profile_url);
            } catch (\Throwable $th) {
                return response()->json([
                    'message' => 'Error while updating user',
                    'err'=> $th->getMessage()
                ], 400);
            }
        }
        if($user->save() && $user->userDetail->save()){
            return response()->json([
                "message" => "user updated Successfully",
                "data" => $user
            ]);
        }
        return response()->json([
            "message" => "Error while updating user"
        ]);
    }

    public function blockUser(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|min:3'
        ]);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $user = User::find($request->id);
        if(!$user){
            return response()->json([
                'message' => 'User not found'
            ], 201);
        }
    }
}
