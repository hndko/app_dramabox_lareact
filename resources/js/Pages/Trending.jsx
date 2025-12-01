import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VideoCard from '@/Components/VideoCard';
import { TrendingUp, Trophy, Medal, Award } from 'lucide-react';
import { Card } from '@/Components/ui/card';

export default function Trending({ content, currentPage = 1 }) {
    const dramas = Array.isArray(content?.data) ? content.data : [];
    const hasMore = content?.hasMore || false;

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <Trophy className="h-6 w-6 text-yellow-400" />;
            case 2:
                return <Medal className="h-6 w-6 text-gray-400" />;
            case 3:
                return <Award className="h-6 w-6 text-amber-600" />;
            default:
                return null;
        }
    };

    return (
        <AppLayout>
            <Head title="Trending - DramaBox" />

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <TrendingUp className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl md:text-4xl font-bold font-display">
                        Trending Now
                    </h1>
                </div>
                <p className="text-muted-foreground">
                    Most popular dramas right now
                </p>
            </div>

            {/* Ranked Grid */}
            {!content ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div
                            key={index}
                            className="aspect-video bg-muted rounded-lg animate-pulse"
                        />
                    ))}
                </div>
            ) : dramas.length > 0 ? (
                <div className="space-y-6">
                    {/* Top 3 - Special Display */}
                    {dramas.slice(0, 3).length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {dramas.slice(0, 3).map((drama, index) => {
                                const dramaId = drama.bookId || drama.id;
                                const title = drama.bookName || drama.title || 'Untitled';
                                const description = drama.introduction || drama.description || '';
                                const imageUrl = drama.cover || drama.thumbnail || drama.poster || '/images/placeholder.jpg';

                                return (
                                    <Link key={dramaId || index} href={`/watch/${dramaId}`}>
                                        <Card className="group relative overflow-hidden border-0 bg-card hover-lift cursor-pointer">
                                            <div className="relative aspect-video bg-muted">
                                                <img
                                                    src={imageUrl}
                                                    alt={title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                                                {/* Rank Badge */}
                                                <div className="absolute top-4 left-4 glass px-4 py-2 rounded-lg flex items-center space-x-2">
                                                    {getRankIcon(index + 1)}
                                                    <span className="text-2xl font-bold text-white">#{index + 1}</span>
                                                </div>

                                                {/* Content */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <h3 className="font-bold text-lg mb-1 line-clamp-1 text-white">
                                                        {title}
                                                    </h3>
                                                    <p className="text-sm text-gray-300 line-clamp-2">
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    {/* Rest of the list */}
                    {dramas.slice(3).length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-white">Top Ranked</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                                {dramas.slice(3).map((drama, index) => {
                                    const dramaId = drama.bookId || drama.id;
                                    return (
                                        <div key={dramaId || index} className="relative">
                                            {/* Rank Number */}
                                            <div className="absolute -top-2 -left-2 z-10 glass rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm text-white">
                                                #{index + 4}
                                            </div>
                                            <VideoCard drama={drama} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-20">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No trending content</h3>
                    <p className="text-muted-foreground">Check back later for updates</p>
                </div>
            )}

            {/* Pagination */}
            {(currentPage > 1 || hasMore) && (
                <div className="flex justify-center items-center space-x-4 pt-12">
                    {currentPage > 1 && (
                        <Link
                            href={`/trending?page=${currentPage - 1}`}
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
                            href={`/trending?page=${currentPage + 1}`}
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
