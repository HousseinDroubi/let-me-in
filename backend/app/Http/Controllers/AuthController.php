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
    }
}
