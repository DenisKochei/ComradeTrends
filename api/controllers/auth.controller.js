import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'; 
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'


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
    if (err.message.includes("email_1 dup key")) {
      next(errorHandler(400,"The email is already in use"))
    }
    next(errorHandler(400,"Network interuption,please try again"))
  }
}

export const signin = async (req,res,next)=>{
  const {email,password} = req.body;

  if(!email || !password || email === "" || password === ""){
    next(errorHandler(400,'All fields are required'));
  }
  try{
    const validUser = await User.findOne({email})
   
    if(!validUser){
     return next(errorHandler(404,'User not found, please signup')); 
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    //password is what we get from the form while validuser.passowrd is what database
    if(!validPassword){
      return next(errorHandler(400,'Invalid Password or email')); 
    }
    //When comparing both the email and the password it is best to make the message not clear by saying that either or both the email or the password is incorrect
    const token = jwt.sign({id : validUser._id, isAdmin : validUser.isAdmin}, process.env.JWT_SECRET);

    const {password : pass , ...rest} = validUser._doc;

    res.status(200).cookie("access_token", token , {
      httpOnly : true,
    }).json(rest)
  }
  catch(err){
    if(err.message.includes("buffering")){
      next(errorHandler(400,"network interuption,please try again"))
    }else{
      next(errorHandler(400,"Network interuption,please try again"))
    }
    
  }
}
export const google = async (req,res,next)=>{
  const {email,name, googlePhotoUrl} = req.body;
  try{
    const user = await User.findOne({email});
    if(user){
      const token = jwt.sign({id:user._id,isAdmin : user,isAdmin},process.env.JWT_SECRET);
      const {password, ...rest} = user._doc;
      res.status(200).cookie('access_token',token,{
        httpOnly :true, 
      }).json(rest);
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
      //generate a random password, consisting of numbers 1 to 9 and letters A to Z, i.e.toString(36) but take the lask 8 characters
      const newUser = new User({
        username :name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password : hashedPassword,
        profilePicture: googlePhotoUrl
        //Denis Kochei => deniskochei675
        //toString(9) creates a random number only without including letters
      });
      await newUser.save();
      const token = jwt.sign({id: newUser._id, isAdmin : newUser.isAdmin},process.env.JWT_SECRET);
      const {password,...rest} = newUser._doc;
      res.status(200).cookie('access_token',token,{
        httpOnly:true,
        //httpOnly secures the cookie
      }).json(rest);
    }
  }
  catch(err){
    next(errorHandler(400,"Network interuption,please try again"))
  }
}