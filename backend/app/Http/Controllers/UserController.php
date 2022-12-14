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
            'username' => 'string|min:3|max:20',
            'car_type' => 'string|min:3|max:30',
            'car_plate_number' => 'string|min:2|max:7',
            'profile_url' => 'string',
            'decision'=>'integer|min:0|max:1'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        // Since the id is required. Hence, if the count of the fields of request is 1, that means nothing
        // has been sent with the id
        }else if(count($request->all()) == 1){
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
        // Otherwise, the admin will be updating a user from waiting page in the frontend
        if($request->decision!='')
            $user->userDetail->status = $request->decision;
    
        $user->username = ($request->username!='') ? $request->username : $user->username;
        $user->userDetail->car_type = ($request->car_type!='') ? $request->car_type : $user->userDetail->car_type;
        
        // Here, we are checking if the admin want to update the car plate number, but this car plate
        // number is existed before. Hence, we should return that's already taken. Otherwise, he can 
        // update it
        if($request->car_plate_number){
            if($user->userDetail->car_plate_number!=$request->car_plate_number){
                $user_check = User::with('userDetail')
                ->whereRelation('userDetail','car_plate_number',$request->car_plate_number)
                ->whereRelation('userDetail','user_id',"!=",$request->id)
                ->get();

                if(count($user_check)==1){
                return response()->json([
                    'message' => 'car plate number already taken'
                ], 201);
                }
                $user->userDetail->car_plate_number=$request->car_plate_number;
            }
        }    
        
        if($request->profile_url){

            try {
                if($user->profile_url!=null)
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
        
        // Here, in case the status of the user is already '1', so, he/she is already blocked
        if($user->userDetail->status=='1'){
            return response()->json([
                'message' => 'User already blocked'
            ], 201);
        }

        //Blocking user is by changing the status to '1'
        $user->userDetail->status='1';
        if($user->userDetail->save()){
            return response()->json([
                "message" => "user blocked successfully",
                "data" => $user
            ]);
        }
        return response()->json([
            "message" => "Error while blocking user"
        ]);
    }

    public function unblockUser(Request $request){

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

        // Here, in case the status of the user is already '0', so, he/she is already unblocked
        if($user->userDetail->status=='0'){
            return response()->json([
                'message' => 'User already unblocked'
            ], 201);
        }

        //Unblocking user is by changing the status to '1'
        $user->userDetail->status='0';
        if($user->userDetail->save()){
            return response()->json([
                "message" => "user unblocked successfully",
                "data" => $user
            ]);
        }
        return response()->json([
            "message" => "Error while blocking user"
        ]);
    }

    public function getUsers(){

        // The users that have a status = '0' are the normal users
        $users = User::with('userDetail')->whereRelation('userDetail','status',0)->get();

        return response()->json([
            'message' => 'done',
            'data' =>$users
        ], 201);
    }

    public function getBlockedUsers(){

        // The users that have a status = '1' are the blocked users
        $users = User::with('userDetail')->whereRelation('userDetail','status',1)->get();

        return response()->json([
            'message' => 'done',
            'data' =>$users
        ], 201);
    }

    public function getWaitingUser(){

        // The user that has a status = '2' is the waiting user
        $users = User::with('userDetail')->whereRelation('userDetail','status',2)->first();

        return response()->json([
            'message' => 'done',
            'data' =>$users
        ], 201);
    }
}
