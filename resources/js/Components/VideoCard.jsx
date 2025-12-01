import { Link } from '@inertiajs/react';
import { Play, Star } from 'lucide-react';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

export default function VideoCard({ drama }) {
    // Safely extract drama data with fallbacks
    const {
        id,
        title = 'Untitled',
        description = '',
        thumbnail = '',
        poster = '',
        rating = 0,
        genres = [],
        episodes = 0,
    } = drama || {};

    const imageUrl = thumbnail || poster || '/images/placeholder.jpg';

    return (
        <Link href={`/watch/${id}`}>
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
                        <div className="bg-primary rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Play className="h-6 w-6 text-primary-foreground fill-current" />
                        </div>
                    </div>

                    {/* Rating Badge */}
                    {rating > 0 && (
                        <div className="absolute top-2 right-2 glass px-2 py-1 rounded-lg flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs font-semibold">{rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>

                    {description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                            {description}
                        </p>
                    )}

                    {/* Info Row */}
                    <div className="flex items-center justify-between pt-2">
                        {genres.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {genres.slice(0, 2).map((genre, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                                        {genre}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {episodes > 0 && (
                            <span className="text-xs text-muted-foreground">
                                {episodes} EP
                            </span>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    );
}
