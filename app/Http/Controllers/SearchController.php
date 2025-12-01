<?php

namespace App\Http\Controllers;

use App\Services\DramaBoxService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
    public function __construct(
        protected DramaBoxService $dramaBoxService
    ) {}

    /**
     * Display Search Results page
     */
    public function index(Request $request): Response
    {
        $keyword = $request->query('q', '');
        $page = (int) $request->query('page', 1);

        $data = null;
        if ($keyword) {
            $data = $this->dramaBoxService->search($keyword, $page);
        }

        return Inertia::render('Search', [
            'content' => $data,
            'keyword' => $keyword,
            'currentPage' => $page,
        ]);
    }

    /**
     * Get search suggestions for autocomplete
     */
    public function suggestions(Request $request): JsonResponse
    {
        $query = $request->query('q', '');

        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $suggestions = $this->dramaBoxService->getSuggestions($query);

        return response()->json($suggestions ?? []);
    }
}
