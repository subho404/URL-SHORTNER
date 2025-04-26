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

      return res.json({id:shortId});
}


async function handlegetAnalytics(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOne({shortId});
    if(!entry) return res.status(404).json({error:'url not found'})
    return res.json({
        shortId:entry.shortId,
        redirectURL:entry.redirectURL,
        visitHistory:entry.visitHistory,
    })
}
module.exports={
    handlegenerateShortURL,
    
}