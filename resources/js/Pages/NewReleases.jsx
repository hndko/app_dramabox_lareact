import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VideoGrid from '@/Components/VideoGrid';
import { Sparkles } from 'lucide-react';

export default function NewReleases({ content, currentPage = 1 }) {
    const dramas = Array.isArray(content?.data) ? content.data : [];
    const hasMore = content?.hasMore || false;

    return (
        <AppLayout>
            <Head title="New Releases - DramaBox" />

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl md:text-4xl font-bold font-display">
                        New Releases
                    </h1>
                </div>
                <p className="text-muted-foreground">
                    Fresh content just for you
                </p>
            </div>

            {/* Content Grid */}
            <VideoGrid dramas={dramas} loading={!content} />

            {/* Pagination */}
            {(currentPage > 1 || hasMore) && (
                <div className="flex justify-center items-center space-x-4 pt-12">
                    {currentPage > 1 && (
                        <Link
                            href={`/new-releases?page=${currentPage - 1}`}
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
                            href={`/new-releases?page=${currentPage + 1}`}
                            className="px-6 py-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth"
                        >
                            Next
                        </Link>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
