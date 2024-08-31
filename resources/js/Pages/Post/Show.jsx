import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import Post from '@/Components/Post';
import { route } from 'ziggy-js';

export default function Dashboard({ auth, post }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Post Index" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 text-gray-900">This is Post Index!</div> */}
                        <div className='container-lg'>
                            <Post post={post}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
