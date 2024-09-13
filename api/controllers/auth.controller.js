import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'; 

export const signup = async (req,res)=>{
  const {username,email,password} = req.body;
  if(!username || !email || !password || username === "" || email ==="" || password === "" ){
    return res.status(404).json({message:"All the fields must be filled out"})
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
    res.status(500).json(err.message)
  }
  


}
