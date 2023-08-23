import React, { useState } from 'react';

const Post = ({ onSubmit }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ imageUrl, caption });
    setImageUrl('');
    setCaption('');
  };

  return (
    <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-gray-700 font-semibold">
          Image URL:
        </label>
        <input
          type="text"
          id="imageUrl"
          className="mt-1 p-2 w-full border rounded-md"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="caption" className="block text-gray-700 font-semibold">
          Caption:
        </label>
        <textarea
          id="caption"
          className="mt-1 p-2 w-full border rounded-md"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Post
      </button>
    </form>
  );
};

export default Post;
