import { Search as SearchIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const debounce = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                // API returns { suggestions: [...] } array with bookName field
                setSuggestions(data?.suggestions || []);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(debounce);
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.get('/search', { q: query });
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        // API suggestions have bookId and bookName
        const searchTerm = suggestion.bookName || suggestion.title || suggestion;
        setQuery(searchTerm);
        setShowSuggestions(false);
        router.get('/search', { q: searchTerm });
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <form onSubmit={handleSearch} className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search dramas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-4 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 transition-smooth"
                />
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full glass-card border border-white/10 rounded-lg overflow-hidden animate-scaleIn shadow-xl z-50 bg-black/90">
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={suggestion.bookId || suggestion.id || index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="w-full px-4 py-3 text-left hover:bg-white/10 transition-smooth border-b border-white/5 last:border-b-0 flex items-center space-x-3"
                            >
                                <SearchIcon className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-white">{suggestion.bookName || suggestion.title || suggestion}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="absolute top-full mt-2 w-full glass-card border border-white/10 rounded-lg p-4 text-center text-sm text-gray-400 bg-black/90">
                    Loading...
                </div>
            )}
        </div>
    );
}
