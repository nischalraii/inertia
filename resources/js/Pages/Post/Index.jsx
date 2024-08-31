import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import PostTable from '@/Components/PostTable';
import { route } from 'ziggy-js';

export default function Dashboard({ auth, posts }) {

    // Function to handle editing a post
    const handleEdit = (postId) => {
        // Redirect to the edit page for the specific post
        window.location.href = route('posts.edit', { id: postId });
    };

    // Function to handle deleting a post
    const handleDelete = (postId) => {
        // Implement delete functionality here, e.g., show confirmation and delete post
        console.log('Delete post:', postId);
        
        if (window.confirm('Are you sure you want to delete this post?')) {
            // Send a delete request to the server using Inertia
            router.delete(route('posts.destroy', postId));
        }
    };
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Post Index</h2>}
        >
            <Head title="Post Index" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 text-gray-900">This is Post Index!</div> */}
                        <div className='container-lg'>
                            <PostTable items={posts} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
