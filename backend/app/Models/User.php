<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model{

    use HasFactory;

    protected $fillable = [
        'username',
        'profile_url',
        'user_type',
    ];

    // The rows in table user of user_type = '1', has only one record into admin_details table, which is for the amdin
    public function adminDetail(){
        return $this->hasOne(AdminDetail::class);
    }

    // The rows in table user of user_type = '0', has only one record into user_details table, which is the user
    public function userDetail(){
        return $this->hasOne(UserDetail::class);
    }

    // The rows in table user of user_type = '0', may have many records into events table
    public function event(){
        return $this->hasMany(Event::class);
    }

    // The rows in table user of user_type = '1', may have many records into admin_details table, which is the admin
    public function code(){
        return $this->hasMany(Code::class);
    }

}
