import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {CommentSec} from "./CommentSec";


export  function CommentSection({postId}) {
  const {currentUser} = useSelector(state=> state.user);
  const [comment,setComment] = useState('')
  const [disabled,setDisabled] = useState(true)
  const [comments,setComments] = useState([])
  const [commentError,setCommentError] = useState(null)
  const [totalComments,setTotalComments] = useState()
  const [showMore,setShowMore] = useState(true); 
  useEffect(()=>{
    if(comment.length > 0){
      setDisabled(false);
    }else{
      setDisabled(true);

    }
  },[comment])
  const handleSubmit = async(e)=>{
    try{
      e.preventDefault();
    if(comment.length > 500){
      return;
    }
    
    const res = await fetch('/api/comment/create',{
      method:"POST",
      headers:
      {'Content-Type' : 'application/json'},
      body : JSON.stringify({content: comment , userId:currentUser._id , postId})
    });
    const data = await res.json();
    if(res.ok){
      setTotalComments(totalComments + 1)
      setComment('');
      setCommentError(null);
      setComments([data,...comments])
    }
    if(!res.ok){
      setComment('');
      setCommentError(data.message);
    }
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(()=>{
    const fetchComments = async ()=>{
      try{
        const res = await fetch(`/api/comment/getComments?postId=${postId}`);
        if(res.ok){
          const data = await res.json();
          setComments(data.postComments)
          setTotalComments(data.totalComments)
          console.log(data)
          if(data.postComments.length < 3){
            setShowMore(false)
          }
        }
      }
      catch(err){
        console.log(err)
      }
    };
    fetchComments()
  },[postId])
  const handleShowMore = async ()=>{
    const startIndex = comments.length
    try{
      const res = await fetch(`/api/comment/getComments?postId=${postId}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setComments((prev)=> [...prev,...data.postComments]);
        if(data.postComments.length < 3){
          setShowMore(false);
        }
      }
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className="w-full mx-auto max-w-2xl p-3">
      {currentUser ? (
        <div className="flex justify-start gap-1 my-5 text-gray-500 text-xs items-center">
          <p>Signed in as:</p>
          <img className="rounded-full object-cover w-5 h-5" src={currentUser.profilePicture} />
          <Link className="text-xs text-cyan-500 hover:underline" to='/dashboard?tab=profile'>
            @{currentUser.username}
          </Link>
        </div>

      ) : (
        <div className="flex justify-start gap-1 my-5 text-gray-500 text-xs items-center">
          <p>You must Signin to comment</p>
          <div>
            <Link  className="text-xs text-cyan-500 hover:underline" to="/sign-in">
              Signin
            </Link>
          </div>
        </div>
        
      )}
      {currentUser &&
      <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
        <Textarea
          placeholder="Add a comment"
          maxLength='200'
          rows='3'
          onChange={(e)=> {
            setComment(e.target.value);
          }}
          value={comment}
        />
        <div className="flex justify-between items-center mt-5">
          <p className="text-xs text-gray-500">{500-comment.length} characters remaining</p>
          <Button disabled={disabled} type="submit" gradientDuoTone='purpleToBlue' outline>
            Submit
          </Button>
        </div>
        {commentError &&
         <Alert color='failure' className="mt-5">{commentError}</Alert>}
      </form>
      }
      {comments.length === 0 ?
      (
        <p className="text-xs my-5 text-gray-500">Np comments yet!</p>
      ) : (
        <>
          <div className="flex items-center my-5 gap-1 text-xs">
          <p>Comments:</p>
          <div className="border border-gray-400 py-1 px-2 rounded-sm">
            <p>{totalComments}</p>
          </div>
        </div>
        {comments.map((comment=>
          <CommentSec comment={comment} key={comment._id}/>
        ))}
        {showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center py-7'>Show More</button>
          )}
        </>
      )}
    </div>
  )
}
