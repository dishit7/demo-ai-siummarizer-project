const express=require("express")
const app=express()
const jwt=require("jsonwebtoken")
const JWT_SECRET=require("../config")
function userAuthorization(req,res,next){
    try{
    const token=req.headers.authorization
    console.log(token)
    const decodedToken=jwt.verify(token,JWT_SECRET)
    console.log(decodedToken)
    req.decodedToken=decodedToken
    next()
    console.log("hi")
    }
    catch(err){
    console.log(err)
    }
}
module.exports=userAuthorization