const {v4: uuidv4}=require('uuid');
const User=require('../models/user')
const URL=require('../models/url');
const { setuser } = require('../service/auth');
async function handleuserSignUp(req,res) {

    const {name,email,password}=req.body;

    await User.create({
        name,
        email,
        password,
    });
    const allUrls=await URL.find({});
    return res.render('home',{
        urls:allUrls
    });

}


async function handleuserLogin(req,res) {

    const {email,password}=req.body;

   const user=await User.findOne({email,password});
   console.log('user',user);
   
   if(!user)
    return res.render('login',{
error:'invalid credentials'});

const sessionId=uuidv4();
setuser(sessionId,user);
res.cookie('uid',sessionId);
 return res.redirect('/');

   }

module.exports={handleuserSignUp,handleuserLogin,}