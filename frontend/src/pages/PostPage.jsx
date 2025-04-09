import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CallToAction } from "../components/CallToAction";
import { CommentSection } from "../components/CommentSection";
import { PostBar } from "../components/PostBar";
import { PostCard } from "../components/PostCard";
import { Helmet } from "react-helmet";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaShare,FaLink } from "react-icons/fa6";
import { FaWhatsapp,FaTelegramPlane } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

export function PostPage() {
  const { postslug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [alsoRead, setAlsoRead] = useState();
  const [auther,setAuther] = useState();
  const [post, setPost] = useState(null);
  const [recent, setRecent] = useState(null);
  const [autherId,setAutherId] = useState();
  const [copied, setCopied] = useState(false);
  const currentPageURL = window.location.href;

  const handleCopyLink = () => {
    const pageUrl = window.location.href;

    const textArea = document.createElement('textarea');
    textArea.value = pageUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

  };
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
          setAutherId(data.posts[0].userId)
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

  
  useEffect(() => {
    const fetchAlsoRead = async () => {
      const res = await fetch(
        `/api/post/getposts?limit=4&category=${
          (post.category === "most-trending" || post.category === "breaking")
          ? "trending"
          : post.category
        }`
      );
      const data = await res.json();
      if (res.ok) {
        const allAlsoRead = data.posts;
        const alsoRead = allAlsoRead.filter(
          (alsoReadPost) => alsoReadPost.slug !== post.slug
        );
        setAlsoRead(alsoRead);
      }
    };
    fetchAlsoRead();
  }, [post]);
   useEffect(() => {
      const fetchRecent = async () => {
        const res = await fetch("/api/post/getposts?limit=4");
        const data = await res.json();
        setRecent(data.posts);
      };
      fetchRecent();
    }, []);
  
  useEffect(() => {
    const fetchAuther = async () => {
      const res = await fetch(`/api/user/${autherId}`);
      const data = await res.json();
      if (res.ok) {
        setAuther(data);
      }
    };
    fetchAuther();
  }, [autherId]);

  const currentUrl = window.location.href;
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  } else {
    return (
      <div className="lg:flex min-h-screen items-start">
        <Helmet>
          <title>{`Comrade Trends | ${post.title}`}</title>
          <meta name="description" content={post.title} />

          <meta property="og:url" content={currentUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={post.title} />
          <meta
            property="og:description"
            content={`Comrade Trends | ${post.title}`}
          />
          <meta property="og:image" content={post.image} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:domain"
            content="comradetrends.onrender.com"
          />
          <meta property="twitter:url" content={currentUrl} />
          <meta name="twitter:title" content="Comrade Trends" />
          <meta
            name="twitter:description"
            content={`Comrade Trends | ${post.title}`}
          />
          <meta name="twitter:image" content={post.image} />
        </Helmet>
        <div className="hidden lg:sticky lg:py-4 lg:px-1 lg:justify-center lg:items-center lg:flex lg:flex-col lg:my-10 lg:mx-1 md:top-20">
          <div>
          <FaShareFromSquare className="w-6 h-6"/>
          <h1 className="">Share</h1>
          </div>
         <div className=" border w-16 bg-slate-900 justify-between items-center border-gray-600 rounded-md py-5 gap-10 px-1 flex flex-col ">
         <div>
         <FacebookShareButton
            url={currentPageURL}
            quote={post.title}
            hashtag="#ComradeTrends"
          >
            <CiFacebook fill="rgb(74,70,70)" className="text-3xl hover:fill-slate-300" />
          </FacebookShareButton>
         </div>
          <div>
          <TwitterShareButton url={currentPageURL}>
            <FaXTwitter fill="rgb(74,70,70)" className="text-2xl hover:fill-slate-300" />
          </TwitterShareButton>
          </div>
         <div>
         <WhatsappShareButton
            url={currentPageURL}
            separator="::"
            title={post.title}
          >
            <FaWhatsapp fill="rgb(74,70,70)" className="text-2xl hover:fill-slate-300" />
          </WhatsappShareButton>
         </div>
         <div>
          <TelegramShareButton
            title={post.title}
            url={currentPageURL}
          >
            <FaTelegramPlane fill="rgb(74,70,70)" className="text-2xl hover:fill-slate-300" />
          </TelegramShareButton>
         </div>
         <div className="flex flex-col justify-center items-center">
          <FaLink onClick={handleCopyLink} fill="rgb(74,70,70)" className="text-2xl hover:fill-slate-300 hover:cursor-pointer"/>
          {copied && (
        <span className={`
          text-sm text-green-500 mt-1 transition-opacity duration-500
          ${copied ? 'opacity-100' : 'opacity-0'}
        `}>
          Copied!
        </span>
      )}
         </div>
         </div>
        </div>
        <main className="min-h-screen lg:w-2/3 m-5 flex flex-col mx-auto p-1 max-w-6xl">
          <h1 className="sm:text-3xl text-xl text-center mt-1 p-1  self-center font-serif max-w-4xl mx-auto lg:text-4xl">
            {post && post.title}
          </h1>
          <Link
            to={`/search?category=${post && post.category}`}
            className="self-center mt-2"
          >
            <Button className="focus:ring-0" pill color="gray" size="xs">
              {post && post.category}
            </Button>
          </Link>
          <div className="max-w-4xl self-center w-full">
            {auther ? 
            <div className="flex justify-start gap-1 my-0 text-gray-500 text-xs items-center">
            <p>Auther: </p>
            <img
              className="rounded-full mx-1 object-cover w-5 h-5"
              src={auther.profilePicture}
            />
            <p className="text-xs text-cyan-500 hover:underline">
              @{auther.username}
            </p>
            </div> 
            : 
            <div></div>}
          </div>
          <img
            src={post && post.image}
            alt={post.title}
            className="object-cover self-center mt-1 pt-1 p-1 max-h-[600px] w-full !max-w-4xl"
          />
          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-4xl text-xs">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">
              {post &&
                ((post.content1.length + post.content2.length) / 1000).toFixed(
                  0
                )}{" "}
              mins read
            </span>
          </div>
          <div
            className="p-3 w-full max-w-4xl select-none post-content mx-auto"
            dangerouslySetInnerHTML={{ __html: post && post.content1 }}
          ></div>
          <div className="w-full mx-auto max-w-4xl">
            <CallToAction />
          </div>
          <div
            className="p-3 w-full max-w-4xl select-none post-content mx-auto"
            dangerouslySetInnerHTML={{ __html: post && post.content2 }}
          ></div>
          <div className="w-full block lg:hidden">
          <div className="m-4 max-w-4xl self-center gap-3 flex justify-start items-center">
            <div className="flex flex-col justify-start items-center">
              <FaShareFromSquare fill="rgb(192, 193, 194)" className="w-6 h-6" />
              <p>Share:</p>
            </div>
            <div className="flex  gap-3">
              <FacebookShareButton
                url={currentPageURL}
                quote={post.title}
                hashtag="#ComradeTrends"
              >
                <CiFacebook fill="rgb(7,101,254,100)" className="text-3xl" />
              </FacebookShareButton>
              <TwitterShareButton url={currentPageURL}>
                <FaXTwitter fill="rgb(0,0,0,100)" className="text-2xl" />
              </TwitterShareButton>
              <WhatsappShareButton
                url={currentPageURL}
                separator="::"
                title={post.title}
              >
                <FaWhatsapp fill="rgb(36,196,96,100)" className="text-2xl" />
              </WhatsappShareButton>
              <TelegramShareButton
            title={post.title}
            url={currentPageURL}
          >
            <FaTelegramPlane fill="rgb(53, 92, 140)" className="text-2xl" />
          </TelegramShareButton>
          <div className="flex justify-center items-center">
          <FaLink onClick={handleCopyLink} fill="rgb(74,70,70)" className="text-2xl hover:fill-slate-300 hover:cursor-pointer"/>
          {copied && (
        <span className={`
          text-sm text-green-500  mt-1 transition-opacity duration-500
          ${copied ? 'opacity-100' : 'opacity-0'}
        `}>
          Copied!
        </span>
      )}
         </div>
            </div>
          </div>
          </div>
          <div className="w-full mx-auto max-w-4xl">
            <CallToAction />
          </div>
          <CommentSection postId={post._id} />
          <div className="w-full mx-auto max-w-4xl">
            <CallToAction />
          </div>
          {alsoRead && (
            <div>
              <div className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-xl m-1">You might also like:</h1>
              </div>
              <div className="flex flex-wrap justify-center gap-5 mt-5">
                {alsoRead &&
                  alsoRead.map((post) => (
                    <PostCard post={post} key={post._id} />
                  ))}
              </div>
            </div>
          )}

        </main>
        <div className={`${recent && (recent.length !== 0) && "lg:w-1/3 m-3 sticky top-0"}`}>
          {recent && recent.length > 0 && (
            <>
              <div className="flex flex-col gap-6">
                <h1 className=" text-2xl font-semibold text-center">
                  Latest
                </h1>
                <div className="flex justify-center flex-wrap gap-4">
                  {recent.map((post) => (
                    <PostBar post={post} key={post._id} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
