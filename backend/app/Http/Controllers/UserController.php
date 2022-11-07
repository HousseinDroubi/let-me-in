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
    }
}
