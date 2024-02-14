const express=require("express")
const {User}=require("../db")
const {Account}=require("../db")
const router=express.Router()
const z=require("zod")
const jwt=require("jsonwebtoken")
const JWT_SECRET=require("../config")
const userAuthorization=require("../middleware/user")
const signupSchema=z.object({
   firstName:z.string(),
   lastName:z.string(),
   userName:z.string(),
   password:z.string().min(6)

})
router.post("/signup",async(req,res,next)=>{
 const {firstName,lastName,userName,password}=req.body
 try{
   const validInput=signupSchema.parse(req.body)
 const user=await User.create({
    firstName:firstName,
    lastName:lastName,
    userName:userName,
    password:password
 })
 const userId=user._id
 const result=await Account.create({
     userId,
     balance:(1+Math.random()*1000)
 })
 res.send("done")
}catch(err){
   console.log(err)
}
})
 router.post("/signin",async (req,res,next)=>{
   const { userName,password}=req.body
   try{
       const user =await User.findOne({
         userName:userName,
         password:password
       })
       console.log(user._id)
       if(user ){
         // console.log(user._id)
          const token=jwt.sign({userId:user._id},JWT_SECRET)
          res.send(token)
      
      }}
       catch(err){
         console.log(err)
         res.send("user does not exist")
   
   
   }
})

 
router.put("/update",userAuthorization,async(req,res)=>{
   
   try{
   const {firstName,lastName,password}=req.body
   const updateObject={}
   console.log("hi2")
   if(firstName) updateObject.firstName=firstName
   if(lastName) updateObject.lastName=lastName
   if(password) updateObject.password=password
   console.log( updateObject +"updated obj")
   const decodedToken=req.decodedToken
   console.log(decodedToken)
   const update=await User.updateOne(
    {"_id":decodedToken.userId},
    {$set:updateObject}
      )
      if(update.modifiedCount>0){
        res.send("user updated successfully")
      }
}catch(err){
console.log(err)
}})

 

router.get("/bulk",async (req,res)=>{
 const  filter=req.query.filter
 console.log(filter)
 //const reciever=JSON.parse(filter)
   //if(filter.firstName) reciever.firstName=firstName
   //if(filter.lastName) reciever.lastName=lastName
  //console.log(reciever)
  const userExists=await User.find(
 {$or:[
 {firstName:filter},
 {lastName:filter}
 ]
 }
 )
 console.log(userExists)
  if(userExists.length>0){

    res.send("the user is :"+userExists[0])
  }
  else{
    res.send("the user does not exist")

  }

})
module.exports=router 