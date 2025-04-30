
const User = require("../models/user.js");

async function handleuserSignUp(req,res) {

    const {name,email,password}=req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.render('home');

}

module.exports=handleuserSignUp;