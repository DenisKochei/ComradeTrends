import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'; 
import { errorHandler } from "../utils/error.js";

export const signup = async (req,res,next)=>{
  const {username,email,password} = req.body;
  if(!username || !email || !password || username === "" || email ==="" || password === "" ){
    next(errorHandler(400,'All fields are required'))
  }

  const hashedPassword = bcryptjs.hashSync(password,10)

  //The "10" is the the salt rounds. It represents the number of times bcrypt stirs the cauldron (i.e., the number of hashing rounds).

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try{
    await newUser.save();
    res.json({message:"Signup Successful"})
  }catch(err){
    next(err);
  }
}
