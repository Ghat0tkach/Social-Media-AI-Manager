import express from 'express';
import bodyParser from 'body-parser';
import SocialPost from 'social-post-api';
import * as dotenv from 'dotenv';
dotenv.config()
const router = express.Router();
import axios from 'axios'

// Middleware to parse JSON in request body
const jsonParser = bodyParser.json();

router.route('/').post(jsonParser, async (req, res) => {
    try {
        const data = req.body;
        const headers = {
          'Authorization': `Bearer ${process.env.API_KEY}`,
          'Content-Type': 'application/json',
        };
    
        const response = await axios.post('https://app.ayrshare.com/api/post', data, { headers });
        const responseData = response.data;
    
        res.json(responseData);
      } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'An error occurred while scheduling the post.' });
      }
});

export default router;
