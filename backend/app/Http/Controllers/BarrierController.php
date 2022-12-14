<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Models\BarrierStatus;

class BarrierController extends Controller{

    public function getBarrierStatus(){

        $barrier_status = BarrierStatus::get()->first();
        // In case the barrier status from barrier_statuses table (first record) was '0'or '1', the barrier in the 
        // hardware part will be respectively 'closed' or 'opened' until further notice from the admin. Otherwise, the
        // response will be 'normal' which makes the Raspberry Pi start continue the main required functions.
        if($barrier_status->status=="0"){
            return "closed";
        }else if($barrier_status->status=="1"){
            return "opened";
        }
        return "normal";
    }

    public function changeBarrierStatus(Request $request){

        $validator = Validator::make($request->all(), [
            'status' => 'required|integer|min:0|max:2'
        ]);
        
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $barrier_status = BarrierStatus::get()->first();
        // Here, we are checking if the barrier status is the same as the one sent by admin, and in case they are
        // the same, we should return 'already same status'
        if($barrier_status->status == $request->status){
            return response()->json([
                "message" => "already same status"
            ]);
        }
        
        $barrier_status->status=$request->status;
        if($barrier_status->save()){
            return response()->json([
                "message" => "barrier status changed"
            ]);
        }
        return response()->json([
            "message" => "error while changing status"
        ]);
    }
}
