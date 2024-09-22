import Comment from '../models/comments.model.js'
import { errorHandler } from "../utils/error.js";

export const createComment = async (req,res,next)=>{
  try{
    const {postId,content,userId} = req.body;
    if(userId !== req.user.id){
      next(errorHandler(403,'You are not allowed to create this comment'))
    }

    const newComment = new Comment({
      content,
      postId,userId
    })
    await newComment.save();
    res.status(201).json(newComment)
  }
  catch(err){
    next(err)
  }
}
export const getComments = async (req,res,next)=>{
  try{
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const postComments = await Comment.find(
      req.body.postId
    )
    .sort({ createdAt: sortDirection })
    .skip(startIndex)
    .limit(limit);

    const totalComments = await Comment.countDocuments();
    res.status(200).json({postComments,totalComments});
  }
  catch(err){
    console.log(err)
  }
  
}