<?php

namespace App\Http\Controllers;

use App\Services\DramaBoxService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __construct(
        protected DramaBoxService $dramaBoxService
    ) {}

    /**
     * Display For You / Theater page
     */
    public function index(Request $request): Response
    {
        $data = $this->dramaBoxService->getForYou();

        return Inertia::render('Home', [
            'content' => $data,
        ]);
    }
}
