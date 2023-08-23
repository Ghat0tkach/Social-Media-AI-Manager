import React, { useState } from 'react';
// import SocialPost from 'social-post-api';
import { Post } from '../components';


const SchedulePost = () => {
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const handlePostSubmit = async (postData) => {
//     try {
//       const social = new SocialPost('5MA83GH-6EZ45ME-PS1TKHG-Q8V2PZM'); // Replace with your actual API key
//       const content = {
//         post: postData.caption,
//         mediaUrls: [postData.imageUrl],
//         shorten_links: true,
//         platforms: ['twitter'],
//       };

//       const json = await social.post(content);
//       setResponse(json);
//     } catch (error) {
//       console.error('Error posting to social media:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Social Media Post Result</h2>
      <Post/>
     
    </div>
  );
};

export default SchedulePost;
