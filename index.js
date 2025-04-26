const express=require('express')
const urlRoute=require('./routes/url.js')
const URL=require('./models/url.js')
const {connectToMongoDB}=require('./connect')
const app=express();
const PORT=8001;
app.use(express.json())
app.use('/url',urlRoute);
app.get('/:shortId',async(req,res)=>{
   const shortId=req.params.shortId;
   const entry=await URL.findOneAndUpdate({
    shortId,
   },{$push:{
    visitHistory:{
        timestamp:Date.now(),
    },
   }})

   res.redirect(entry.redirectURL);
})
connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log('mongodb connected'));

app.listen(PORT,()=>console.log(`server started at PORT: ${PORT}`))