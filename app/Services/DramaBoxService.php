<?php

namespace App\Services;

class DramaBoxService extends ApiService
{
    /**
     * Transform drama list from API response to frontend format
     * Maps bookId to id for React keys and ensures consistent structure
     */
    private function transformDramaList(array $dramas): array
    {
        return array_map(function ($drama) {
            return array_merge($drama, [
                'id' => $drama['bookId'] ?? null, // Add id field for React keys
            ]);
        }, $dramas);
    }

    /**
     * Transform paginated API response to standardized format
     */
    private function transformPaginatedResponse(?array $apiResponse): ?array
    {
        if (!$apiResponse || !isset($apiResponse['success']) || !$apiResponse['success']) {
            return null;
        }

        $data = $apiResponse['data'] ?? [];
        $list = $data['list'] ?? [];

        return [
            'data' => $this->transformDramaList($list),
            'hasMore' => $data['isMore'] ?? false,
            'total' => $data['total'] ?? count($list),
        ];
    }

    /**
     * Get For You / Theater content
     */
    public function getForYou(int $page = 1): ?array
    {
        $response = $this->get("/foryou/{$page}");
        return $this->transformPaginatedResponse($response);
    }

    /**
     * Get New Releases
     */
    public function getNewReleases(int $page = 1): ?array
    {
        $response = $this->get("/new/{$page}");
        return $this->transformPaginatedResponse($response);
    }

    /**
     * Get Trending / Rank content
     */
    public function getTrending(int $page = 1): ?array
    {
        $response = $this->get("/rank/{$page}");
        return $this->transformPaginatedResponse($response);
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

        $response = $this->get('/classify', $params);
        return $this->transformPaginatedResponse($response);
    }

    /**
     * Search dramas by keyword
     */
    public function search(string $keyword, int $page = 1): ?array
    {
        $response = $this->get("/search/{$keyword}/{$page}");

        if (!$response || !isset($response['success']) || !$response['success']) {
            return null;
        }

        // Search response has different structure: data.searchList instead of data.list
        $data = $response['data'] ?? [];
        $list = $data['searchList'] ?? $data['list'] ?? [];

        return [
            'data' => $this->transformDramaList($list),
            'hasMore' => $data['isMore'] ?? false,
            'total' => $data['totalSize'] ?? count($list),
        ];
    }

    /**
     * Get search suggestions
     */
    public function getSuggestions(string $query): ?array
    {
        $response = $this->get("/suggest/{$query}", [], false); // Don't cache suggestions

        if (!$response || !isset($response['success']) || !$response['success']) {
            return null;
        }

        $data = $response['data'] ?? [];
        $list = $data['suggestList'] ?? [];

        return [
            'suggestions' => $this->transformDramaList($list),
        ];
    }

    /**
     * Get chapter list for a drama
     */
    public function getChapters(string $dramaId): ?array
    {
        $response = $this->get("/chapters/{$dramaId}");

        if (!$response || !isset($response['success']) || !$response['success']) {
            return null;
        }

        return $response['data'] ?? null;
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
        $response = $this->get("/watch/{$dramaId}/{$episode}", $params);

        if (!$response || !isset($response['success']) || !$response['success']) {
            return null;
        }

        return $response['data'] ?? null;
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
            'total_episodes' => count($chapters['chapterList'] ?? [])
        ];
    }
}
