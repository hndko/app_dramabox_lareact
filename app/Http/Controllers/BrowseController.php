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
        $pageNo = (int) $request->query('page', 1);
        $genre = $request->query('genre');
        if ($genre === 'all') {
            $genre = null;
        }
        $genre = $genre ? (int) $genre : null;

        $sort = $request->query('sort');
        $sort = $sort ? (int) $sort : null;

        $lang = $request->query('lang');
        if ($lang === 'all') {
            $lang = null;
        }

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
