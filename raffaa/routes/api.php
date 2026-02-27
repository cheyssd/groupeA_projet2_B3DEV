<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SpaceController;
use App\Http\Controllers\Api\ReservationController;

//Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');


//Public
Route::get('/spaces', [SpaceController::class, 'index']);
Route::get('/spaces/{space}', action: [SpaceController::class, 'show']);
Route::get('/spaces/available', [SpaceController::class, 'availableSpaces']);


//Authentification
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::apiResource('reservations', ReservationController::class)
        ->only(['index', 'store', 'show', 'destroy']);
});


//Admin
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::apiResource('spaces', SpaceController::class)
        ->except(['index', 'show']);

    Route::patch('/reservations/{id}/status', [ReservationController::class, 'updateStatus']);
    Route::patch('/reservations/{id}/paid', [ReservationController::class, 'markAsPaid']);
});



// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/logout', [AuthController::class, 'logout']);
//     Route::get('/user', [AuthController::class, 'user']);

//     //routes pour les réservations d'un utilisateur connecté
//     Route::get('/reservations', [ReservationController::class, 'index']);
//     Route::post('/reservations', [ReservationController::class, 'store']);
//     Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);
//     Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy']);


//    });

//     Route::middleware(['auth:sanctum', 'admin'])->group(function () {

//         Route::post('/spaces', [SpaceController::class, 'store']);
//         Route::put('/spaces/{space}', [SpaceController::class, 'update']);
//         Route::delete('/spaces/{space}', [SpaceController::class, 'destroy']);
//     });
