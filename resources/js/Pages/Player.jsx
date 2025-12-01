import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Play, ChevronRight, Lock } from "lucide-react";
import { Card } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { ScrollArea } from "@/Components/ui/scroll-area";

export default function Player({
    dramaId,
    currentEpisode = 0,
    chapters,
    watchData,
}) {
    // API returns: chapters.chapterList array, watchData.videoUrl
    const episodeList = chapters?.chapterList || [];
    const videoUrl = watchData?.videoUrl || "";
    const qualities = watchData?.qualities || [];
    const cover = watchData?.cover || "";

    return (
        <AppLayout>
            <Head title={`Episode ${parseInt(currentEpisode)} - DramaBox`} />

            <div className="max-w-7xl mx-auto">
                {/* 2-Column Layout: Video Player + Episode List */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                    {/* Left Column - Video Player */}
                    <div className="space-y-6">
                        {/* Video Player Section */}
                        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                            {videoUrl ? (
                                <video
                                    src={videoUrl}
                                    controls
                                    autoPlay
                                    className="w-full h-full"
                                    poster={cover}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                                    <div className="text-center space-y-4">
                                        <Play className="h-16 w-16 mx-auto text-muted-foreground" />
                                        <p className="text-muted-foreground">
                                            {watchData
                                                ? "Video not available"
                                                : "Loading video..."}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Drama Info */}
                        <div className="glass-card p-6 rounded-xl space-y-4">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <h1 className="text-2xl md:text-3xl font-bold font-display text-white">
                                        Episode {parseInt(currentEpisode)}
                                    </h1>

                                    <p className="text-gray-400">
                                        {episodeList.length > 0
                                            ? `${episodeList.length} Episodes Available`
                                            : "Loading episodes..."}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-white/10 text-gray-300 border-0"
                                        >
                                            Drama ID: {dramaId}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center">
                            {currentEpisode > 0 ? (
                                <Link
                                    href={`/watch/${dramaId}?episode=${
                                        currentEpisode - 1
                                    }`}
                                    className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-smooth"
                                >
                                    <span>Previous Episode</span>
                                </Link>
                            ) : (
                                <div />
                            )}

                            {currentEpisode < episodeList.length - 1 && (
                                <Link
                                    href={`/watch/${dramaId}?episode=${
                                        currentEpisode + 1
                                    }`}
                                    className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-white text-black hover:bg-gray-200 transition-smooth"
                                >
                                    <span>Next Episode</span>
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar - Episode List */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
                            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
                                    <Play className="h-4 w-4 text-primary" />
                                    Episodes
                                </h2>
                                <span className="text-xs text-muted-foreground font-medium px-2 py-1 rounded-md bg-white/5">
                                    {episodeList.length} Total
                                </span>
                            </div>
                            <ScrollArea className="h-[calc(100vh-200px)]">
                                <div className="p-4">
                                    <div className="grid grid-cols-5 gap-2.5">
                                        {episodeList.map((chapter) => {
                                            const episodeNumber =
                                                chapter.chapterIndex;
                                            const isLocked =
                                                chapter.isCharge === 1 &&
                                                chapter.isPay === 0;
                                            const isCurrent =
                                                currentEpisode == episodeNumber;

                                            return (
                                                <Link
                                                    key={
                                                        chapter.chapterId ||
                                                        episodeNumber
                                                    }
                                                    href={`/watch/${dramaId}?episode=${episodeNumber}`}
                                                    className={`group relative aspect-square rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                                                        isCurrent
                                                            ? "ring-2 ring-primary shadow-lg shadow-primary/25"
                                                            : "hover:ring-1 hover:ring-white/20"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-full h-full flex flex-col items-center justify-center ${
                                                            isCurrent
                                                                ? "bg-primary text-white"
                                                                : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-white"
                                                        }`}
                                                    >
                                                        {isLocked ? (
                                                            <>
                                                                <Lock
                                                                    className={`h-3.5 w-3.5 mb-1 ${
                                                                        isCurrent
                                                                            ? "text-white/80"
                                                                            : "text-muted-foreground"
                                                                    }`}
                                                                />
                                                                <span
                                                                    className={`text-[10px] font-bold ${
                                                                        isCurrent
                                                                            ? "text-white"
                                                                            : "text-muted-foreground"
                                                                    }`}
                                                                >
                                                                    {
                                                                        episodeNumber
                                                                    }
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span
                                                                className={`text-base font-bold ${
                                                                    isCurrent
                                                                        ? "text-white"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {episodeNumber}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {isCurrent && (
                                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                                                    )}

                                                    {isLocked && !isCurrent && (
                                                        <div className="absolute top-1 right-1">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                                        </div>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
