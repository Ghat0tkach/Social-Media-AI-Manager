import express from 'express';
import googleTrends from 'google-trends-api';
const router = express.Router();

router.route('/').get((req, res) => {
    
    googleTrends.realTimeTrends({
        geo: 'IN',
        category: 'all',
        hl:'en'
    }, function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'An error occurred' });
         } else {
           const trendsData = JSON.parse(results);
           res.json(trendsData);
         } 
    });
});

export default router;
