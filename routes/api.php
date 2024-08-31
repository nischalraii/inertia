<?php

use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function () {
    return "Hi";
});

Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/user', function () {
    //     return "Hi";
    // });

    // Define CRUD operations for posts
    Route::get('/posts', [ApiController::class, 'apiPostIndex']);
    Route::post('/posts', [ApiController::class, 'apiPostStore']);
    Route::get('/posts/{id}', [ApiController::class, 'apiPostShow']);
    Route::put('/posts/{id}', [ApiController::class, 'apiPostUpdate']);
    Route::delete('/posts/{id}', [ApiController::class, 'apiPostDestroy']);

    // Fetch news from external API
    Route::get('/news', [ApiController::class, 'fetchNews']);
});

// Public login route
Route::post('/login', [ApiController::class, 'login']);
