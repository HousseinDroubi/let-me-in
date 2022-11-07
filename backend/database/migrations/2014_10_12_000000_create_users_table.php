<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            // The default of username is 'Unkown' since in our case, sometimes a new car plate 
            // that's not neither in the approved list, nor in the blocked list and 
            // we need the decision of the admin of this new user, so he can update his/her data later on.
            $table->string('username')->default('Unkown');
            $table->string('profile_url')->nullable();
            // When user type is '0', that means it's a normal user, while when it's '1' , that means
            // it's an admin
            $table->string('user_type')->default('0');
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('users');
    }
};
