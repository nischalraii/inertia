import { Link, Head } from '@inertiajs/react';
import PostCard from '@/Components/PostCard';

export default function Welcome({ auth, posts }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="text-black/50 min-h-screen flex flex-col items-center justify-center bg-gray-100 selection:bg-[#FF2D20] selection:text-white">
                <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                    <header className="grid grid-cols-2 gap-2 py-10 lg:grid-cols-3 items-center">
                        <div className="flex justify-center lg:col-start-2 lg:justify-center">
                        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Welcome to Tech Hub</h1>
                        </div>
                        <nav className="flex justify-end space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-4 py-2 text-white bg-gray-800 rounded-md shadow-md ring-1 ring-transparent transition hover:bg-gray-700 focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-4 py-2 text-white bg-gray-800 rounded-md shadow-md ring-1 ring-transparent transition hover:bg-gray-700 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-4 py-2 text-white bg-gray-800 rounded-md shadow-md ring-1 ring-transparent transition hover:bg-gray-700 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="container mx-auto px-6 py-8">
                        
                        <h2 className="text-4xl font-semibold text-gray-700 mb-4">Latest Posts</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {posts.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
