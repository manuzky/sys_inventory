<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PersonnelController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return redirect('/login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('personnel', PersonnelController::class);
    Route::patch('/personnel/{personnel}/toggle-status', [PersonnelController::class, 'toggleStatus'])->name('personnel.toggle-status');
    
    Route::resource('positions', PositionController::class);
    
    Route::resource('users', UserController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
