import { Button, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CallToAction } from "../components/CallToAction"
import { CommentSection } from "../components/CommentSection"
import { PostCard } from "../components/PostCard"
import {Helmet} from "react-helmet";
import {FacebookShareButton,TwitterShareButton,WhatsappShareButton} from 'react-share'
import { FaShare } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

export  function PostPage() {
  const {postslug} = useParams()
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)
  const [alsoRead,setAlsoRead] = useState()
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
    const fetchAlsoRead = async ()=>{
      const res = await fetch(`/api/post/getposts?limit=4&category=${(post.category === "most-trending" || "breaking") ? "trending" : post.category}`);
      const data =await res.json();
      if(res.ok){
        const allAlsoRead = data.posts;
        const alsoRead = allAlsoRead.filter((alsoReadPost)=>alsoReadPost.slug !== post.slug)
        setAlsoRead(alsoRead)
      }
    }
    fetchAlsoRead()
  },[post])
  const currentUrl = window.location.href;
 
  if(loading){
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size='xl' />
      </div>
    )
  }else{
    return(
      <div>
        <Helmet>
          <title>{`Comrade Trends | ${post.title}`}</title>
          <meta name="description" content={post.title}/>


          <meta property="og:url" content={currentUrl}/>
          <meta property="og:type" content="website"/>
          <meta property="og:title" content={post.title}/>
          <meta property="og:description" content={`Comrade Trends | ${post.title}`}/>
          <meta property="og:image" content={post.image}/>


          <meta name="twitter:card" content="summary_large_image"/>
          <meta property="twitter:domain" content="comradetrends.onrender.com"/>
          <meta property="twitter:url" content={currentUrl}/>
          <meta name="twitter:title" content="Comrade Trends"/>
          <meta name="twitter:description" content={`Comrade Trends | ${post.title}`}/>
          <meta name="twitter:image" content={post.image}/>

        </Helmet>
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
        <div className="m-4 max-w-4xl self-center gap-3 flex justify-center items-center">
          <div className="flex flex-col justify-start items-center">
            <FaShare/> 
            <p>Share:</p>
          </div>
          <div className="flex  gap-3">
          <FacebookShareButton url={currentPageURL} quote={post.title} hashtag='#ComradeTrends'>
            <CiFacebook fill='rgb(7,101,254,100)' className="text-3xl"/>
          </FacebookShareButton>
          <TwitterShareButton url={currentPageURL}>
            <FaXTwitter fill='rgb(0,0,0,100)' className="text-2xl"/>
          </TwitterShareButton>
          <WhatsappShareButton url={currentPageURL} separator="::" title={post.title}>
            <FaWhatsapp fill='rgb(36,196,96,100)' className="text-2xl"/>
          </WhatsappShareButton>
          </div>
        </div>
        
        <div className="w-full mx-auto max-w-4xl">
          <CallToAction />
        </div>
        <CommentSection postId={post._id}/>
        <div className="w-full mx-auto max-w-4xl"><CallToAction /></div>
        {alsoRead && 
        <div>
          <div className="flex flex-col justify-center items-center mb-5">
          <h1 className="text-xl mb-5">You might also like:</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-5 mt-5">
        {alsoRead &&
        alsoRead.map((post)=>(
          <PostCard post={post} key={post._id}/>
        ))
        }
      </div>
        </div>}
      </main>
      </div>
      
    )
  }

}
