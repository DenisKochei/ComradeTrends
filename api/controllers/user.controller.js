import {errorHandler} from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

const user = (req,res)=>{
  res.json('Hello world')
}

export default user;

export const updateUser = async (req,res,next)=>{
  if (req.user.id !== req.params.userId){
    return next(errorHandler(403,"You are not allowed to update this user"))
  }
  if(req.body.password){
    if(req.body.password.length < 6){
      return next(errorHandler(400,"The password must be atleast 6 characters"))
    }
    req.body.password = bcryptjs.hashSync(req.body.password,10)
  }
  if(req.body.username){
    if(req.body.username.length < 2 || req.body.username.length > 20){
      return next(errorHandler(400,"Username must be between 3 and 20 characters"))
    }
    if(req.body.username.includes(' ')){
      return next(errorHandler(400,"The username cannot include spaces"))
    }
    if(req.body.username !== req.body.username.toLowerCase()){
      return next(errorHandler(400,"The Username must be in lower Case"))
    }
  }
  try{  
    const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
      $set:{
        username : req.body.username,
        email: req.body.email,
        password:req.body.password,
        profilePicture: req.body.profilePicture,
      }
    },{new:true});
    const {password,...rest} = updatedUser._doc;
    res.status(200).json(rest);
  }catch(err){
    next(err)
  }
}

export const deleteUser = async (req,res,next)=>{
  if(req.user.id !== req.params.userId){
    next(errorHandler(403,'You are not allowed to delete this account'))
  }
  try{
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json('User has been deleted')
  }catch(err){
    next(err)
  }
}
export const signout = (req,res,next)=>{
 try{
  res.clearCookie('access_token').status(200).json('User has signed out')
 }catch(err){
  next(err)
 }
}