<?php

use App\Http\Controllers\AgreementController;
use App\Http\Controllers\ProcessController;
use Illuminate\Support\Facades\Route;

Route::prefix('agreements')->group(function () {
    Route::get('', [AgreementController::class, 'index']);
    Route::post('', [AgreementController::class, 'store']);
    Route::put('{id}', [AgreementController::class, 'update']);
    Route::delete('{id}', [AgreementController::class, 'delete']);

    Route::get('processes/{agreement_id}', [ProcessController::class, 'index']);
});

Route::prefix('processes')->group(function () {
    Route::post('', [ProcessController::class, 'store']);
    Route::put('{id}', [ProcessController::class, 'update']);
    Route::delete('{id}', [ProcessController::class, 'delete']);
});

