<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){
        
        // In this table we must have only two accounts, one for the admin, and the other
        // for the Raspberry Pi
        Schema::create('admin_details', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps();
        });
    }

    public function down(){

        Schema::dropIfExists('admin_details');
    }
};
