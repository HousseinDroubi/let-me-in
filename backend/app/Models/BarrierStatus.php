<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarrierStatus extends Model{

    use HasFactory;

    // In the table barrier_statuses, we have one record, and we must return 'status'
    // of that record
    protected $fillable = [
        'status',
    ];
}
