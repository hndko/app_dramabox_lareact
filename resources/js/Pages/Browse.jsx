import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VideoGrid from '@/Components/VideoGrid';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useState } from 'react';

export default function Browse({ content, currentPage = 1, filters = {} }) {
    const dramas = Array.isArray(content?.data) ? content.data : [];
    const hasMore = content?.hasMore || false;

    const [selectedGenre, setSelectedGenre] = useState(filters.genre || '');
    const [selectedSort, setSelectedSort] = useState(filters.sort || '1');
    const [selectedLang, setSelectedLang] = useState(filters.lang || '');

    const applyFilters = () => {
        const params = { page: 1 };
        if (selectedGenre) params.genre = selectedGenre;
        if (selectedSort) params.sort = selectedSort;
        if (selectedLang) params.lang = selectedLang;

        router.get('/browse', params);
    };

    // Mock genre data - replace with actual data from API
    const genres = [
        { id: '', name: 'All Genres' },
        { id: '1', name: 'Romance' },
        { id: '2', name: 'Drama' },
        { id: '3', name: 'Action' },
        { id: '4', name: 'Comedy' },
        { id: '5', name: 'Thriller' },
    ];

    const sortOptions = [
        { id: '1', name: 'Latest' },
        { id: '2', name: 'Popular' },
        { id: '3', name: 'Top Rated' },
    ];

    const languages = [
        { id: '', name: 'All Languages' },
        { id: 'en', name: 'English' },
        { id: 'in', name: 'Indonesian' },
        { id: 'ko', name: 'Korean' },
        { id: 'zh', name: 'Chinese' },
    ];

    return (
        <AppLayout>
            <Head title="Browse - DramaBox" />

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <Filter className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl md:text-4xl font-bold font-display">
                        Browse
                    </h1>
                </div>
                <p className="text-muted-foreground">
                    Find exactly what you're looking for
                </p>
            </div>

            {/* Filters */}
            <div className="glass-card p-6 rounded-xl mb-8 space-y-4">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Genre Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Genre</label>
                        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select genre" />
                            </SelectTrigger>
                            <SelectContent>
                                {genres.map((genre) => (
                                    <SelectItem key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Sort By</label>
                        <Select value={selectedSort} onValueChange={setSelectedSort}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select sort" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.id}>
                                        {option.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Language Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Language</label>
                        <Select value={selectedLang} onValueChange={setSelectedLang}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                {languages.map((lang) => (
                                    <SelectItem key={lang.id} value={lang.id}>
                                        {lang.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={applyFilters}
                        className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-smooth"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <VideoGrid dramas={dramas} loading={!content} />

            {/* Pagination */}
            {(currentPage > 1 || hasMore) && (
                <div className="flex justify-center items-center space-x-4 pt-12">
                    {currentPage > 1 && (
                        <Link
                            href={`/browse?page=${currentPage - 1}&genre=${selectedGenre}&sort=${selectedSort}&lang=${selectedLang}`}
                            className="px-6 py-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth"
                        >
                            Previous
                        </Link>
                    )}

                    <span className="text-muted-foreground">
                        Page {currentPage}
                    </span>

                    {hasMore && (
                        <Link
                            href={`/browse?page=${currentPage + 1}&genre=${selectedGenre}&sort=${selectedSort}&lang=${selectedLang}`}
                            className="px-6 py-2 rounded-lg bg-primary hover:text-primary-foreground transition-smooth"
                        >
                            Next
                        </Link>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
