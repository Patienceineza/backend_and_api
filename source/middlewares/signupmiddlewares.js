const users = require('../models/user')

const signupvalidating  = (data,res,next)=>{
if(!data.email)return res.json({error:"email is missing"});
if(!data.fullname) return res.json({error:"name  is missing"});
if(!data.password) return res.json({error:"password is missing"});
if(users.find((u) =>u.email == data.email))  return res.json({message:`the user with ${data.email} is already registered`});;
next()
}

module.exports  = signupvalidating;
 