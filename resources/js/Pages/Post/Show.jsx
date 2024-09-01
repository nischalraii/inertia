import { Head, Link } from '@inertiajs/react';
import Post from '@/Components/Post';

export default function Dashboard({ auth, post }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-end bg-white shadow-md">
                <nav className="flex space-x-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="px-4 py-2 text-white bg-gray-800 rounded-md shadow-md transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="px-4 py-2 text-white bg-gray-800 rounded-md shadow-md transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-4 py-2 text-white bg-gray-800 rounded-md shadow-md transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            <main className="flex-grow py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='container-lg'>
                            <Post post={post} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
