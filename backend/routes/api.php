<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(["prefix"=> "v0.1"], function(){
    Route::group(["middleware" => "auth:api"], function(){
        Route::get("/get_admin_data", [AuthController::class, "getAdminData"])->name("get-admin-data");
    });
    Route::post("/login", [AuthController::class, "login"])->name("login");
    Route::post("/register", [AuthController::class, "register"])->name("register");
    Route::get("/access_denied", [AuthController::class, "denyAccess"])->name("access-denied");
    Route::post("/send_code", [AuthController::class, "sendCode"])->name("send-code");

});