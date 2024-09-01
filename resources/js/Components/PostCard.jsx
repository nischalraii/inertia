// resources/js/Components/PostCard.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

const PostCard = ({ post }) => {
    // Split the tags string into an array
    const tagsArray = post.tags ? post.tags.split(',').map(tag => tag.trim()) : [];

    return (
        <article className="w-full max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-80">
            {/* Post Image */}
            {post.featured_image && (
                <img
                    src={post.featured_image.startsWith('http') ? post.featured_image : `/images/${post.featured_image}`}
                    alt={post.title}
                    className="w-full h-40 object-cover object-center"
                />
            )}

            {/* Post Content */}
            <div className="flex-1 p-4">
                {/* Post Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    <Link href={route('posts.show', post.id)} className="hover:text-blue-600">
                        {post.title}
                    </Link>
                </h2>

                {/* Post Metadata */}
                <div className="text-gray-600 text-sm mb-4">
                    <span>By {post.authorName}</span> | <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>

                {/* Post Body */}
                <p className="text-gray-700 mb-4 truncate">{post.body}</p>

                {/* Optional Tags Section */}
                {tagsArray.length > 0 && (
                    <div className="flex flex-wrap mt-4">
                        {tagsArray.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs font-semibold bg-gray-200 text-gray-700 rounded-full px-2 py-1 mr-2 mb-2"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

export default PostCard;
