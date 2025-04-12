import React, { useEffect, useState,useRef } from "react";
import { Link } from "react-router-dom";
import { PostBar } from "../components/PostBar.jsx";
import { HomePostCard } from "../components/HomePostCard.jsx";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../components/PostCard.jsx";
import { Spinner,Button } from "flowbite-react";
import { Helmet } from "react-helmet";
import { FaAngleRight, FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { IoTrendingUp } from "react-icons/io5";
import moment from "moment";
import { PostCard2 } from "../components/PostCard2.jsx";


export function Home() {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [breaking, setBreaking] = useState([]);
  const [mostTrending, setMostTrending] = useState([]);
  const [recent, setRecent] = useState([]);
  const [sports, setSports] = useState([]);
  const [politics, setPolitics] = useState([]);
  const [international, setInternational] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [business, setBusiness] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [education, setEducation] = useState([]);
   const [hashtags,setHashTags] = useState(null)
  const [loadedSections, setLoadedSections] = useState({
    entertainment: false,
    business: false,
    recent: false,
  });

  const recentRef = useRef(null);
  const entertainmentRef = useRef(null);
  const businessRef = useRef(null);
  const loadPosts = async (category, setter, key) => {
    if (loadedSections[key]) return;

    try {
      const res = await fetch(
        category ? `/api/post/getposts?category=${category}&limit=5` : `/api/post/getposts?limit=5`
      );
      const data = await res.json();
      setter(data.posts);
      setLoadedSections((prev) => ({ ...prev, [key]: true }));
    } catch (error) {
      console.error(`Error fetching ${key} posts:`, error);
    }
  };
console.log(international)
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === entertainmentRef.current) {
            loadPosts("entertainment", setEntertainment, "entertainment");
          }
          if (entry.target === businessRef.current) {
            loadPosts("business", setBusiness, "business");
          }
          if (entry.target === recentRef.current) {
            loadPosts("", setRecent, "recent");
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.2 });

    if (entertainmentRef.current) observer.observe(entertainmentRef.current);
    if (businessRef.current) observer.observe(businessRef.current);
    if (recentRef.current) observer.observe(recentRef.current);

    return () => {
      if (entertainmentRef.current) observer.unobserve(entertainmentRef.current);
      if (businessRef.current) observer.unobserve(businessRef.current);
      if (recentRef.current) observer.unobserve(recentRef.current);
    };
  }, [loadedSections]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=6&category=politics");
      const data = await res.json();
      setPolitics(data.posts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=9");
      const data = await res.json();
      setHashTags(data.allHashtags);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        "/api/post/getposts?limit=5&category=international"
      );
      const data = await res.json();
      setInternational(data.posts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        "/api/post/getposts?limit=5&category=education"
      );
      const data = await res.json();
      setEducation(data.posts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?category=trending&limit=4");
      const data = await res.json();
      setTrending(data.posts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?category=technology&limit=4");
      const data = await res.json();
      setTechnology(data.posts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?category=breaking&limit=4");
      const data = await res.json();
      setBreaking(data.posts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        "/api/post/getposts?category=most-trending&limit=1"
      );
      const data = await res.json();
      setMostTrending(data.posts);
    };
    fetchPosts();
  }, []);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=4&category=sports");
      const data = await res.json();
      setSports(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex  flex-col my-5 mx-2 lg:mx-10 min-h-screen">
      <Helmet>
        <title>{`ComradeTrends | Home Page`}</title>
        <meta
          name="description"
          content="We're your trusted source for the latest news, insightful analysis, and trending stories from around the world."
        />
        <meta
          name="keywords"
          content="trusted source for the latest news, insightful analysis, and trending stories in Kenya and from around the world."
        />
      </Helmet>
      <div className=" overflow-x-scroll overflow-y-hidden border p-1 flex w-full border-slate-600 border-x-0 dark:text-slate-500 scrollbar-thin text-nowrap scrollbar-thumb-transparent gap-2 scrollbar-track-transparent justify-between  items-center ">
        <div className="flex justify-center md:-mb-2 items-center">
        <IoTrendingUp className="w-5 h-5 text-purple-600"/>
        <Link
          to={`/search?category=trending`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Trending
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=business`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Business
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=technology`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Technology
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=sports`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Sports
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=politics`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Politics
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=people`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            People
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=market`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Market
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=health`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Health
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=general`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            General
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=entertainment`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Entertainment
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=education`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Education
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=climate`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Climate
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=business`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Business
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        <Link
          to={`/search?category=agriculture`}
          className="self-center text-nowrap"
        >
          <Button className="focus:ring-0"  color="transparent" size="xs">
            Agriculture
          </Button>
        </Link><span className="dark:text-slate-700">|</span>
        </div>
        <div className="flex gap-5 ml-10 md:-mb-2 justify-center items-center">
        <span className="flex items-center gap-1">
            <a href="tel:+254759117496">
            <FaPhoneAlt className="dark:text-slate-300 text-sm" />
            </a>
          </span>
          <span className="flex items-center gap-1">
            <a href="https://wa.me/+254753868958?text=Hello!">
            <IoLogoWhatsapp className="dark:text-slate-300 text-sm" />
            </a>
          </span>
          <span className="flex items-center gap-1">
            <a href="mailto:comradetrends.info@gmail.com">
            <IoMdMail className="dark:text-slate-300 text-sm" />
            </a>
          </span>
        </div>
                
      </div>
      <div id="parent" className="flex flex-col md:flex-row gap-2">
        <div className="md:w-1/2 text-center">
          {breaking && breaking.length > 0 ? (
            <div
              onClick={() => navigate(`/post/${breaking[0].slug}`)}
              className="!sm:w-1/2 h-auto hover:cursor-pointer w-full flex"
            >
              <HomePostCard key={breaking[0]._id} post={breaking[0]} />
            </div>
          ) : (
            <div></div>
          )}
          {mostTrending && mostTrending.length > 0 && breaking.length === 0 ? (
            <div
              onClick={() => navigate(`/post/${mostTrending[0].slug}`)}
              className="!sm:w-1/2 h-auto hover:cursor-pointer w-full flex"
            >
              <HomePostCard key={mostTrending[0]._id} post={mostTrending[0]} />
            </div>
          ) : (
            <div></div>
          )}
          {recent && recent.length > 0 && mostTrending.length == 0 ? (
            <div
              onClick={() => navigate(`/post/${recent[0].slug}`)}
              className="!sm:w-1/2 h-auto hover:cursor-pointer w-full flex"
            >
              <HomePostCard key={recent[0]._id} post={recent[0]} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {(recent.length === 0 &&
        mostTrending.length === 0 &&
        breaking.length === 0) ? (
          <div className="min-h-screen">
            <div className="flex flex-col gap-3 items-center justify-center py-8 md:py-20 px-3 max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold md:text-nowrap lg:text-6xl">
                Welcome to Comrade Trends!
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm">
                At Comrade Trends, we're your trusted source for the latest
                news, insightful analysis, and trending stories from around the
                world.
              </p>
              <Spinner className="self-center m-10" />
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="flex md:flex-row md:w-1/2 gap-2 flex-col">
          <div className="md:w-1/2 w-full">
            {(trending && trending.length > 0) ? (
              <>
                <div className="flex flex-col gap-6">
                  <h1 className=" text-2xl font-semibold text-center">
                    Trending News
                  </h1>
                  <div className="flex justify-center flex-wrap gap-0">
                    {trending.map((post) => (
                      <PostBar post={post} key={post._id} />
                    ))}
                  </div>
                </div>
              </>
            ) : 
              <div>
                <>
                {business && business.length &&
                <div className="flex flex-col gap-6">
                <h1 className=" text-2xl font-semibold text-center">
                  Business News
                </h1>
                <div className="flex justify-center flex-wrap gap-0">
                  {business.map((post) => (
                    <PostBar post={post} key={post._id} />
                  ))}
                </div>
              </div>}
              </>
              </div>
              }
          </div>
          {sports && sports.length > 0 ? (
                <div className="flex flex-col md:w-1/2 w-full gap-6">
                  <h1 className=" text-2xl font-semibold text-center">
                    Sports News
                  </h1>
                  <div className="flex justify-center flex-wrap gap-0">
                    {sports.map((post) => (
                      <PostBar post={post} key={post._id} />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {technology && technology.length &&
                  <>
                  <div className="flex flex-col gap-6">
                    <h1 className=" text-2xl font-semibold text-center">
                      Tech News
                    </h1>
                    <div className="flex justify-center flex-wrap gap-0">
                      {technology.map((post) => (
                        <PostBar post={post} key={post._id} />
                      ))}
                    </div>
                  </div>
                </>}
                </div>
              )}
        </div>
      </div>
      <div className="mx-a">
      <div className="flex flex-col my-5 mx-2 lg:mx-10 min-h-screen">
      
      
        {education.length > 0 ? (
          <div>
          <Link to={`/search?category=education`}>
          <div className="flex justify-start my-2 gap-1 items-center"><IoTrendingUp className="w-5 h-5 text-purple-600" /><h1 className="text-lg">Education</h1><div className="mt-1"><FaAngleRight/></div></div>
          </Link>
        <div className="flex flex-col  justify-center items-center">
          <div className=" overflow-x-scroll overflow-y-hidden p-1 flex w-full scrollbar-thin 2xl:justify-center scrollbar-thumb-transparent gap-2 scrollbar-track-transparent justify-between  items-center ">
              <div className="flex w-full sm:w-auto flex-col gap-2 justify-around sm:flex-row items-center"> 
 
              {education.map((post) => <PostCard key={post._id} post={post} />)}
            </div>
          </div>
        <Link to="/search?category=education" className="text-teal-500 hover:underline">
          More Education News
        </Link>
        </div>
          </div>
        ) : (
          <div></div>
        )}
            
        {international && (international.length !==0) &&
          <div>
          <Link to={`/search?category=international`}>
          <div className="flex justify-start my-2 gap-1 items-center"><IoTrendingUp className="w-5 h-5 text-purple-600" /><h1 className="text-lg">International</h1><div className="mt-1"><FaAngleRight/></div></div>
          </Link>
        <div className="w-full sm:flex">
          <div className="sm:!w-3/12 w-full flex flex-col bg-emerald-700 p-3 gap-10">
            <h1 className="text-2xl my-5 font-light font-serif">
            Discover the future today, right here !
            </h1>
            <p>
            Comrade Trends is your go-to source for timely, reliable, and engaging news. From breaking stories and in-depth analysis to entertainment, politics, campus updates, and tech trends, we keep you informed 24/7. Whether you're a student or a professional, Comrade Trends delivers news that matters to you, all in one place. Stay ahead with real-time updates and fresh perspectives from a platform built for the modern, connected reader.
            </p>
            <Link to={"/contacts"}>
            <button
                className="focus:ring-0 w-1/2 rounded-md p-0 border mb-4 border-gray-400 transition duration-300 ease-in-out"
              >       
                Contact us         
              </button>
            </Link>
          </div>
          <div className="sm:mx-3 w-full sm:!w-9/12">
            <div onClick={() => navigate(`/post/${international[0].slug}`)} className="sm:flex cursor-pointer">
                <div className="w-full mt-2 sm:mt-0 sm:w-2/3 ">
                  <img className="w-fit h-72 sm:h-60 mx-auto object-cover" src={international[0].image} />
                </div>
                <div className="gap-3 sm:flex flex-col mx-2 w-full sm:w-1/3">
                  <h1 className="text-2xl line-clamp-3">{international[0].title}</h1>
                  <div 
                    className="sm:line-clamp-6 line-clamp-2 mb-3 sm:mb-0 text-l"
                    dangerouslySetInnerHTML={{ __html: international[0].content1 }}
                  ></div>
                  <span className=" text-slate-500 text-xs">
                    {moment(international[0].createdAt).fromNow()}
                  </span>
                </div>
            </div>
            <div className="w-full overflow-x-scroll scrollbar-thin scrollbar-thumb-transparent  scrollbar-track-transparent overflow-y-hidden gap-2 mt-2 grid grid-flow-row sm:grid-flow-col grid-row-1">
                {international.slice(1).map((post)=>(
                  <PostCard2 post={post} key={post._id}/>
                ))}
              </div>
          </div>
        </div>
          </div>
        }
      

      <div ref={entertainmentRef} className={`flex w-full flex-col gap-3 min-h-[200px] text-center ${(entertainment.length === 0) && "!min-h-override"}`}>
        {entertainment.length > 0 ? (
        <div>
          <Link to={`/search?category=entertainment`}>
          <div className="flex justify-start my-2 gap-1 items-center"><IoTrendingUp className="w-5 h-5 text-purple-600" /><h1 className="text-lg">Entertainment</h1><div className="mt-1"><FaAngleRight/></div></div>
          </Link>
          <div className=" overflow-x-scroll overflow-y-hidden p-1 flex w-full scrollbar-thin 2xl:justify-center scrollbar-thumb-transparent gap-2 scrollbar-track-transparent justify-between  items-center ">
          <div className="flex w-full sm:w-auto flex-col gap-2 justify-around sm:flex-row items-center"> 
            {entertainment.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
          </div>
        <Link to="/search?category=entertainment" className="text-teal-500 hover:underline">
          More Entertainment News
        </Link>
        </div>
        ) : (
          <div></div>
        )}
      </div>
        {politics.length &&
        <div>
          <Link to={`/search?category=politics`}>
          <div className="flex justify-start gap-1 items-center"><IoTrendingUp className="w-5 h-5 text-purple-600" /><h1 className="text-lg">Politics</h1><div className="mt-1"><FaAngleRight/></div></div>
          </Link>
          <div className="w-full flex flex-col sm:flex-row gap-3 justify-start items-start">
              <div onClick={() => navigate(`/post/${politics[0].slug}`)} className="sm:w-5/12 cursor-pointer w-full">
                <h1 className="text-4xl font-light line-clamp-3 font-serif">{politics[0].title}</h1>
              <div className="flex justify-start items-center text-slate-600 text-xs space-x-1">
              <span className="italic">{politics[0].category}</span>
              {politics[0].subcategory && (
                <>
                  <span className="text-slate-300">/</span>
                  <span>{politics[0].subcategory}</span>
                </>
              )}
            </div>
            <div className=" object-cover my-2 overflow-hidden">
              <img className="w-full h-72 sm:h-86 object-cover" src={politics[0].image} />
            </div>
            <div
              className="line-clamp-4 mb-3 sm:mb-0 text-l"
              dangerouslySetInnerHTML={{ __html: politics[0].content1 }}
            ></div>
              </div>
              <div className="flex w-full sm:w-3/12 flex-col">
              <div className="cursor-pointer" onClick={() => navigate(`/post/${politics[1].slug}`)}>
                <img className="w-full h-60 sm:h-70 object-cover" src={politics[1].image} />
              <div className=" text-wrap line-clamp-4 text-2xl flex justify-start font-serif">
                {politics[1].title}
              </div>
              </div>
                <span className=" mt-4 text-slate-500 text-xs">
                  {moment(politics[1].createdAt).fromNow()}
                </span>
              </div>
              <div className="w-full sm:w-4/12">
                {politics.slice(2).map((post)=>(
                  <PostBar post={post} key={post._id} />
                ))}
              </div>
          </div>
        </div>}

      {hashtags && 
        <div className="flex justify-center items-center gap-3">
        <span className="text-4xl text-orange-500">#</span>
        <div className="flex flex-nowrap overflow-x-scroll scrollbar-thin text-nowrap scrollbar-thumb-transparent scrollbar-track-transparent overflow-y-hidden gap-2 items-center justify-start ">
          {hashtags.map((post)=>(
              <Link
              to={`/search?hashtag=${post}&searchTerm=${post}`}
              className="self-center mt-2"
            >
              <Button
                className="focus:ring-0  rounded-full p-0 border border-gray-400 hover:border-blue-500 transition duration-300 ease-in-out"
                pill
                color="gray"
                size="xs"
              >       
                #{post}         
              </Button>
            </Link>
          ))}
        </div>
        </div>
      }
      <div ref={businessRef} className={`flex flex-col min-h-[200px] gap-0 text-center ${ (business.length === 0)  && "!min-h-override"}`}>
        {business.length > 0 ? (
        <div>
          <h1 className="text-2xl font-semibold">Business</h1>
          <div className=" overflow-x-scroll overflow-y-hidden p-1 flex w-full scrollbar-thin 2xl:justify-center scrollbar-thumb-transparent gap-2 scrollbar-track-transparent justify-between  items-center ">
                    <div className="flex w-full sm:w-auto flex-col gap-2 justify-around sm:flex-row items-center"> 
  
            {business.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
          </div>
        <Link to="/search?category=business" className="text-teal-500 hover:underline">
          More Business News
        </Link>
        </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
      </div> 
      <div className=" mb-5 text-xl text-center hover:underline text-teal-500">
        <Link to="/search ">View All Posts</Link>
      </div>
    </div>
  );
}
