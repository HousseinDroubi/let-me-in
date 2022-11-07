<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
Route::group(["prefix"=> "v0.1"], function(){
    Route::group(["middleware" => "auth:api"], function(){
        Route::get("/get_admin_data", [AuthController::class, "getAdminData"])->name("get-admin-data");
        Route::post("/update_admin_data", [AuthController::class, "updateAdminData"])->name("update-admin-data");
        Route::post("/change_admin_password", [AuthController::class, "changeAdminPassowrd"])->name("change-admin-password");
        Route::post("/add_user", [UserController::class, "addUser"])->name("add-user");
        Route::post("/edit_user", [UserController::class, "updateUserData"])->name("edit-user");
        Route::post("/block_user", [UserController::class, "blockUser"])->name("block-user");
        Route::post("/unblock_user", [UserController::class, "unblockUser"])->name("unblock-user");
        Route::get("/users", [UserController::class, "getUsers"])->name("users");
        Route::get("/blocked_users", [UserController::class, "getBlockedUsers"])->name("blocked-users");
        Route::get("/get_events", [EventController::class, "getEvents"])->name("get-events");

    });
    Route::post("/login", [AuthController::class, "login"])->name("login");
    Route::post("/register", [AuthController::class, "register"])->name("register");
    Route::get("/access_denied", [AuthController::class, "denyAccess"])->name("access-denied");
    Route::post("/send_code", [AuthController::class, "sendCode"])->name("send-code");
    Route::post("/verify_code", [AuthController::class, "verifyCode"])->name("verify-code");
    Route::post("/change_forgotten_password", [AuthController::class, "changeForgottenPassword"])->name("change-forgotten-password");

});