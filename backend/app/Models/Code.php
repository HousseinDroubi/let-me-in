<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model{

    use HasFactory;

    protected $fillable = [
        'code',
        'user_id',
        'verified',
    ];

    // The table code belongs to user table of users of type '1', which is the admin
    public function user(){
        return $this->belongsTo(User::class);
    }
}
