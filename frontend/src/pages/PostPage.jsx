import { Button, Spinner } from "flowbite-react";
import NProgress from 'nprogress';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CallToAction } from "../components/CallToAction";
import { CallToAction1 } from "../components/CallToAction1";
import { CallToAction2 } from "../components/CallToAction2";
import { CommentSection } from "../components/CommentSection";
import { PostBar } from "../components/PostBar";
import { PostCard } from "../components/PostCard";
import { Helmet } from "react-helmet";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
} from "react-share";
import { IoTrendingUp } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaShare, FaLink } from "react-icons/fa6";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { PageIndicator } from "../components/PageIndicator";
import { useSelector } from "react-redux";

export function PostPage() {
  const { postslug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [alsoRead, setAlsoRead] = useState();
  const [auther, setAuther] = useState();
  const [post, setPost] = useState(null);
  const [recent, setRecent] = useState(null);
  const [autherId, setAutherId] = useState();
  const [copied, setCopied] = useState(false);
  const [currentPostID, setcurrentPostID] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const currentPageURL = window.location.href;

  const handleCopyLink = () => {
    const pageUrl = window.location.href;

    const textArea = document.createElement("textarea");
    textArea.value = pageUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        NProgress.start();
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
          setAutherId(data.posts[0].userId);
          setcurrentPostID(data.posts[0]._id)
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
        `/api/post/getposts?limit=4&category=${post.category === "most-trending" || post.category === "breaking"
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
      const res = await fetch("/api/post/getposts?limit=6");
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
    NProgress.start();
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  } else {
    NProgress.done();
    return (
      <div className="mt-2">
        <PageIndicator />
        <div className="lg:flex min-h-screen items-start">
          <Helmet>
            {/* Page Title */}
            <title>{post?.title ? `Comrade Trends | ${post.title}` : "Comrade Trends"}</title>

            {/* SEO Meta */}
            <meta name="description" content={post?.content1?.slice(0, 150) || "Stay informed with the latest news, stories, and trending topics from Comrade Trends."} />
            <meta name="keywords" content={`${post?.title}, ${post?.category}, Comrade Trends, news`} />
            <meta name="author" content={auther?.username || "Comrade Trends"} />

            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph (Facebook, WhatsApp) */}
            <meta property="og:type" content="article" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={post?.title || "Comrade Trends"} />
            <meta property="og:description" content={post?.content1?.slice(0, 150) || "Latest stories and trends from Comrade Trends"} />
            {post?.image && <meta property="og:image" content={post.image} />}
            {post?.image && <meta property="og:image:type" content="image/jpeg" />}
            {post?.image && <meta property="og:image:width" content="1200" />}
            {post?.image && <meta property="og:image:height" content="630" />}
            <meta property="og:site_name" content="Comrade Trends" />

            {/* Twitter Meta */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@comradetrends" />
            <meta name="twitter:creator" content="@comradetrends" />
            <meta name="twitter:title" content={post?.title || "Comrade Trends"} />
            <meta name="twitter:description" content={post?.content1?.slice(0, 150) || "Explore trends and breaking news from Comrade Trends."} />
            {post?.image && <meta name="twitter:image" content={post.image} />}

            {/* ✅ JSON-LD structured data at the end */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "headline": post?.title || "Comrade Trends",
                "image": [post?.image || "https://comradetrends.com/default-image.jpg"],
                "datePublished": post?.createdAt,
                "dateModified": post?.updatedAt || post?.createdAt,
                "author": {
                  "@type": "Person",
                  "name": auther?.username || "Comrade Trends",
                  "url": `https://comradetrends.com/user/${auther?.username || "author"}`
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Comrade Trends",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://firebasestorage.googleapis.com/v0/b/comrade-trends.appspot.com/o/ComradeTrendsLogo2.png?alt=media&token=4dabb883-ef77-4e0a-98fb-1a02b315ee3a"
                  }
                },
                "description": post?.content1?.slice(0, 150) || "Stay updated with news, trends, and opinions on Comrade Trends.",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": currentUrl
                }
              })}
            </script>

          </Helmet>


          <div className="hidden lg:sticky lg:py-4 lg:px-1 lg:justify-center lg:items-center lg:flex lg:flex-col lg:mb-10 lg:mx-1 md:top-20">
            <div>
              <FaShareFromSquare className="w-6 h-6" />
              <h1 className="">Share</h1>
            </div>
            <div className=" border w-16 dark:bg-slate-900 bg-slate-400 justify-between items-center border-gray-600 rounded-md py-5 gap-10 px-1 flex flex-col ">
              <div>
                <FacebookShareButton
                  url={currentPageURL}
                  quote={post.title}
                  hashtag={post.hashtag}
                  aria-label="Share via Facebook"
                >
                  <CiFacebook
                    fill="rgb(74,70,70)"
                    className="text-3xl hover:fill-slate-300"
                  />
                </FacebookShareButton>
              </div>
              <div>
                <TwitterShareButton url={currentPageURL} aria-label="share via X">
                  <FaXTwitter
                    fill="rgb(74,70,70)"
                    className="text-2xl hover:fill-slate-300"
                  />
                </TwitterShareButton>
              </div>
              <div>
                <a
                  aria-label="share via whatsapp"
                  href={`whatsapp://send?text=${encodeURIComponent(
                    currentPageURL
                  )}`}
                >
                  <FaWhatsapp
                    fill="rgb(74,70,70)"
                    className="text-2xl hover:fill-slate-300"
                  />
                </a>
              </div>
              <div>
                <TelegramShareButton title={post.title} aria-label="share via telegram" url={currentPageURL}>
                  <FaTelegramPlane
                    fill="rgb(74,70,70)"
                    className="text-2xl hover:fill-slate-300"
                  />
                </TelegramShareButton>
              </div>
              <div className="flex flex-col justify-center items-center">
                <FaLink
                  onClick={handleCopyLink}
                  fill="rgb(74,70,70)"
                  className="text-2xl hover:fill-slate-300 hover:cursor-pointer"
                />
                {copied && (
                  <span
                    className={`
          text-sm text-green-500 mt-1 transition-opacity duration-500
          ${copied ? "opacity-100" : "opacity-0"}
        `}
                  >
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
          <main className="min-h-screen lg:w-2/3 mb-5 flex flex-col mx-auto p-1 max-w-6xl">
            <h1 className="sm:text-3xl text-xl text-center mt-1 p-1  self-center font-serif max-w-4xl mx-auto lg:text-4xl">
              {post && post.title}
            </h1>
            <div
              className={`flex items-center ${post.hashtag && "justify-around"
                } ${!post.hashtag && "justify-start"}`}
            >
              {post && post.hashtag && (
                <div className="dark:text-slate-400">
                  {post && post.hashtag ? `#${post.hashtag}` : ""}
                </div>
              )}
              <Link
                to={`/search?category=${post.category}`}
                className=" mt-0 flex justify-start items-center gap-1"
              >
                <div
                  className={`w-3 h-3 ${post.category === "breaking"
                    ? "bg-red-400"
                    : post.category === "most-trending"
                      ? "bg-blue-400"
                      : "bg-green-400"
                    } rounded-full`}
                ></div>
                <span
                  className="focus:ring-0 p-0"
                  pill
                  color="gray"
                  size="xs"
                >
                  {post.category === "most-trending"
                    ? "Most Trending"
                    : post.category === "breaking"
                      ? "Breaking News"
                      : post.category}
                </span>
              </Link>
            </div>
            <div className="min-h-[200px]">
              <img
                src={post && post.image}
                alt={post.title}
                className="object-cover max-h-[300px] self-center mt-1 pt-1 p-1 sm:max-h-[500px] w-full !max-w-4xl"
              />
            </div>
            <div className="max-w-4xl self-center w-full">
              {auther ? (
                <div className="flex justify-start gap-1 my-0 dark:text-slate-400 text-xs items-center">
                  <p>Author: </p>
                  <img
                    alt={auther.username}
                    className="rounded-full mx-1 min-h-7 object-cover w-7 h-5"
                    src={auther.profilePicture}
                  />
                  <p className="text-xs dark:text-cyan-300 text-cyan-900 hover:underline">
                    @{auther.username}
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-4xl text-xs">
              <span>
                {post && new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="italic">
                {post &&
                  (
                    (post.content1.length + post.content2.length) /
                    1000
                  ).toFixed(0)}{" "}
                mins read
              </span>
            </div>
            <div
              className={`py-3 px-1 w-full text-wrap max-w-4xl ${currentUser.isAdmin ? "" : "select-none"} post-content mx-auto`}
              dangerouslySetInnerHTML={{ __html: post && post.content1 }}
            ></div>
            <div className="w-full mx-auto max-w-4xl">
              <CallToAction />
            </div>
            <div
              className={`py-3 px-1 w-full text-wrap max-w-4xl ${currentUser.isAdmin ? "" : "select-none"} post-content mx-auto`}
              dangerouslySetInnerHTML={{ __html: post && post.content2 }}
            ></div>
            <div className="w-full  block lg:hidden">
              <div className="m-4 max-w-4xl py-2 border borber-gray-600 dark:bg-slate-900 bg-slate-400 justify-around self-center gap-3 flex rounded-md items-center">
                <div className="flex flex-col justify-start items-center">
                  <FaShareFromSquare className="w-6 h-6" />
                  <p className="text-slate-900 dark:text-slate-300">Share:</p>
                </div>
                <div className="flex  gap-3">
                  <FacebookShareButton
                    url={currentPageURL}
                    quote={post.title}
                    hashtag={post.hashtag}
                    aria-label="share via facebook"
                  >
                    <CiFacebook
                      fill="rgb(74,70,70)"
                      className="text-3xl hover:fill-slate-300"
                    />
                  </FacebookShareButton>
                  <TwitterShareButton url={currentPageURL} aria-label="share via X">
                    <FaXTwitter
                      fill="rgb(74,70,70)"
                      className="text-2xl hover:fill-slate-300"
                    />
                  </TwitterShareButton>
                  <a
                    aria-label="share via whatsapp"
                    href={`whatsapp://send?text=${encodeURIComponent(
                      currentPageURL
                    )}`}
                  >
                    <FaWhatsapp
                      fill="rgb(74,70,70)"
                      className="text-2xl hover:fill-slate-300"
                    />
                  </a>
                  <TelegramShareButton title={post.title} aria-label="share via telegram" url={currentPageURL}>
                    <FaTelegramPlane
                      fill="rgb(74,70,70)"
                      className="text-2xl hover:fill-slate-300"
                    />
                  </TelegramShareButton>
                  <div className="flex justify-center items-center">
                    <FaLink
                      onClick={handleCopyLink}
                      fill="rgb(74,70,70)"
                      className="text-2xl hover:fill-slate-300 hover:cursor-pointer"
                    />
                    {copied && (
                      <span
                        className={`
          text-sm text-green-500  mt-1 transition-opacity duration-500
          ${copied ? "opacity-100" : "opacity-0"}
        `}
                      >
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mx-auto max-w-4xl">
              <CallToAction1 />
            </div>
            <CommentSection postId={post._id} />
            <div className="w-full mx-auto max-w-4xl">
              <CallToAction2 />
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
          <div
            className={`${recent && recent.length !== 0 && "lg:w-1/3 m-3 sticky top-10"
              }`}
          >
            {recent && recent.length > 0 && (
              <>
                <div className="flex flex-col gap-2">
                  <Link to={`/search`}>
                    <div className="flex justify-start gap-1 items-center">
                      <IoTrendingUp className="w-5 h-5 text-purple-600" />
                      <h1 className="text-lg">Latest</h1>
                      <div className="mt-1">
                        <FaAngleRight />
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-center flex-wrap gap-0">
                    {recent.filter((recentpost) => recentpost._id !== currentPostID).map((post) => (
                      <PostBar post={post} key={post._id} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
