import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VideoGrid from '@/Components/VideoGrid';
import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Home({ content, currentPage = 1 }) {
    // Ensure we have valid data structure even when API returns null
    const dramas = Array.isArray(content?.data) ? content.data : [];
    const hasMore = content?.hasMore || false;

    return (
        <AppLayout>
            <Head title="For You - DramaBox" />

            {/* Hero Section */}
            <div className="relative mb-12 rounded-2xl overflow-hidden">
                <div className="bg-gradient-primary p-8 md:p-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-4 animate-fadeIn text-white">
                        Welcome to DramaBox
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fadeIn">
                        Discover amazing dramas tailored just for you
                    </p>
                </div>
            </div>

            {/* For You Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold font-display text-white">
                        For You
                    </h2>

                    {hasMore && (
                        <Link
                            href={`/?page=${currentPage + 1}`}
                            className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
                        >
                            <span>See More</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    )}
                </div>

                <VideoGrid dramas={dramas} loading={!content} />

                {/* Pagination */}
                {(currentPage > 1 || hasMore) && (
                    <div className="flex justify-center items-center space-x-4 pt-8">
                        {currentPage > 1 && (
                            <Link
                                href={`/?page=${currentPage - 1}`}
                                className="px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white hover:text-black transition-smooth"
                            >
                                Previous
                            </Link>
                        )}

                        <span className="text-gray-400">
                            Page {currentPage}
                        </span>

                        {hasMore && (
                            <Link
                                href={`/?page=${currentPage + 1}`}
                                className="px-6 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-smooth"
                            >
                                Next
                            </Link>
                        )}
                    </div>
                )}
            </section>
        </AppLayout>
    );
}
