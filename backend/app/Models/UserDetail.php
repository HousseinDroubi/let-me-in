<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model{
    
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'car_type',
        'car_plate_number',
        'status',
    ];

}
