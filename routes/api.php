<?php

use App\Http\Controllers\Api\Auth\AuthenticatedUserController;
use App\Http\Controllers\Api\Auth\CategoryController;
use App\Http\Controllers\Api\Auth\ProductController;
use App\Http\Controllers\Api\Auth\ProfileController;
use App\Http\Controllers\Api\Auth\TinyMceController;
use App\Http\Controllers\Api\NoNeedAuth\CategoryController as NoNeedAuthCategoryController;
use Illuminate\Support\Facades\Route;

Route::get('all-categories', [NoNeedAuthCategoryController::class, 'allCategories']);

// authenticated api routes
Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
    Route::get('user', [AuthenticatedUserController::class, 'user']);
    Route::put('update-profile', [ProfileController::class, 'updateProfile']);
    Route::put('update-password', [ProfileController::class, 'updatePassword']);
    Route::post('logout', [AuthenticatedUserController::class, 'logout']);

    Route::apiResource('categories', CategoryController::class)->except('destroy');
    Route::apiResource('products', ProductController::class)->except('destroy');

    // tinymce image upload
    Route::post('tinymce/image-upload', TinyMceController::class);
});
