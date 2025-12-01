import VideoCard from './VideoCard';

export default function VideoGrid({ dramas = [], loading = false }) {
    // Ensure dramas is always an array
    const dramasList = Array.isArray(dramas) ? dramas : [];

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div
                        key={index}
                        className="aspect-[2/3] bg-muted rounded-lg animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (dramasList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-semibold mb-2 text-white">No dramas found</h3>
                <p className="text-gray-400">
                    Waiting for API data. Please provide API response examples to display content.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 animate-fadeIn">
            {dramasList.map((drama, index) => (
                <VideoCard key={drama.id || index} drama={drama} />
            ))}
        </div>
    );
}
