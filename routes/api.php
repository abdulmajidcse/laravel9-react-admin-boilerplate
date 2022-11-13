<?php

use App\Http\Controllers\Api\Auth\AuthenticatedUserController;
use App\Http\Controllers\Api\Auth\CategoryController;
use App\Http\Controllers\Api\Auth\ProductController;
use App\Http\Controllers\Api\Auth\ProfileController;
use App\Http\Controllers\Api\Auth\TinyMceController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
    Route::get('user', [AuthenticatedUserController::class, 'user']);
    Route::put('update-profile', [ProfileController::class, 'updateProfile']);
    Route::put('update-password', [ProfileController::class, 'updatePassword']);
    Route::post('logout', [AuthenticatedUserController::class, 'logout']);

    Route::apiResources([
        'categories' => CategoryController::class,
        'products' => ProductController::class,
    ]);

    // tinymce image upload
    Route::post('tinymce/image-upload', TinyMceController::class);
});
