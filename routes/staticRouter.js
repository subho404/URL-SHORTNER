const express=require('express')
const URL=require('../models/url');
const router=express.Router()
router.get('/',async(req,res)=>{
    const allURLS=await URL.find({})
    return res.render('home',{
        urls:allURLS,
    })
})

router.get('/signup',(req,res)=>{
    return res.render('signup')
})

router.get('/login',(req,res)=>{
    return res.render('login')
})

module.exports=router;