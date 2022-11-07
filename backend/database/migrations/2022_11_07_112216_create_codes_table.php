<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){

        Schema::create('codes', function (Blueprint $table) {
            $table->id();
            $table->integer('code');
            $table->string('user_id');
            $table->integer('verified')->default('0');
            $table->timestamps();
        });
    }
    public function down(){
        
        Schema::dropIfExists('codes');
    }
};
