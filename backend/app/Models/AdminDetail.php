<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class AdminDetail extends Authenticatable implements JWTSubject{

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'user_id',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    public function getJWTIdentifier(){

        return $this->getKey();
    }

    public function getJWTCustomClaims(){

        return [];
    }

    // The table admin details belongs to table user which are of type '1'
    public function user(){
        return $this->belongsTo(User::class);
    }
}
