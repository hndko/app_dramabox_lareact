<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewReleasesController;
use App\Http\Controllers\TrendingController;
use App\Http\Controllers\BrowseController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Main streaming pages
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/new-releases', [NewReleasesController::class, 'index'])->name('new-releases');
Route::get('/trending', [TrendingController::class, 'index'])->name('trending');
Route::get('/browse', [BrowseController::class, 'index'])->name('browse');

// Search routes
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/api/search/suggestions', [SearchController::class, 'suggestions'])->name('search.suggestions');

// Player route
Route::get('/watch/{dramaId}', [PlayerController::class, 'show'])->name('watch');

// Keep auth routes if needed
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
