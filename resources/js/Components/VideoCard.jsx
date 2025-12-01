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
            <Card className="group relative overflow-hidden border-0 bg-card hover-lift shine cursor-pointer">
                {/* Thumbnail */}
                <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Play className="h-6 w-6 text-black fill-current" />
                        </div>
                    </div>

                    {/* Corner Badge (Terbaru, Eksklusif, etc.) */}
                    {corner && (
                        <div
                            className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold text-white"
                            style={{ backgroundColor: corner.color || '#4D65ED' }}
                        >
                            {corner.name}
                        </div>
                    )}

                    {/* Rank Badge */}
                    {rank && (
                        <div className="absolute top-2 right-2 glass px-2 py-1 rounded-lg flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs font-semibold text-white">{rank.hotCode}</span>
                        </div>
                    )}

                    {/* Play Count */}
                    {playCount && (
                        <div className="absolute bottom-2 right-2 glass px-2 py-1 rounded flex items-center space-x-1">
                            <Eye className="h-3 w-3 text-gray-300" />
                            <span className="text-xs font-semibold text-gray-200">{playCount}</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-white transition-colors text-white">
                        {title}
                    </h3>

                    {description && (
                        <p className="text-xs text-gray-400 line-clamp-2">
                            {description}
                        </p>
                    )}

                    {/* Info Row */}
                    <div className="flex items-center justify-between pt-2">
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {tags.slice(0, 2).map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs px-2 py-0 bg-white/10 text-gray-300 border-0">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {chapterCount > 0 && (
                            <span className="text-xs text-gray-400">
                                {chapterCount} EP
                            </span>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    );
}
