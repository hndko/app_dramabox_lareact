<?php

namespace App\Http\Controllers;

use App\Services\DramaBoxService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class NewReleasesController extends Controller
{
    public function __construct(
        protected DramaBoxService $dramaBoxService
    ) {}

    /**
     * Display New Releases page
     */
    public function index(Request $request): Response
    {
        $page = (int) $request->query('page', 1);
        $data = $this->dramaBoxService->getNewReleases($page);

        return Inertia::render('NewReleases', [
            'content' => $data,
            'currentPage' => $page,
        ]);
    }
}
