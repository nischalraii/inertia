import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function CreateCategoryForm({ }) {
    // Initialize form handling with useForm
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);

        // Log FormData to check content
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(key, value.name); // Log the file name to ensure the file is being appended correctly
            } else {
                console.log(key, value);
            }
        }

        post(route('categories.store'), {
            data: formData,
        });
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Create New Category</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Fill in the details below to create a new category.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Title" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />
                    <textarea
                        id="description"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        required
                        autoComplete="description"
                        rows={5}
                    />
                    <InputError className="mt-2" message={errors.description} />
                </div>


                <div className="flex items-center justify-end mt-4">
                    <button type="submit" className="btn btn-primary" disabled={processing}>
                        Create Category
                    </button>
                </div>
            </form>
        </section>
    );
}
