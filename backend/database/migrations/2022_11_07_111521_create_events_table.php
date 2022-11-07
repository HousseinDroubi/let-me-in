<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){

        Schema::create('events', function (Blueprint $table) {
            $table->id();
            //user id here is the same of id of table users of type '0'
            $table->string('user_id');
            $table->timestamp('arrival_time')->nullable();
            $table->timestamp('departure_time')->nullable();
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('events');
    }
};
