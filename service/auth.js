const sessionIdtoUserMap=new Map();

function setuser(id,user){
    sessionIdtoUserMap.set(id,user);
}

function getuser(id){
    return sessionIdtoUserMap.get(id);
}


module.exports={
    setuser,getuser,
}