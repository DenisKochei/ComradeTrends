import express from 'express';

const router = express.Router();

router.get('/test',(req,res)=>{
  res.send('Hello world')
})

export default router;

//the word default is usefull when you want to give the function a new name when importing it in another file it sholud be the only function being exported