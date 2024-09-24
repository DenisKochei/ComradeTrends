import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import path from 'path'
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
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(5000,()=>{
  console.log("The Server is listening to port 5000")
})

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'client','dist','index.html'));
})

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'internal server error'

  res.status(statusCode).json({
    success : false,
    statusCode,
    message,
  });
});