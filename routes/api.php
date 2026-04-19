<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/ping', function () {
    return response()->json(['message' => 'pong']);
});
// CRUD Student
Route::post('/students', [StudentController::class, 'store']);
Route::get('/students', [StudentController::class, 'index']);
Route::put('/students/{nim}', [StudentController::class, 'update']);
Route::patch('/students/{nim}', [StudentController::class, 'update']);
Route::delete('/students/{nim}', [StudentController::class, 'destroy']);

// Tugas Praktikum
Route::get('/students/search', [StudentController::class, 'search']);

// Modul 5
Route::get('/students/{nim}/mata-kuliah', [StudentController::class, 'mataKuliahByStudent']);
Route::get('/students/{nim}', [StudentController::class, 'show']);
Route::delete('/students/{nim}', [StudentController::class, 'destroy']);
Route::get('/students/{nim}/mata-kuliah', [StudentController::class, 'mataKuliahByStudent']);