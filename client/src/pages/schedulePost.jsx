import React, { useState } from 'react';

const SchedulePost = () => {
  const [post, setPost] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const API_KEY = import.meta.env.VITE_POST;

    const requestData = {
      post,
      platforms: ['twitter'],
    };

    if (mediaUrl) {
      requestData.mediaUrls = [mediaUrl];
    }

    try {
      const response = await fetch('https://app.ayrshare.com/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(requestData)
      });

      const responseData = await response.json();
      setResponse(responseData);
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl mb-4">Share on Twitter</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Post:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Media URL:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post
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

export default SchedulePost;
