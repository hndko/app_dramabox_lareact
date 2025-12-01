import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VideoGrid from '@/Components/VideoGrid';
import { Search as SearchIcon } from 'lucide-react';

export default function Search({ content, keyword = '', currentPage = 1 }) {
    const dramas = Array.isArray(content?.data) ? content.data : [];
    const hasMore = content?.hasMore || false;

    return (
        <AppLayout>
            <Head title={`Search: ${keyword} - DramaBox`} />

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <SearchIcon className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl md:text-4xl font-bold font-display">
                        Search Results
                    </h1>
                </div>

                {keyword && (
                    <p className="text-muted-foreground">
                        Showing results for <span className="text-foreground font-semibold">"{keyword}"</span>
                    </p>
                )}
            </div>

            {/* Results */}
            {keyword ? (
                <>
                    <VideoGrid dramas={dramas} loading={!content} />

                    {/* Pagination */}
                    {(currentPage > 1 || hasMore) && (
                        <div className="flex justify-center items-center space-x-4 pt-12">
                            {currentPage > 1 && (
                                <a
                                    href={`/search?q=${keyword}&page=${currentPage - 1}`}
                                    className="px-6 py-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth"
                                >
                                    Previous
                                </a>
                            )}

                            <span className="text-muted-foreground">
                                Page {currentPage}
                            </span>

                            {hasMore && (
                                <a
                                    href={`/search?q=${keyword}&page=${currentPage + 1}`}
                                    className="px-6 py-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth"
                                >
                                    Next
                                </a>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20">
                    <SearchIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Start Searching</h3>
                    <p className="text-muted-foreground">
                        Enter a keyword in the search bar to find dramas
                    </p>
                </div>
            )}
        </AppLayout>
    );
}
