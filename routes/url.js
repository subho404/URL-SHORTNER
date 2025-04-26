const express=require('express')
const {handlegenerateShortURL}=require('../controllers/url.js');
const {handlegetAnalytics}=require('../controllers/url.js')
const router= express.Router();
router.get('/', (req, res) => {
    res.json({ message: 'URL route is working!' });
});

router.get('/analytics',handlegetAnalytics)
router.post('/',handlegenerateShortURL)
module.exports=router;