<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(["prefix"=> "v0.1"], function(){
    Route::group(["middleware" => "auth:api"], function(){
        Route::get("/get_admin_data", [AuthController::class, "getAdminData"])->name("get-admin-data");
        Route::post("/add_user", [UserController::class, "addUser"])->name("add-user");

    });
    Route::post("/login", [AuthController::class, "login"])->name("login");
    Route::post("/register", [AuthController::class, "register"])->name("register");
    Route::get("/access_denied", [AuthController::class, "denyAccess"])->name("access-denied");
    Route::post("/send_code", [AuthController::class, "sendCode"])->name("send-code");
    Route::post("/verify_code", [AuthController::class, "verifyCode"])->name("verify-code");
    Route::post("/change_forgotten_password", [AuthController::class, "changeForgottenPassword"])->name("change-forgotten-password");

});