import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Play, ChevronRight, Info } from 'lucide-react';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';

export default function Player({ dramaId, currentEpisode = 0, chapters, watchData }) {
    const dramaInfo = chapters?.info || {};
    const episodeList = chapters?.data || [];
    const videoUrl = watchData?.url || watchData?.download_url || '';

    return (
        <AppLayout>
            <Head title={`${dramaInfo.title || 'Watch'} - DramaBox`} />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Video Player Section */}
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                    {videoUrl ? (
                        <video
                            src={videoUrl}
                            controls
                            autoPlay
                            className="w-full h-full"
                            poster={dramaInfo.poster || dramaInfo.thumbnail}
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                            <div className="text-center space-y-4">
                                <Play className="h-16 w-16 mx-auto text-muted-foreground" />
                                <p className="text-muted-foreground">
                                    {watchData ? 'Video not available' : 'Loading video...'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Drama Info */}
                <div className="glass-card p-6 rounded-xl space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                            <h1 className="text-2xl md:text-3xl font-bold font-display">
                                {dramaInfo.title || 'Loading...'}
                            </h1>

                            {dramaInfo.description && (
                                <p className="text-muted-foreground">
                                    {dramaInfo.description}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-2 pt-2">
                                {dramaInfo.genres?.map((genre, index) => (
                                    <Badge key={index} variant="secondary">
                                        {genre}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {dramaInfo.rating && (
                            <div className="glass px-4 py-3 rounded-lg text-center">
                                <div className="text-3xl font-bold text-gradient">
                                    {dramaInfo.rating.toFixed(1)}
                                </div>
                                <div className="text-xs text-muted-foreground">Rating</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Episodes and Details Tabs */}
                <Tabs defaultValue="episodes" className="w-full">
                    <TabsList className="w-full md:w-auto glass-card">
                        <TabsTrigger value="episodes" className="flex items-center space-x-2">
                            <Play className="h-4 w-4" />
                            <span>Episodes</span>
                        </TabsTrigger>
                        <TabsTrigger value="details" className="flex items-center space-x-2">
                            <Info className="h-4 w-4" />
                            <span>Details</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Episodes List */}
                    <TabsContent value="episodes" className="mt-4">
                        <Card className="border-0 bg-card">
                            <ScrollArea className="h-[500px] p-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {episodeList.map((episode, index) => (
                                        <Link
                                            key={index}
                                            href={`/watch/${dramaId}?episode=${index}`}
                                            className={`group relative aspect-video rounded-lg overflow-hidden transition-smooth hover-lift ${
                                                currentEpisode === index
                                                    ? 'ring-2 ring-primary'
                                                    : 'bg-secondary'
                                            }`}
                                        >
                                            {episode.thumbnail ? (
                                                <img
                                                    src={episode.thumbnail}
                                                    alt={`Episode ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-secondary">
                                                    <span className="text-2xl font-bold text-muted-foreground">
                                                        {index + 1}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="absolute bottom-0 left-0 right-0 p-2">
                                                <div className="text-xs font-semibold">
                                                    Episode {index + 1}
                                                </div>
                                                {episode.title && (
                                                    <div className="text-xs text-gray-300 line-clamp-1">
                                                        {episode.title}
                                                    </div>
                                                )}
                                            </div>

                                            {currentEpisode === index && (
                                                <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                                                    <Play className="h-3 w-3 fill-current" />
                                                </div>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </ScrollArea>
                        </Card>
                    </TabsContent>

                    {/* Details Tab */}
                    <TabsContent value="details" className="mt-4">
                        <Card className="border-0 bg-card p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {dramaInfo.director && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                                            Director
                                        </h3>
                                        <p className="text-base">{dramaInfo.director}</p>
                                    </div>
                                )}

                                {dramaInfo.cast && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                                            Cast
                                        </h3>
                                        <p className="text-base">{dramaInfo.cast}</p>
                                    </div>
                                )}

                                {dramaInfo.year && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                                            Release Year
                                        </h3>
                                        <p className="text-base">{dramaInfo.year}</p>
                                    </div>
                                )}

                                {episodeList.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                                            Episodes
                                        </h3>
                                        <p className="text-base">{episodeList.length} Episodes</p>
                                    </div>
                                )}
                            </div>

                            {dramaInfo.longDescription && (
                                <div className="pt-4">
                                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                                        Synopsis
                                    </h3>
                                    <p className="text-base leading-relaxed">
                                        {dramaInfo.longDescription}
                                    </p>
                                </div>
                            )}
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-4">
                    {currentEpisode > 0 ? (
                        <Link
                            href={`/watch/${dramaId}?episode=${currentEpisode - 1}`}
                            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-smooth"
                        >
                            <span>Previous Episode</span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {currentEpisode < episodeList.length - 1 && (
                        <Link
                            href={`/watch/${dramaId}?episode=${currentEpisode + 1}`}
                            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-smooth"
                        >
                            <span>Next Episode</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
