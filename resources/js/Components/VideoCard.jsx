import { Link } from '@inertiajs/react';
import { Play, Star, Eye } from 'lucide-react';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

export default function VideoCard({ drama }) {
    // API fields: bookId, bookName, introduction, cover, chapterCount, playCount, tags, corner, rank
    const {
        bookId,
        id, // From transformed data (bookId mapped to id)
        bookName,
        introduction,
        cover,
        chapterCount,
        playCount,
        tags = [],
        corner,
        rank,
    } = drama || {};

    // Use bookId or id for the watch URL
    const dramaId = bookId || id;
    const title = bookName || 'Untitled';
    const description = introduction || '';
    const imageUrl = cover || '/images/placeholder.jpg';

    return (
        <Link href={`/watch/${dramaId}`}>
            <Card className="group relative overflow-hidden border-0 bg-card/50 hover:bg-card transition-colors duration-300 rounded-xl hover:shadow-2xl hover:shadow-primary/10 cursor-pointer h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4 shadow-lg shadow-primary/20">
                            <Play className="h-6 w-6 text-white fill-current" />
                        </div>
                    </div>

                    {/* Corner Badge (Terbaru, Eksklusif, etc.) */}
                    {corner && (
                        <div
                            className="absolute top-2 left-2 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
                            style={{ backgroundColor: corner.color || '#7c3aed' }}
                        >
                            {corner.name}
                        </div>
                    )}

                    {/* Rank Badge */}
                    {rank && (
                        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md flex items-center space-x-1 border border-white/10">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs font-bold text-white">{rank.hotCode}</span>
                        </div>
                    )}

                    {/* Play Count */}
                    {playCount && (
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1">
                            <Eye className="h-3 w-3 text-gray-300" />
                            <span className="text-[10px] font-medium text-gray-200">{playCount}</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 flex-1 flex flex-col">
                    <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors text-white line-clamp-2">
                        {title}
                    </h3>

                    {description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    )}

                    {/* Info Row */}
                    <div className="flex items-center justify-between pt-2 mt-auto">
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {tags.slice(0, 2).map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border-0 hover:bg-primary/20">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {chapterCount > 0 && (
                            <span className="text-[10px] font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                                {chapterCount} EP
                            </span>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    );
}
