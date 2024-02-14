const mongoose=require("mongoose")
const {Account}=require("./db")
const TransferFundsWithTransactions=async(fromAccountId,toAccountById,amount)=>{
    const session=await mongoose.startSession()
    session.startTransaction()
    try{
    const sender=await Account.findById(fromAccountId)
    const senderBalance=sender.balance
    if(senderBalance>=amount)
     {

    await Account.findByIdAndUpdate(fromAccountId,{$inc:{balance:-amount}},{session})
    await Account.findByIdAndUpdate(toAccountById,{$inc:{balance:+amount}},{session})
     
    await session.commitTransaction()
    await session.endSession()
    console.log(`funds transferred successfully`)
     }
    }
    catch(err){
    await session.abortTransaction()
    session.endSession()
    console.log(err)
    }
}