import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
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

app.listen(5000,()=>{
  console.log("The port is listening to port 5000")
})

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);