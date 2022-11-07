<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Models\BarrierStatus;


class BarrierController extends Controller{

    public function getBarrierStatus(){
        $barrier_status = BarrierStatus::get()->first();
        // In case the barrier status from barrier_statuses table (first record) was '0'or '1', the barrier in the 
        // Hardware part will be respectively 'closed' or 'opened' until further notice from the admin. Otherwise, the
        // response will be 'normal' which makes the Raspberry Pi start continue the main  required functions
        if($barrier_status->status=="0"){
            return "closed";
        }else if($barrier_status->status=="1"){
            return "opened";
        }
        return "normal";
    }
}
