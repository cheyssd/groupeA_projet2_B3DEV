<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SpaceController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\SpaceImageController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ReservationController as ApiReservationController;
use App\Http\Controllers\Api\SpaceController as ApiSpaceController;



//Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');


//Public
Route::get('/spaces/available', [SpaceController::class, 'availableSpaces']);
Route::get('/spaces', [SpaceController::class, 'index']);
Route::get('/spaces/{space}', action: [SpaceController::class, 'show']);




//Authentification
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::apiResource('reservations', ReservationController::class)
        ->only(['index', 'store', 'show', 'destroy']);

         Route::get('/reservations/{id}/invoice', [\App\Http\Controllers\Api\InvoiceController::class, 'download']);
});


//Admin
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::apiResource('spaces', SpaceController::class)
        ->except(['index', 'show']);

    Route::patch('/reservations/{id}/status', [ReservationController::class, 'updateStatus']);
    Route::patch('/reservations/{id}/paid', [ReservationController::class, 'markAsPaid']);
    Route::post('/spaces', [SpaceController::class, 'store']);
    Route::put('/spaces/{space}', [SpaceController::class, 'update']);
    Route::delete('/spaces/{space}', [SpaceController::class, 'destroy']);

    Route::post('/spaces/{spaceId}/images', [SpaceImageController::class, 'store']);
    Route::delete('/images/{imageId}', [SpaceImageController::class, 'destroy']);

    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);

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
