import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VideoGrid from '@/Components/VideoGrid';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useState } from 'react';

export default function Browse({ content, currentPage = 1, filters = {} }) {
    const dramas = Array.isArray(content?.data) ? content.data : [];
    const hasMore = content?.hasMore || false;

    const [selectedGenre, setSelectedGenre] = useState(filters.genre || 'all');
    const [selectedSort, setSelectedSort] = useState(filters.sort || '1');
    const [selectedLang, setSelectedLang] = useState(filters.lang || 'all');

    const applyFilters = () => {
        const params = { page: 1 };
        if (selectedGenre && selectedGenre !== 'all') params.genre = selectedGenre;
        if (selectedSort) params.sort = selectedSort;
        if (selectedLang && selectedLang !== 'all') params.lang = selectedLang;

        router.get('/browse', params);
    };

    // Real genre data from API
    const genres = [
        { id: 'all', name: 'Semua Genre' },
        { id: '1357', name: 'Romansa' },
        { id: '1362', name: 'CEO' },
        { id: '1394', name: 'Balas Dendam' },
        { id: '1379', name: 'Cinta Terlarang' },
        { id: '1352', name: 'Modern' },
        { id: '1395', name: 'Pembalikan Identitas' },
        { id: '1393', name: 'Cinta Setelah Menikah' },
        { id: '1378', name: 'Cinta Paksaan' },
        { id: '1397', name: 'Kabur Saat Hamil' },
        { id: '1411', name: 'Intrik Keluarga' },
        { id: '1374', name: 'Gadis Naif' },
        { id: '1390', name: 'Musuh Jadi Kekasih' },
        { id: '1380', name: 'Cinta Segitiga' },
        { id: '1396', name: 'Pengantin Kabur' },
        { id: '1392', name: 'Kesempatan Kedua' },
        { id: '1452', name: 'Wanita Mandiri' },
        { id: '1654', name: 'Penyesalan' },
        { id: '1459', name: 'Penebusan' },
        { id: '1371', name: 'Kekuatan Khusus' },
        { id: '1388', name: 'Romansa Kantor' },
    ];

    const sortOptions = [
        { id: '2', name: 'Terbaru' },
        { id: '1', name: 'Terpopuler' },
    ];

    const languages = [
        { id: 'all', name: 'Semua Bahasa' },
        { id: 'in', name: 'Indonesia' },
        { id: 'en', name: 'English' },
        { id: 'zh', name: 'Chinese' },
    ];

    return (
        <AppLayout>
            <Head title="Browse - DramaBox" />

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <Filter className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl md:text-4xl font-bold font-display text-white">
                        Browse
                    </h1>
                </div>
                <p className="text-muted-foreground">
                    Find exactly what you're looking for
                </p>
            </div>

            {/* Filters */}
            <div className="glass-card p-6 rounded-xl mb-8 space-y-4">
                <h2 className="text-lg font-semibold mb-4 text-white">Filters</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Genre Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-200">Genre</label>
                        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select genre" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                {genres.map((genre) => (
                                    <SelectItem key={genre.id} value={genre.id} className="focus:bg-neutral-800 focus:text-white cursor-pointer">
                                        {genre.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-200">Sort By</label>
                        <Select value={selectedSort} onValueChange={setSelectedSort}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select sort" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                {sortOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.id} className="focus:bg-neutral-800 focus:text-white cursor-pointer">
                                        {option.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Language Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-200">Language</label>
                        <Select value={selectedLang} onValueChange={setSelectedLang}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                {languages.map((lang) => (
                                    <SelectItem key={lang.id} value={lang.id} className="focus:bg-neutral-800 focus:text-white cursor-pointer">
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
