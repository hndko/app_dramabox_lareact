<?php

namespace App\Http\Controllers;

use App\Services\DramaBoxService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class TrendingController extends Controller
{
    public function __construct(
        protected DramaBoxService $dramaBoxService
    ) {}

    /**
     * Display Trending/Rank page
     */
    public function index(Request $request): Response
    {
        $page = $request->query('page', 1);
        $data = $this->dramaBoxService->getTrending($page);

        return Inertia::render('Trending', [
            'content' => $data,
            'currentPage' => $page,
        ]);
    }
}
