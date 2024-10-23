<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MachineController;

Route::redirect('/', '/login');

Route::middleware(['auth'])->group(function () {
    Route::resource('machines', MachineController::class);
});

require __DIR__.'/auth.php';