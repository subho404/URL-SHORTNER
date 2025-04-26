const express=require('express')
const {handlegenerateShortURL, handlegetAnalytics}=require('../controllers/url.js');
const router= express.Router();
router.get('/', (req, res) => {
    res.json({ message: 'URL route is working!' });
});


router.post('/',handlegenerateShortURL)
router.get('/analytics/:shortId',handlegetAnalytics)

module.exports=router;


