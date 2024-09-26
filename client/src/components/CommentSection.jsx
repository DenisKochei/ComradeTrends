import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link,useNavigate } from "react-router-dom"
import {CommentSec} from "./CommentSec";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export  function CommentSection({postId}) {
  const navigate = useNavigate();
  const {currentUser} = useSelector(state=> state.user);
  const [comment,setComment] = useState('')
  const [disabled,setDisabled] = useState(true)
  const [showModal,setShowModal] = useState(false)
  const [commentToDelete,setCommentToDelete] = useState(false)
  const [comments,setComments] = useState([])
  const [commentError,setCommentError] = useState(null)
  const [totalComments,setTotalComments] = useState()
  const [showMore,setShowMore] = useState(true);
  console.log(showMore)
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
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments?postId=${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments);
          setTotalComments(data.totalComments);
          if(data.totalComments < 3){
            setShowMore(false);
          }
          else{
            setShowMore(true);
  
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
  const handleShowMore = async ()=>{
    const startIndex = comments.length
    try{
      const res = await fetch(`/api/comment/getPostComments?postId=${postId}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setComments((prev)=> [...prev,...data.comments]);
       
        if(data.totalComments < 3){
          setShowMore(false);
        }
        else{
          setShowMore(true);

        }
      }
    }
    catch(err){
      console.log(err)
    }
  }
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEdit = async(comment,editedComment)=>{
    setComments(
      comments.map((c)=>
        c._id === comment._id ? {...c,content:editedComment} : c 
      )
    );
  };
  const handleDeleteComment = async(commentId)=>{
    if (!currentUser) {
      navigate('/sign-in');
      return;
    }
    const res = await fetch(`/api/comment/deleteComment/${commentId}`,{
      method:"DELETE"
    });
    if(res.ok){
      setShowModal(false);
      const data = await res.json();
     setComments(comments.filter((comment)=> comment._id !== commentId))
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

      ) : (         <div className="flex justify-start gap-1 my-5 text-gray-500 text-xs items-center">
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
          <Button className="focus:ring-0" disabled={disabled} type="submit" gradientDuoTone='purpleToBlue' outline>
            Submit
          </Button>
        </div>
        {commentError &&
         <Alert color='failure' className="mt-5">{commentError}</Alert>}
      </form>
      }
      {comments.length === 0 ?
      (
        <p className="text-xs my-5 text-gray-500">No comments yet!</p>
      ) : (
        <>
          <div className="flex items-center my-5 gap-1 text-xs">
          <p>Comments:</p>
          <div className="border border-gray-400 py-1 px-2 rounded-sm">
            <p>{totalComments}</p>
          </div>
        </div>
        {comments.map((comment=>
          <CommentSec onLike={handleLike} comment={comment} key={comment._id} onEdit={handleEdit} onDelete={(commentId)=>{
            setShowModal(true);
            setCommentToDelete(commentId)
          }}/>
        ))}
        {showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center py-7'>Show More</button>
          )}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this Comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button className="focus:ring-0" color='failure' onClick={()=>handleDeleteComment(commentToDelete)}>
                Yes, I'm sure
              </Button>
              <Button className="focus:ring-0" color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
