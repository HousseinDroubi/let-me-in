<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model{

    use HasFactory;

    protected $fillable = [
        'user_id',
        'arrival_time',
        'departure_time',
    ];

    // The table event belongs to user table for users of type '0', which are the users (not admins)
    public function user(){
        return $this->belongsTo(User::class);
    }
}
