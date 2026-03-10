<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SpaceController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\SpaceImageController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\InvoiceController;


// Auth Routes (Public)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');


// Public Routes
Route::get('/spaces/available', [SpaceController::class, 'availableSpaces']);
Route::get('/spaces', [SpaceController::class, 'index']);
Route::get('/spaces/{space}', [SpaceController::class, 'show']);


// Protected Routes (Auth Required)
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Reservations (User)
    Route::apiResource('reservations', ReservationController::class)
        ->only(['index', 'store', 'update','show', 'destroy']);

    // Invoice
    Route::get('/reservations/{id}/invoice', [InvoiceController::class, 'download']);
});


// Admin Routes
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // Admin Dashboard
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);

    // Spaces Management
    Route::apiResource('spaces', SpaceController::class)
        ->except(['index', 'show']);

    // Space Images
    Route::post('/spaces/{spaceId}/images', [SpaceImageController::class, 'store']);
    Route::delete('/images/{imageId}', [SpaceImageController::class, 'destroy']);

    // Reservations Management
    Route::patch('/reservations/{id}/status', [ReservationController::class, 'updateStatus']);
    Route::patch('/reservations/{id}/paid', [ReservationController::class, 'markAsPaid']);

        // Users Management
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::get('/admin/users/{id}', [AdminController::class, 'showUser']);
    Route::put('/admin/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
});
