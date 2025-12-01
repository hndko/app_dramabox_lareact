<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ApiService
{
    protected string $baseUrl;
    protected int $cacheTtl;

    public function __construct()
    {
        $this->baseUrl = config('services.dramabox.base_url');
        $this->cacheTtl = config('services.dramabox.cache_ttl', 3600);
    }

    /**
     * Make GET request to API with caching
     */
    protected function get(string $endpoint, array $params = [], bool $cache = true): ?array
    {
        $cacheKey = $this->getCacheKey($endpoint, $params);

        if ($cache && Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        try {
            $response = Http::timeout(30)
                ->get($this->baseUrl . $endpoint, $params);

            if ($response->successful()) {
                $data = $response->json();

                if ($cache) {
                    Cache::put($cacheKey, $data, $this->cacheTtl);
                }

                return $data;
            }

            Log::error('API request failed', [
                'endpoint' => $endpoint,
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('API request exception', [
                'endpoint' => $endpoint,
                'message' => $e->getMessage()
            ]);

            return null;
        }
    }

    /**
     * Generate cache key from endpoint and params
     */
    protected function getCacheKey(string $endpoint, array $params = []): string
    {
        $paramsString = empty($params) ? '' : md5(json_encode($params));
        return 'dramabox_' . md5($endpoint . $paramsString);
    }

    /**
     * Clear cache for specific endpoint
     */
    public function clearCache(string $endpoint, array $params = []): void
    {
        $cacheKey = $this->getCacheKey($endpoint, $params);
        Cache::forget($cacheKey);
    }

    /**
     * Clear all API cache
     */
    public function clearAllCache(): void
    {
        Cache::flush();
    }
}
