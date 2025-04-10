import React, { useEffect, useState,useRef } from "react";
import { Link } from "react-router-dom";
import { PostBar } from "../components/PostBar.jsx";
import { HomePostCard } from "../components/HomePostCard.jsx";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../components/PostCard.jsx";
import { Spinner,Button } from "flowbite-react";
import { Helmet } from "react-helmet";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMdMail } from "react-icons/io";

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
  const [health, setHealth] = useState([]);
  const [climate, setClimate] = useState([]);
  const [general, setGeneral] = useState([]);
  const [education, setEducation] = useState([]);
   const [hashtags,setHashTags] = useState(null)
  const [loadedSections, setLoadedSections] = useState({
    //politics: false,
    //international: false,
    entertainment: false,
    business: false,
    technology: false,
    health: false,
    education: false,
    climate: false,
    general:false,
    recent: false,
  });
  // Refs to observe sections
  //const politicsRef = useRef(null);
  //const internationalRef = useRef(null);
  const recentRef = useRef(null);
  const entertainmentRef = useRef(null);
  const businessRef = useRef(null);
  const technologyRef = useRef(null);
  const healthRef = useRef(null);
  const climateRef = useRef(null);
  const generalRef = useRef(null);
  const educationRef = useRef(null);

  // Function to fetch data
  const loadPosts = async (category, setter, key) => {
    if (loadedSections[key]) return; // Prevent duplicate calls

    try {
      const res = await fetch(
        category ? `/api/post/getposts?category=${category}&limit=4` : `/api/post/getposts?limit=4`
      );
      const data = await res.json();
      setter(data.posts);
      setLoadedSections((prev) => ({ ...prev, [key]: true })); // Mark section as loaded
    } catch (error) {
      console.error(`Error fetching ${key} posts:`, error);
    }
  };

  // IntersectionObserver to watch for scrolling
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /*if (entry.target === politicsRef.current) {
            loadPosts("politics", setPolitics, "politics");
          }
          if (entry.target === internationalRef.current) {
            loadPosts("international", setInternational, "international");
          }*/
          if (entry.target === entertainmentRef.current) {
            loadPosts("entertainment", setEntertainment, "entertainment");
          }
          if (entry.target === businessRef.current) {
            loadPosts("business", setBusiness, "business");
          }
          if (entry.target === technologyRef.current) {
            loadPosts("technology", setTechnology, "technology");
          }
          if (entry.target === healthRef.current) {
            loadPosts("health", setHealth, "health");
          }
          if (entry.target === climateRef.current) {
            loadPosts("climate", setClimate, "climate");
          }
          if (entry.target === generalRef.current) {
            loadPosts("general", setGeneral, "general");
          }
          if (entry.target === educationRef.current) {
            loadPosts("education", setEducation, "education");
          }
          if (entry.target === recentRef.current) {
            loadPosts("", setRecent, "recent"); // Empty category fetches recent posts
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.2 });

    //if (politicsRef.current) observer.observe(politicsRef.current);
    //if (internationalRef.current) observer.observe(internationalRef.current);
    if (entertainmentRef.current) observer.observe(entertainmentRef.current);
    if (businessRef.current) observer.observe(businessRef.current);
    if (technologyRef.current) observer.observe(technologyRef.current);
    if (healthRef.current) observer.observe(healthRef.current);
    if (climateRef.current) observer.observe(climateRef.current);
    if (generalRef.current) observer.observe(generalRef.current);
    if (recentRef.current) observer.observe(recentRef.current);
    if (educationRef.current) observer.observe(educationRef.current);

    return () => {
      /*if (politicsRef.current) observer.unobserve(politicsRef.current);
      if (internationalRef.current) observer.unobserve(internationalRef.current);*/
      if (entertainmentRef.current) observer.unobserve(entertainmentRef.current);
      if (businessRef.current) observer.unobserve(businessRef.current);
      if (technologyRef.current) observer.unobserve(technologyRef.current);
      if (healthRef.current) observer.unobserve(healthRef.current);
      if (climateRef.current) observer.unobserve(climateRef.current);
      if (generalRef.current) observer.unobserve(generalRef.current);
      if (educationRef.current) observer.unobserve(educationRef.current);
      if (recentRef.current) observer.unobserve(recentRef.current);
    };
  }, [loadedSections]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=4&category=politics");
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
        "/api/post/getposts?limit=4&category=international"
      );
      const data = await res.json();
      setInternational(data.posts);
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
  /*useEffect(()=>{
    const fetchHashTags = async ()=>{
      const res = await fetch("/api/post/getposts?limit=9&hashtag=")
      const data = await res.json();
      setHashTags(data.posts);
    }
    fetchHashTags();
  })*/


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
        <span className="dark:text-slate-700">|</span>
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
                  <div className="flex justify-center flex-wrap gap-4">
                    {trending.map((post) => (
                      <PostBar post={post} key={post._id} />
                    ))}
                  </div>
                </div>
              </>
            ) : 
              <div>
                <>
                <div className="flex flex-col gap-6">
                  <h1 className=" text-2xl font-semibold text-center">
                    Business News
                  </h1>
                  <div className="flex justify-center flex-wrap gap-4">
                    {business.map((post) => (
                      <PostBar post={post} key={post._id} />
                    ))}
                  </div>
                </div>
              </>
              </div>
              }
          </div>
          {sports && sports.length > 0 ? (
                <div className="flex flex-col md:w-1/2 w-full gap-6">
                  <h1 className=" text-2xl font-semibold text-center">
                    Sports News
                  </h1>
                  <div className="flex justify-center flex-wrap gap-4">
                    {sports.map((post) => (
                      <PostBar post={post} key={post._id} />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <>
                <div className="flex flex-col gap-6">
                  <h1 className=" text-2xl font-semibold text-center">
                    Tech News
                  </h1>
                  <div className="flex justify-center flex-wrap gap-4">
                    {technology.map((post) => (
                      <PostBar post={post} key={post._id} />
                    ))}
                  </div>
                </div>
              </>
                </div>
              )}
        </div>
      </div>
    <div className="flex flex-col my-5 mx-2 lg:mx-10 min-h-screen">
      
      {/* Politics Section */}
      
        {politics.length > 0 ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold">Politics</h1>
          <div className="flex justify-center flex-wrap gap-1">
            {politics.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        <Link to="/search?category=politics" className="text-teal-500 hover:underline">
          More Politics News
        </Link>
        </div>
        ) : (
          <div></div>
        )}
      

      {/* International Section */}
      
        {international.length > 0 ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold">International News</h1>
          <div className="flex justify-center flex-wrap gap-1">
            {international.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        <Link to="/search?category=international" className="text-teal-500 hover:underline">
          More International News
        </Link>
        </div>
        ) : (
          <div></div>
        )}
      

      {/* Entertainment Section */}
      <div ref={entertainmentRef} className={`flex flex-col gap-3 min-h-[200px] text-center ${(entertainment.length === 0) && "!min-h-override"}`}>
        {entertainment.length > 0 ? (
        <div>
          <h1 className="text-2xl font-semibold">Entertainment</h1>
          <div className="flex justify-center flex-wrap gap-1">
            {entertainment.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        <Link to="/search?category=entertainment" className="text-teal-500 hover:underline">
          More Entertainment News
        </Link>
        </div>
        ) : (
          <div></div>
        )}
      </div>
      {/* Entertainment Section */}
      <div ref={technologyRef} className={`flex flex-col min-h-[200px]  gap-3 text-center ${ (technology.length === 0) && "!min-h-override"}`}>
        {technology.length > 0 ? (
        <div>
          <h1 className="text-2xl font-semibold">Technology</h1>
          <div className="flex justify-center flex-wrap gap-1">
            {technology.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        <Link to="/search?category=technology" className="text-teal-500 hover:underline">
          More Technology News
        </Link>
        </div>
        ) : (
          <div></div>
        )}
      </div>
      {/* Entertainment Section */}
      <div ref={educationRef} className={`flex flex-col min-h-[200px] gap-3 text-center ${ (education.length === 0) && "!min-h-override"}`}>
        {education.length > 0 ? (
        <div>
          <h1 className="text-2xl font-semibold">Education</h1>
          <div className="flex justify-center flex-wrap gap-1">
            {education.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        <Link to="/search?category=education" className="text-teal-500 hover:underline">
          More Education News
        </Link>
        </div>
        ) : (
          <div></div>
        )}
      </div>
      {/* Entertainment Section */}
      <div ref={climateRef} className={`flex flex-col min-h-[200px] gap-3 text-center ${ (climate.length === 0) && "!min-h-override"}`}>
        {climate.length > 0 ? (
      <div>
          <h1 className="text-2xl font-semibold">Climate</h1>
          <div className="flex justify-center flex-wrap gap-1">
            {climate.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        <Link to="/search?category=climate" className="text-teal-500 hover:underline">
          More Climate News
        </Link>
      </div>
        ) : (
          <div></div>
        )}
      </div>
      {/* Entertainment Section */}
      <div ref={healthRef} className={`flex flex-col min-h-[200px] gap-3 text-center ${ (health.length === 0) && "!min-h-override"}`}>
        {health.length > 0 ? (
        <div>
          <h1 className="text-2xl font-semibold">Health</h1>
          <div className="flex justify-center flex-wrap gap-1">
            {health.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        <Link to="/search?category=health" className="text-teal-500 hover:underline">
          More Health News
        </Link>
        </div>
        ) : (
          <div></div>
        )}
      </div>
      {/* Entertainment Section */}
      <div ref={generalRef} className={`flex flex-col min-h-[200px] gap-0 text-center ${ (general.length === 0) && "!min-h-override"}`}>
        {general.length > 0 ? (
       <div>
         <h1 className="text-2xl font-semibold">General News</h1>
          <div className="flex justify-center flex-wrap gap-1">
            {general.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        <Link to="/search?category=general" className="text-teal-500 hover:underline">
          More General News
        </Link>
       </div>
        ) : (
          <div></div>
        )}
      </div>
      {/* Entertainment Section */}
      <div ref={businessRef} className={`flex flex-col min-h-[200px] gap-0 text-center ${ (business.length === 0)  && "!min-h-override"}`}>
        {business.length > 0 ? (
        <div>
          <h1 className="text-2xl font-semibold">Business</h1>
          <div className="flex justify-center flex-wrap gap-1">
            {business.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        <Link to="/search?category=business" className="text-teal-500 hover:underline">
          More Business News
        </Link>
        </div>
        ) : (
          <div></div>
        )}
      </div>

      {hashtags && 
        <div className="flex overflow-x-scroll scrollbar-thin text-nowrap scrollbar-thumb-transparent scrollbar-track-transparent overflow-y-hidden gap-2 flex-wrap items-center justify-start "><span className="text-4xl text-orange-500">#</span>
          {hashtags.map((post)=>(
              <Link
              to={`/search?hashtag=${post}&limit=2`}
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
      }
      {/* Recent Posts Section */}
      <div ref={recentRef} className={`flex flex-col min-h-[200px] gap-3 text-center ${ recent.length === 0  && "!min-h-override"}`}>
        {recent.length > 0 ? (
        <div>
          <h1 className="text-2xl font-semibold">Recent Posts</h1>
          <div className="flex justify-center flex-wrap gap-1">
            {recent.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
      
      <div className=" mb-5 text-xl text-center hover:underline text-teal-500">
        <Link to="/search ">View All Posts</Link>
      </div>
    </div>
  );
}
