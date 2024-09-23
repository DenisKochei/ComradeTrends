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
    return console.log(err)
  }
  
}
export const likeComment =async (req,res,next)=>{
  try{
    const comment = await Comment.findById(req.params.commentId)
    const userIndex = comment.likes.indexOf(req.user.id);
    if(userIndex === -1){
      comment.likes.push(req.user.id);
      comment.numberOfLikes +=1;
    }else{
      comment.likes.splice(userIndex,1);
      comment.numberOfLikes -=1;
    }
    await comment.save();
    res.status(200).json(comment);
  }
  catch(err){
    next(err);
  }
}
export const editComment = async (req,res,next)=>{
  try{
  
    const comment = await Comment.findById(req.params.commentId);
    if(!comment){
      return next(errorHandler(404,"Comment not found"));
    }
    if(comment.userId !== req.user.id && !req.user.isAdmin){
      next(errorHandler(403,"You are not allowed to update this comment"))
    }
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content:req.body.content
      },
      {new:true}
    );
    res.status(200).json(editedComment)
    
  }
  catch(err){
    next(err)
  }
}