<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SpaceController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/spaces', [SpaceController::class, 'index']); 
Route::get('/spaces/{id}', [SpaceController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    //Spaces routes
    Route::post('/spaces', [SpaceController::class, 'store']);
    Route::put('/spaces/{id}', [SpaceController::class, 'update']);
    Route::delete('/spaces/{id}', [SpaceController::class, 'destroy']);
});
