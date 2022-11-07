<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){

        Schema::create('user_details', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->unique();
            // As the same case of users table, the default of car type is 'Unkown',
            // and the admin can update this user's data later on
            $table->string('car_type')->default('Unkown');
            $table->string('car_plate_number')->unique();
            // The default of status is '0', which means this user is in the accepted list.
            // Also, when the status is '1', this means that this user is in the bloced list.
            // Last, when the status is '2', here, we have someone who's waiting on the door
            // (on the front of the barrier)
            $table->integer('status')->default('0');
            $table->timestamps();
        });
    }

    public function down(){

        Schema::dropIfExists('user_details');
    }
};
