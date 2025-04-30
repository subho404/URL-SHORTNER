const express=require('express')
const path=require('path')
const urlRoute=require('./routes/url.js')
const URL=require('./models/url.js')
const {connectToMongoDB}=require('./connect')
const staticRoute=require('./routes/staticRouter.js')
const app=express();
const PORT=8001;
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use('/url',urlRoute);
app.use('/',staticRoute);
app.get('/test',async(req,res)=>{
    const allurls=await URL.find({});
    return res.render('home',{
      urls:allurls
    });
})
app.get('/url/:shortId',async(req,res)=>{
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