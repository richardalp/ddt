<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MachineController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('machines', MachineController::class);
});