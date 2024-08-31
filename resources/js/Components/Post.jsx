import React from 'react';

// Post component definition
const Post = ({ post }) => {
  // Split the tags string into an array
  const tagsArray = post.tags ? post.tags.split(',').map(tag => tag.trim()) : [];

  return (
    <article className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Post Image */}
      {post.featured_image && (
        <img
          src={post.featured_image.startsWith('http') ? post.featured_image : `/images/${post.featured_image}`}
          alt={post.title}
          className="w-full h-64 object-cover object-center rounded-t-lg"
        />
      )}

      {/* Post Content */}
      <div className="p-4">
        {/* Post Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>

        {/* Post Metadata */}
        <div className="text-gray-600 text-sm mb-4">
          <span>By {post.authorName}</span> | <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>

        {/* Post Body */}
        <div className="text-gray-700 leading-relaxed mb-4">
          {post.body}
        </div>

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

export default Post;
