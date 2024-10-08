import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePostForm from './Partials/UpdatePostForm';

export default function Dashboard({ auth, post, categories,status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Post: {post.title}</h2>}
        >
            <Head title="Edit Post" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UpdatePostForm post={post} categories={categories} statuses={status} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
