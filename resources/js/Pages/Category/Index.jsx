import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import CategoryTable from '@/Components/CategoryTable';
import { route } from 'ziggy-js';

export default function Dashboard({ auth, categories }) {

    // Function to handle editing a category
    const handleEdit = (categoryId) => {
        // Redirect to the edit page for the specific category
        window.location.href = route('categories.edit', { id: categoryId });
    };

    // Function to handle deleting a category
    const handleDelete = (categoryId) => {
        // Implement delete functionality here, e.g., show confirmation and delete category
        console.log('Delete category:', categoryId);
        if (window.confirm('Are you sure you want to delete this category?')) {
            router.delete(route('categories.destroy', categoryId));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category Index</h2>}
        >
            <Head title="Category Index" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 text-gray-900">This is category Index!</div> */}
                        <div className='container-lg'>
                            <CategoryTable items={categories} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
