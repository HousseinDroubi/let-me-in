<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){
        
        // In this table, we must have only one record, which declare the barrier status
        Schema::create('barrier_statuses', function (Blueprint $table) {
            $table->id();
            // The default of status is '2', which means the system of Raspberry Pi must
            // work normally. While, when the status is '1' or '0', that means the barrier
            // is still respectively opened or closed until further notice from the admin 
            $table->integer('status')->default('2');
            $table->timestamps();
        });
    }

    public function down(){

        Schema::dropIfExists('barrier_statuses');
    }
};
