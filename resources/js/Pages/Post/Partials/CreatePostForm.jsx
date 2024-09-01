import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function CreatePostForm({ categories }) {
    // Initialize form handling with useForm
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        body: '',
        category_id: '',
        tags: '',
        status_id: '', // Include status in form initialization
        featured_image: null,
    });

    const statusOptions = [
        {
            "id": 1,
            "name": "Draft",
        },
        {
            "id": 2,
            "name": "Published",
        }
    ];

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();
        console.log("submit")

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('body', data.body);
        formData.append('category_id', data.category_id);
        formData.append('tags', data.tags);
        formData.append('status_id', data.status_id); // Append status

        if (data.featured_image) {
            formData.append('featured_image', data.featured_image);
        }

        // Log FormData to check content
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(key, value.name); // Log the file name to ensure the file is being appended correctly
            } else {
                console.log(key, value);
            }
        }

        post(route('posts.store'), {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Create New Post</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Fill in the details below to create a new post.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="Title" />
                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                        autoComplete="title"
                    />
                    <InputError className="mt-2" message={errors.title} />
                </div>

                <div>
                    <InputLabel htmlFor="body" value="Body" />
                    <textarea
                        id="body"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        required
                        autoComplete="body"
                        rows={5}
                    />
                    <InputError className="mt-2" message={errors.body} />
                </div>

                <div>
                    <InputLabel htmlFor="category_id" value="Category" />
                    <select
                        id="category_id"
                        className="mt-1 block w-full"
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <InputError className="mt-2" message={errors.category_id} />
                </div>

                <div>
                    <InputLabel htmlFor="tags" value="Tags" />
                    <TextInput
                        id="tags"
                        className="mt-1 block w-full"
                        value={data.tags}
                        onChange={(e) => setData('tags', e.target.value)}
                        required
                        autoComplete="tags"
                    />
                    <InputError className="mt-2" message={errors.tags} />
                </div>

                <div>
                    <InputLabel htmlFor="status_id" value="Status" />
                    <select
                        id="status_id"
                        className="mt-1 block w-full"
                        value={data.status_id}
                        onChange={(e) => setData('status_id', e.target.value)}
                        required
                    >
                        <option value="">Select Status</option>
                        {statusOptions.map(status => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                    <InputError className="mt-2" message={errors.status_id} /> {/* Fixed error message */}
                </div>

                <div>
                    <InputLabel htmlFor="featured_image" value="Featured Image" />
                    <input
                        type="file"
                        id="featured_image"
                        className="mt-1 block w-full"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setData('featured_image', file);
                        }}
                    />
                    <InputError className="mt-2" message={errors.featured_image} />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button type="submit" className="px-4 py-2 bg-gray-600 text-white rounded mr-2" disabled={processing}>
                        Create Post
                    </button>
                </div>
            </form>
        </section>
    );
}
