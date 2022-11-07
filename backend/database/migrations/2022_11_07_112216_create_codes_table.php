<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){

        Schema::create('codes', function (Blueprint $table) {
            $table->id();
            // The code that will be sent to admin when he forgot his/her password
            $table->integer('code');
            // User id is the same of id of users table of type '1'
            $table->string('user_id');
            // The default of verified is '0' which means that the code didn't verified yet.
            // While, verified is '1', that means the code has been verified
            $table->integer('verified')->default('0');
            $table->timestamps();
        });
    }
    public function down(){

        Schema::dropIfExists('codes');
    }
};
