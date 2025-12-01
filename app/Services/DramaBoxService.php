<?php

namespace App\Services;

class DramaBoxService extends ApiService
{
    /**
     * Get For You / Theater content
     */
    public function getForYou(int $page = 1): ?array
    {
        return $this->get("/foryou/{$page}");
    }

    /**
     * Get New Releases
     */
    public function getNewReleases(int $page = 1): ?array
    {
        return $this->get("/new/{$page}");
    }

    /**
     * Get Trending / Rank content
     */
    public function getTrending(int $page = 1): ?array
    {
        return $this->get("/rank/{$page}");
    }

    /**
     * Get classified/filtered content
     *
     * @param int $pageNo Page number
     * @param int|null $genre Genre ID
     * @param int|null $sort Sort type
     * @param string|null $lang Language code
     */
    public function getClassify(
        int $pageNo = 1,
        ?int $genre = null,
        ?int $sort = null,
        ?string $lang = null
    ): ?array {
        $params = ['pageNo' => $pageNo];

        if ($genre !== null) {
            $params['genre'] = $genre;
        }

        if ($sort !== null) {
            $params['sort'] = $sort;
        }

        if ($lang !== null) {
            $params['lang'] = $lang;
        }

        return $this->get('/classify', $params);
    }

    /**
     * Search dramas by keyword
     */
    public function search(string $keyword, int $page = 1): ?array
    {
        return $this->get("/search/{$keyword}/{$page}");
    }

    /**
     * Get search suggestions
     */
    public function getSuggestions(string $query): ?array
    {
        return $this->get("/suggest/{$query}", [], false); // Don't cache suggestions
    }

    /**
     * Get chapter list for a drama
     */
    public function getChapters(string $dramaId): ?array
    {
        return $this->get("/chapters/{$dramaId}");
    }

    /**
     * Get watch/download URL for a specific episode
     *
     * @param string $dramaId Drama ID
     * @param int $episode Episode number (0-based)
     * @param string $source Source of the request (e.g., 'search_result', 'home', etc.)
     */
    public function getWatch(string $dramaId, int $episode = 0, string $source = 'web'): ?array
    {
        $params = ['source' => $source];
        return $this->get("/watch/{$dramaId}/{$episode}", $params);
    }

    /**
     * Get drama details by ID
     * This is a helper method that combines chapter info
     */
    public function getDramaDetails(string $dramaId): ?array
    {
        $chapters = $this->getChapters($dramaId);

        if (!$chapters) {
            return null;
        }

        return [
            'chapters' => $chapters,
            'total_episodes' => count($chapters['data'] ?? [])
        ];
    }
}
