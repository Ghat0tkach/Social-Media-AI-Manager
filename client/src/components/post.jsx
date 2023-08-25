import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = ({ imageUrl, caption }) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPosted, setIsPosted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submitting the form
    try {
      const requestData = {
        post: caption,
        platforms: ['twitter'],
        mediaUrls: imageUrl ? [imageUrl] : []
      };

      const API_KEY = import.meta.env.VITE_POST;

      const response = await axios.post('https://app.ayrshare.com/api/post', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      setResponse(response.data);
      setIsPosted(true);
    } catch (error) {
      console.error('Error posting:', error);
    } finally {
      setIsLoading(false); // Set loading back to false after posting attempt
    }
  };

  return (
    <div className="max-w-md z-10 mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl mb-4">Post on Twitter</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Caption:</label>
          <p className="p-2 border rounded-md bg-gray-100 overflow-hidden overflow-ellipsis">{caption}</p>
        </div>
        {imageUrl && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Media URL:</label>
            <p className="w-full p-2 border rounded-md bg-gray-100 overflow-hidden overflow-ellipsis">
              {imageUrl}
            </p>
          </div>
        )}
        <button
          type="submit"
          className={`bg-${isPosted ? 'green-500' : isLoading ? 'yellow-500' : 'blue-500'} text-white px-4 py-2 rounded hover:bg-${
            isPosted ? 'green-600' : isLoading ? 'yellow-600' : 'blue-600'
          }`}
          disabled={isLoading || isPosted}
        >
          {isLoading ? 'Posting...' : isPosted ? 'Posted Successfully' : 'Post'}
        </button>
      </form>
      {response && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">API Response:</h3>
          <pre className="bg-gray-100 p-4 rounded-md mt-2 overflow-x-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Post;
