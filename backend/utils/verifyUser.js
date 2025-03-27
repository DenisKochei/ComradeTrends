import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js'

export const verifyToken = (req,res,next)=>{
  const token = req.cookies.access_token;
  console.log(token)
  if(!token){
    return;
  }
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err){
      return;
    }
    req.user = user;
    next();
  })
}

//This is a middleware 