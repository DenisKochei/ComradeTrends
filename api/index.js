import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
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

app.listen(5000,()=>{
  console.log("The port is listening to port 3000")
})

app.use('/api/user', userRoute)