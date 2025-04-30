const shortid=require('shortid')
const URL=require('../models/url.js')
async function handlegenerateShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(500).json()({error:'url is required'})
      const shortId=shortid()
      await URL.create({
        shortId,
        redirectURL:body.url,
        visitHistory:[],
      });
      const allUrls=await URL.find({});
     return res.render('home',{
      id:shortId,
      urls:allUrls
     });
      
}


async function handlegetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,analyrics:result.visitHistory});

}
module.exports={
    handlegenerateShortURL,
    handlegetAnalytics,
    
}