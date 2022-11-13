<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Frontend\HomeController;

// frontend routes
Route::get('/', HomeController::class)->name('home');

Route::get('optimize-clear', function () {
    \Illuminate\Support\Facades\Artisan::call('optimize:clear');
    return true;
});

// auth routes
Route::prefix('auth')->group(function () {
    require __DIR__ . '/auth.php';

    // react app route init for authenticated user
    Route::view('/{auth?}', 'auth-app')->where('auth', '.*');
});
