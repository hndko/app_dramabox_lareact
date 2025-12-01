<?php

namespace App\Http\Controllers;

use App\Services\DramaBoxService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    public function __construct(
        protected DramaBoxService $dramaBoxService
    ) {}

    /**
     * Display Player page with video and chapters
     */
    public function show(Request $request, string $dramaId): Response
    {
        $episode = (int) $request->query('episode', 0);
        $source = $request->query('source', 'web');

        // Get chapter list
        $chapters = $this->dramaBoxService->getChapters($dramaId);

        // Get watch/download info for specific episode
        $watchData = $this->dramaBoxService->getWatch($dramaId, $episode, $source);

        return Inertia::render('Player', [
            'dramaId' => $dramaId,
            'currentEpisode' => $episode,
            'chapters' => $chapters,
            'watchData' => $watchData,
        ]);
    }
}
