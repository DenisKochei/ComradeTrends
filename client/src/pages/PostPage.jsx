import { Button, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CallToAction } from "../components/CallToAction"
import { CommentSection } from "../components/CommentSection"
import { PostCard } from "../components/PostCard"
import {FacebookShareButton,TwitterShareButton,WhatsappShareButton} from 'react-share'
import { FaShare } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { CiTwitter,CiFacebook } from "react-icons/ci";

export  function PostPage() {
  const {postslug} = useParams()
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)
  const [recentPosts,setRecentPosts] = useState()
  const [post,setPost] = useState(null)
  const currentPageURL = window.location.href
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postslug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postslug]);

  useEffect(()=>{
    const fetchRecentPosts = async ()=>{
      const res = await fetch('/api/post/getposts?limit=3');
      const data =await res.json();
      if(res.ok){
        setRecentPosts(data.posts)
      }
    }
    fetchRecentPosts()
  },[])

  if(loading){
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size='xl' />
      </div>
    )
  }else{
    return(
      <main className="min-h-screen flex flex-col mx-auto p-3 max-w-6xl">
        <h1 className="sm:text-3xl text-xl text-center mt-3 p-3  self-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post && post.title }
        </h1>
        <Link to={`/search?category=${post && post.category}`} className="self-center mt-2">
          <Button className="focus:ring-0" pill color='gray' size='xs' >
            {post && post.category}
          </Button>
        </Link>
        <img src={post && post.image} alt={post.title} className="object-cover self-center mt-3 p-3 max-h-[600px] w-full !max-w-2xl"/>
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>
            {post && new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="italic">
            {post && ((post.content1.length + post.content2.length) / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div className="p-3 w-full max-w-2xl post-content mx-auto"
          dangerouslySetInnerHTML={{__html : post && post.content1}}>
        </div>
        <div className="w-full mx-auto max-w-4xl"><CallToAction /></div>
        <div className="p-3 w-full max-w-2xl post-content mx-auto"
          dangerouslySetInnerHTML={{__html : post && post.content2}}>
        </div>
        
        <div className="w-full mx-auto max-w-4xl">
          <CallToAction />
        </div>
        <div className="m-4 flex flex-col items-start">
          <div className="flex flex-col justify-start items-center">
            <FaShare/> 
            <p>Share:</p>
          </div>
          <div>
          <FacebookShareButton url={currentPageURL} quote={post.title} hashtag='#ComradeTrends'>
            <CiFacebook/>
          </FacebookShareButton>
          <TwitterShareButton url={currentPageURL}>
            <CiTwitter/>
          </TwitterShareButton>
          <WhatsappShareButton url={currentPageURL} separator="::" title={post.title}>
            <FaWhatsapp/>
          </WhatsappShareButton>
          </div>
        </div>
        <CommentSection postId={post._id}/>
        <div className="w-full mx-auto max-w-4xl"><CallToAction /></div>
        <div className="flex flex-col justify-center items-center mb-5">
          <h1 className="text-xl mb-5">Recent Posts</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-5 mt-5">
          {recentPosts &&
          recentPosts.map((post)=>(
            <PostCard post={post} key={post._id}/>
          ))
          }
        </div>
      </main>
    )
  }

}
