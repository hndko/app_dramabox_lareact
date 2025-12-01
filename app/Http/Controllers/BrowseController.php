<?php

namespace App\Http\Controllers;

use App\Services\DramaBoxService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class BrowseController extends Controller
{
    public function __construct(
        protected DramaBoxService $dramaBoxService
    ) {}

    /**
     * Display Browse page with filters
     */
    public function index(Request $request): Response
    {
        $pageNo = $request->query('page', 1);
        $genre = $request->query('genre');
        $sort = $request->query('sort');
        $lang = $request->query('lang');

        $data = $this->dramaBoxService->getClassify(
            $pageNo,
            $genre,
            $sort,
            $lang
        );

        return Inertia::render('Browse', [
            'content' => $data,
            'currentPage' => $pageNo,
            'filters' => [
                'genre' => $genre,
                'sort' => $sort,
                'lang' => $lang,
            ],
        ]);
    }
}
