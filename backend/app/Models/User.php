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

    public function adminDetail(){
        return $this->hasOne(AdminDetail::class);
    }
    public function userDetail(){
        return $this->hasOne(UserDetail::class);
    }
    public function event(){
        return $this->hasMany(Event::class);
    }
    public function code(){
        return $this->hasMany(Code::class);
    }
    
}
