import express from 'express';
import googleTrends from 'google-trends-api';
const router = express.Router();
// import util from 'util'
// const relatedQueriesPromise = util.promisify(googleTrends.relatedQueries);
router.route('/').get( async (req, res) => {
    const userKeyword = req.query.keyword;
    const userLocation = req.query.location; // For example: 'US-CA'
    const userLanguage = req.query.language; // For example: 'en-US'
    
    try {
      const results = await relatedQueries({
        keyword: userKeyword,
        geo: userLocation,
        hl: userLanguage,
      });
      res.json(results);
    } catch (error) {
      console.error('Error fetching Google Trends data:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

export default router;
