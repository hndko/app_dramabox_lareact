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
            {dramas.length > 0 && (
                <div className="relative h-[500px] md:h-[600px] mb-12 rounded-2xl overflow-hidden group">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={dramas[0].cover}
                            alt={dramas[0].bookName}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 space-y-6">
                        <div className="space-y-2">
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-primary/20">
                                Featured
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold font-display text-white leading-tight">
                                {dramas[0].bookName}
                            </h1>
                        </div>

                        <p className="text-lg text-muted-foreground line-clamp-3 max-w-xl">
                            {dramas[0].introduction}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                href={`/watch/${dramas[0].id || dramas[0].bookId}`}
                                className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                <span>Watch Now</span>
                            </Link>
                            <button className="inline-flex items-center space-x-2 bg-white/10 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all backdrop-blur-md border border-white/10">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                <span>More Info</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* For You Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold font-display text-white">
                        For You
                    </h2>
                </div>

                <VideoGrid dramas={dramas} loading={!content} />
            </section>
        </AppLayout>
    );
}
