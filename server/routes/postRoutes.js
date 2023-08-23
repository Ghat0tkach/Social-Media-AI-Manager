import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});


router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  }  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
  
});
router.route('/:postId').delete(async (req, res) => {
    const { postId } = req.body;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
  
      await cloudinary.uploader.destroy(post.photoPublicId); // Delete image from Cloudinary
      await post.remove(); // Delete post from the database
  
      res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to delete post, please try again' });
    }
  });

export default router;