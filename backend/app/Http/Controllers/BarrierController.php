<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Models\BarrierStatus;


class BarrierController extends Controller{

    public function getBarrierStatus(){
        $barrier_status = BarrierStatus::get()->first();
        if($barrier_status->status=="0"){
            return "closed";
        }else if($barrier_status->status=="1"){
            return "opened";
        }
        return "normal";
    }
}
