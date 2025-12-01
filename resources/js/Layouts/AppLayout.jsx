import Header from '@/Components/Header';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-background dark">
            <Header />

            <main className="container mx-auto px-4 py-6 md:py-8">
                {children}
            </main>

            <footer className="border-t border-border mt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-bold font-display text-gradient mb-4">
                                DramaBox
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Your ultimate destination for streaming the best dramas.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <a href="/" className="hover:text-primary transition-colors">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/new-releases" className="hover:text-primary transition-colors">
                                        New Releases
                                    </a>
                                </li>
                                <li>
                                    <a href="/trending" className="hover:text-primary transition-colors">
                                        Trending
                                    </a>
                                </li>
                                <li>
                                    <a href="/browse" className="hover:text-primary transition-colors">
                                        Browse
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <p className="text-sm text-muted-foreground">
                                © 2024 DramaBox. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
