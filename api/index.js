import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
//you must add the '.js' at the end 

dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(()=>
    console.log('the database is connected')
)
.catch((err)=>{
  console.log(err);
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(5000,()=>{
  console.log("The Server is listening to port 5000")
})

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'internal server error'

  res.status(statusCode).json({
    success : false,
    statusCode,
    message,
  });
});