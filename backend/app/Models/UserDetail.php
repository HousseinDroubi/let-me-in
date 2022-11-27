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

    // The table user details belongs to table user for users of type '0'
    public function user(){
        return $this->belongsTo(User::class);
    }
}
