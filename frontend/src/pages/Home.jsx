import React, { useEffect, useState, useRef } from "react";
import NProgress from 'nprogress';
import { ProgressBar } from "../components/ProgressBar.jsx";
import { Link } from "react-router-dom";
import { PostBar } from "../components/PostBar.jsx";
import { HomePostCard } from "../components/HomePostCard.jsx";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../components/PostCard.jsx";
import { Spinner, Button } from "flowbite-react";
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
  const [agriculture, setAgriculture] = useState([]);
  const [international, setInternational] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [business, setBusiness] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [education, setEducation] = useState([]);
  const [hashtags, setHashTags] = useState(null);
  const width = window.innerWidth;

  const getFetchLimit = () => {
    const width = window.innerWidth;
    if (width < 640) return 3;
    if (width < 768) return 6;
    if (width < 1024) return 7;
    return 8;
  };

  const [loadedSections, setLoadedSections] = useState({
    entertainment: false,
    agriculture: false,
    recent: false,
  });

  const recentRef = useRef(null);
  const entertainmentRef = useRef(null);
  const agricultureRef = useRef(null);
  const loadPosts = async (category, setter, key) => {
    if (loadedSections[key]) return;

    try {
      const limit = getFetchLimit();
      const res = await fetch(
        category
          ? `/api/post/getposts?category=${category}&limit=${limit}`
          : `/api/post/getposts?limit=${limit}`
      );
      const data = await res.json();
      setter(data.posts);
      setLoadedSections((prev) => ({ ...prev, [key]: true }));
    } catch (error) {
      console.error(`Error fetching ${key} posts:`, error);
    }
  };
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === entertainmentRef.current) {
            loadPosts("entertainment", setEntertainment, "entertainment");
          }
          if (entry.target === agricultureRef.current) {
            loadPosts("agriculture", setAgriculture, "agriculture");
          }
          if (entry.target === recentRef.current) {
            loadPosts("", setRecent, "recent");
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
    });

    if (entertainmentRef.current) observer.observe(entertainmentRef.current);
    if (agricultureRef.current) observer.observe(agricultureRef.current);
    if (recentRef.current) observer.observe(recentRef.current);

    return () => {
      if (entertainmentRef.current) observer.unobserve(entertainmentRef.current);
      if (agricultureRef.current) observer.unobserve(agricultureRef.current);
      if (recentRef.current) observer.unobserve(recentRef.current);
    };
  }, [loadedSections]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        NProgress.start();

        // Create fetch requests
        const requests = [
          fetch("/api/post/getposts?limit=8&category=politics"),
          fetch("/api/post/getposts?limit=9"),
          fetch(`/api/post/getposts?limit=${getFetchLimit()}&category=international`),
          fetch(`/api/post/getposts?limit=${getFetchLimit()}&category=education`),
          fetch("/api/post/getposts?category=trending&limit=5"),
          fetch("/api/post/getposts?category=technology&limit=5"),
          fetch("/api/post/getposts?category=breaking&limit=5"),
          fetch("/api/post/getposts?category=business&limit=5"),
          fetch("/api/post/getposts?category=most-trending&limit=1"),
          fetch("/api/post/getposts?limit=5&category=sports")
        ];

        // Await all requests simultaneously
        const responses = await Promise.all(requests);

        // Convert all responses to JSON
        const data = await Promise.all(responses.map(res => res.json()));

        // Set state with corresponding data
        setPolitics(data[0].posts);
        setHashTags(data[1].allHashtags);
        setInternational(data[2].posts);
        setEducation(data[3].posts);
        setTrending(data[4].posts);
        setTechnology(data[5].posts);
        setBreaking(data[6].posts);
        setBusiness(data[7].posts);
        setMostTrending(data[8].posts);
        setSports(data[9].posts);

      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        NProgress.done();
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <div className="flex  flex-col sm:my-0 my-0 mx-2 lg:mx-3 min-h-screen">
        <Helmet>
          {/* Basic SEO */}
          <title>Comrade Trends | Kenya's Trusted News, Trends & Analysis</title>
          <meta
            name="description"
            content="Comrade Trends is your trusted source for real-time news, insightful stories, and trending topics across Kenya and the world."
          />
          <meta
            name="keywords"
            content="Kenya news, trending stories, breaking news, student updates, campus life, politics, tech news, agriculture, Comrade Trends"
          />
          <meta name="author" content="Comrade Trends Team" />
          <link rel="canonical" href="https://comradetrends.com/" />

          {/* Open Graph / Facebook / WhatsApp */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Comrade Trends | Kenya's Trusted News Source" />
          <meta property="og:description" content="Stay informed with breaking stories, trending topics, and expert analysis. News that matters to you, updated 24/7." />
          <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/comrade-trends.appspot.com/o/comradetrendslogo.jpg?alt=media&token=53653236-5cce-40a9-989e-e8959335bf63" />
          <meta property="og:url" content="https://comradetrends.com/" />
          <meta property="og:site_name" content="Comrade Trends" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Comrade Trends | Kenya's Trusted News Source" />
          <meta name="twitter:description" content="Real-time updates on Kenya's top news, campus life, tech, politics, and more. Your voice, your trends." />
          <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/comrade-trends.appspot.com/o/comradetrendslogo.jpg?alt=media&token=53653236-5cce-40a9-989e-e8959335bf63" />
          <meta name="twitter:site" content="@comradetrends" />
          <meta name="twitter:creator" content="@comradetrends" />

          {/* JSON-LD Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Comrade Trends",
              "url": "https://comradetrends.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://comradetrends.com/search?searchTerm={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Comrade Trends",
              "url": "https://comradetrends.com",
              "logo": "https://firebasestorage.googleapis.com/v0/b/comrade-trends.appspot.com/o/ComradeTrendsLogo2.png?alt=media&token=4dabb883-ef77-4e0a-98fb-1a02b315ee3a",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61566437698996",
                "https://www.x.com/@ComradeTrends",
                "https://www.youtube.com/@ComradeTrends"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254759117496",
                "contactType": "Customer Support",
                "areaServed": "KE",
                "availableLanguage": ["English", "Swahili"]
              }
            })}
          </script>
        </Helmet>

        <div className=" overflow-x-scroll overflow-y-hidden border p-0 flex w-full border-b-slate-600 border-t-0 border-x-0 dark:text-slate-500 scrollbar-thin text-nowrap scrollbar-thumb-transparent gap-2 scrollbar-track-transparent justify-between  items-center ">
          <div className="flex justify-center md:-mb-2 items-center">
            <IoTrendingUp className="w-5 h-5 text-purple-600" />
            <Link
              to={`/search?category=trending`}
              className="self-center text-nowrap"
            >
              <Button area-label="Trending button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400">Trending</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=business`}
              className="self-center text-nowrap"
            >
              <Button area-label="Business button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400">Business</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=technology`}
              className="self-center text-nowrap"
            >
              <Button area-label="Technology button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400">Technology</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=sports`}
              className="self-center text-nowrap"
            >
              <Button area-label="Sports button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400">Sports</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=politics`}
              className="self-center text-nowrap"
            >
              <Button area-label="Politics button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400">Politics</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=people`}
              className="self-center text-nowrap"
            >
              <Button area-label="People button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400">People</span>
              </Button>
            </Link>
            <Link
              to={`/search?category=international`}
              className="self-center text-nowrap"
            >
              <Button area-label="International button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400">International</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=market`}
              className="self-center text-nowrap"
            >
              <Button area-label="Market button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400">Market</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=health`}
              className="self-center text-nowrap"
            >
              <Button area-label="Health button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400">Health</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=general`}
              className="self-center text-nowrap"
            >
              <Button area-label="General button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400">General</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=entertainment`}
              className="self-center text-nowrap"
            >
              <Button area-label="Entertainment button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400">Entertainment</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=education`}
              className="self-center text-nowrap"
            >
              <Button area-label="Education button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400"> Education</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=climate`}
              className="self-center text-nowrap"
            >
              <Button area-label="Climate button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400"> Climate</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=business`}
              className="self-center text-nowrap"
            >
              <Button area-label="Business button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400"> Business</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
            <Link
              to={`/search?category=agriculture`}
              className="self-center text-nowrap"
            >
              <Button area-label="Agriculture button" className="focus:ring-0" color="transparent" size="xs">
                <span className="dark:text-slate-400"> Agriculture</span>
              </Button>
            </Link>
            <span className="dark:text-slate-700">|</span>
          </div>
          <div className="flex gap-5 ml-10 md:-mb-2 justify-center items-center">
            <span className="flex items-center gap-1">
              <a aria-label="tell number,call us" href="tel:+254759117496">
                <FaPhoneAlt className="dark:dark:text-slate-400 text-sm" />
              </a>
            </span>
            <span className="flex items-center gap-1">
              <a aria-label="what's up us" href="https://wa.me/+254753868958?text=Hello!">
                <IoLogoWhatsapp className="dark:dark:text-slate-400 text-sm" />
              </a>
            </span>
            <span className="flex items-center gap-1">
              <a aria-label="email us" href="mailto:comradetrends.info@gmail.com">
                <IoMdMail className="dark:dark:text-slate-400 text-sm" />
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
            {mostTrending &&
              mostTrending.length > 0 &&
              breaking.length === 0 ? (
              <div
                onClick={() => navigate(`/post/${mostTrending[0].slug}`)}
                className="!sm:w-1/2 h-auto hover:cursor-pointer w-full flex"
              >
                <HomePostCard
                  key={mostTrending[0]._id}
                  post={mostTrending[0]}
                />
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
          {recent.length === 0 &&
            mostTrending.length === 0 &&
            breaking.length === 0 ? (
            <div className="min-h-screen">
              <div className="flex flex-col gap-3 items-center justify-center py-8 md:py-20 px-3 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold md:text-nowrap lg:text-6xl">
                  Welcome to Comrade Trends!
                </h1>
                <p className="dark:text-slate-400 text-xs sm:text-sm">
                  At Comrade Trends, we're your trusted source for the latest
                  news, insightful analysis, and trending stories from around
                  the world.
                </p>
                <Spinner className="self-center m-10" />
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex md:flex-row md:w-1/2 gap-2 flex-col">
            <div className="md:w-1/2 md:mt-1 w-full">
              {(trending && trending.length > 0) ? (
                <>
                  <h1 className=" md:text-lg text-lg md:font-semibold text-center">
                    Trending News
                  </h1>
                  <div className="flex flex-col gap-1 sm:gap-6">
                    <div className="flex justify-center flex-wrap gap-0">
                      {trending.map((post) => (
                        <PostBar post={post} key={post._id} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  {(business && business.length > 0) &&
                    (
                      <>
                        <h1 className=" md:text-lg text-lg md:font-semibold text-center">
                          Business News
                        </h1>
                        <div className="flex flex-col gap-1 sm:gap-6">
                          <div className="flex justify-center flex-wrap gap-0">
                            {business.map((post) => (
                              <PostBar post={post} key={post._id} />
                            ))}
                          </div>
                        </div>
                      </>
                    )
                  }
                </div>
              )}
            </div>
            <div className="md:w-1/2 md:mt-1 w-full">
              {(sports && sports.length > 0) ? (
                <div className="flex flex-col w-full">
                  <h1 className=" md:text-lg text-lg md:font-semibold text-center">
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
                  {(technology && technology.length > 0) && (
                    <>
                      <div className="flex flex-col w-full">
                        <h1 className=" md:text-lg text-lg md:font-semibold text-center">
                          Tech News
                        </h1>
                        <div className="flex justify-center flex-wrap gap-0">
                          {technology.map((post) => (
                            <PostBar post={post} key={post._id} />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col my-1 mx-2 lg:mx-1 min-h-screen">
            {(international && international.length !== 0) && (
              <div className="md:-mt-4">
                <Link className="flex w-fit" to={`/search?category=international`}>
                  <div className="flex justify-start my-2 gap-1 items-center">
                    <IoTrendingUp className="w-5 h-5 text-purple-600" />
                    <h1 className="text-lg">International</h1>
                    <div className="mt-1">
                      <FaAngleRight />
                    </div>
                  </div>
                </Link>
                <div className="w-full sm:flex">
                  <div className="sm:!w-3/12 w-full mb-4 flex flex-col rounded-md bg-orange-800 p-1 gap-10">
                    <h1 className="text-lg my-5 text-slate-300 font-light font-serif">
                      Discover the future today, right here !
                    </h1>
                    <p className="text-slate-300">
                      Comrade Trends is your go-to source for timely, reliable,
                      and engaging news. From breaking stories and in-depth
                      analysis to entertainment, politics, campus updates, and
                      tech trends, we keep you informed 24/7. Whether you're a
                      student or a professional, Comrade Trends delivers news
                      that matters to you, all in one place. Stay ahead with
                      real-time updates and fresh perspectives from a platform
                      built for the modern, connected reader.
                    </p>
                    <Link to={"/contacts"}>
                      <button area-label="button" className="focus:ring-0 w-1/2 text-slate-300 py-1 rounded-md p-0 border mb-4 border-slate-900 transition duration-300 ease-in-out">
                        Contact us
                      </button>
                    </Link>
                  </div>
                  <div className="sm:mx-1 w-full md:-mt-3 sm:!w-9/12">
                    <div
                      onClick={() => navigate(`/post/${international[0].slug}`)}
                      className="sm:flex sm:border-none border-b dark:border-slate-600 rounded-b-md border-slate-300 cursor-pointer"
                    >
                      <div className="w-full sm:mt-0 sm:w-5/8 ">
                        <img loading="lazy"
                          alt={international[0].title}
                          className="object-cover self-center  mt-1 pt-1 p-1 h-[310px] w-full !max-w-4xl"
                          src={international[0].image}
                        />
                      </div>
                      <div className="gap-3 sm:flex flex-col mx-2 w-full sm:w-3/8">
                        <div className="flex justify-start gap-4 mx-2 items-center dark:text-slate-400 text-xs space-x-1">
                          <div className="space-x-1 mt-1">
                            <span className="italic">
                              {international[0].category.charAt(0).toUpperCase() + international[0].category.slice(1)}
                            </span>
                            {international[0].subcategory && (
                              <>
                                <span className="dark:text-slate-400">/</span>
                                <span>{international[0].subcategory.charAt(0).toUpperCase() + international[0].subcategory.slice(1)}</span>
                              </>
                            )}
                          </div>

                        </div>
                        <h1 className="text-lg font-bold line-clamp-3">
                          {international[0].title}
                        </h1>
                        <div
                          className="sm:line-clamp-6 line-clamp-2 mb-3 sm:mb-0 text-l"
                          dangerouslySetInnerHTML={{
                            __html: international[0].content1,
                          }}
                        ></div>
                        <span className=" dark:text-slate-400 text-xs">
                          {moment(international[0].createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                    <div className="w-full overflow-x-scroll scrollbar-thin scrollbar-thumb-transparent  scrollbar-track-transparent overflow-y-hidden gap-2 mt-2 grid grid-flow-row sm:grid-flow-col grid-row-1">
                      {international.slice(1).map((post) => (
                        <PostCard2 post={post} key={post._id} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div
              ref={entertainmentRef}
              className={`flex w-full flex-col gap-3 min-h-[200px] sm:-mt-6 -mt-5 text-center ${entertainment.length === 0 && "!min-h-override"
                }`}
            >
              {(entertainment.length > 0) &&
                (
                  <>
                    {entertainment ? (
                      <div>
                        <Link className="flex w-fit" to={`/search?category=entertainment`}>
                          <div className="flex justify-start my-2 gap-1 items-center">
                            <IoTrendingUp className="w-5 h-5 text-purple-600" />
                            <h1 className="text-lg">Entertainment</h1>
                            <div className="mt-1">
                              <FaAngleRight />
                            </div>
                          </div>
                        </Link>
                        <div className=" overflow-x-scroll overflow-y-hidden p-1 flex w-full scrollbar-thin 5xl:justify-center scrollbar-thumb-transparent gap-2 scrollbar-track-transparent justify-between  items-center ">
                          <div className="flex w-full sm:w-auto flex-col gap-2 justify-around sm:flex-row items-center">
                            {entertainment.map((post) => (
                              <PostCard key={post._id} post={post} />
                            ))}
                          </div>
                        </div>
                        <Link
                          to="/search?category=entertainment"
                          className="dark:text-slate-400 hover:underline"
                        >
                          <span className=" dark:text-cyan-300">More Entertainment News</span>
                        </Link>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </>
                )
              }
            </div>
            {(politics.length > 0) && (
              <div className={`${entertainment.length === 0 ? "mt-4" : "mt-2"} `}>
                <Link className="flex w-fit" to={`/search?category=politics`}>
                  <div className="flex justify-start gap-1 items-center">
                    <IoTrendingUp className="w-5 h-5 text-purple-600" />
                    <h1 className="text-lg">Politics</h1>
                    <div className="mt-1">
                      <FaAngleRight />
                    </div>
                  </div>
                </Link>
                <div className="w-full flex flex-col sm:flex-row gap-3 justify-start items-start">
                  <div
                    onClick={() => navigate(`/post/${politics[0].slug}`)}
                    className="sm:w-5/12 sm:border-none border-b dark:border-slate-600 border-slate-800 rounded-b-md cursor-pointer w-full"
                  >
                    <h1 className="text-lg font-light line-clamp-3 font-serif">
                      {politics[0].title}
                    </h1>
                    <div className="flex justify-start items-center dark:text-slate-400 text-xs space-x-1">
                      <span className="italic">{politics[0].category.charAt(0).toUpperCase() + politics[0].category.slice(1)}</span>
                      {politics[0].subcategory && (
                        <>
                          <span className="dark:text-slate-400">/</span>
                          <span>{politics[0].subcategory.charAt(0).toUpperCase() + politics[0].subcategory.slice(1)}</span>
                        </>
                      )}
                    </div>
                    <div className="my-2 object-cover self-center mt-1 pt-1 p-1 w-full !max-w-4xl overflow-hidden">
                      <img loading="lazy"
                        alt={politics[0].title}
                        className="object-cover self-center mt-1 pt-1 p-1 h-[380px] w-full !max-w-4xl"
                        src={politics[0].image}
                      />
                    </div>
                    <div
                      className="line-clamp-4 mb-3 sm:mb-0 text-l"
                      dangerouslySetInnerHTML={{ __html: politics[0].content1 }}
                    ></div>
                  </div>
                  <div className="flex w-full -mt-0 sm:border-none border-b dark:border-slate-600 border-slate-800 rounded-b-md pb-2 sm:w-3/12 flex-col">
                    <div
                      className="cursor-pointer"
                      onClick={() => navigate(`/post/${politics[1].slug}`)}
                    >
                      <img loading="lazy"
                        alt={politics[1].title}
                        className="object-cover self-center mt-1 pt-1 p-1 h-[430px] w-full !max-w-4xl"
                        src={politics[1].image}
                      />
                      <div className=" text-wrap line-clamp-4 text-lg flex justify-start font-serif">
                        {politics[1].title}
                      </div>
                    </div>
                    <span className=" mt-4 dark:text-slate-400 text-xs">
                      {moment(politics[1].createdAt).fromNow()}
                    </span>
                  </div>
                  <div className="w-full -mt-5 sm:w-4/12">
                    {politics.slice(2).map((post) => (
                      <PostBar post={post} key={post._id} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {hashtags && (
              <div className="flex justify-center mt-2 items-center gap-3">
                <span className="text-4xl text-orange-500">#</span>
                <div className="flex flex-nowrap overflow-x-scroll scrollbar-thin text-nowrap scrollbar-thumb-transparent scrollbar-track-transparent overflow-y-hidden gap-2 items-center justify-start ">
                  {hashtags.map((post, index) => (
                    <div key={index}>
                      <Link
                        to={`/search?hashtag=${post}&searchTerm=${post}`}
                        className="self-center mt-2"
                      >
                        <Button area-label="hashtag button"
                          className="focus:ring-0  rounded-full p-0 border border-gray-400 hover:border-blue-500 transition duration-300 ease-in-out"
                          pill
                          color="white"
                          size="xs"
                        >
                          #{post}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div
              ref={agricultureRef}
              className={`flex flex-col -mt-4 min-h-[200px] gap-0 text-center ${agriculture.length === 0 && "!min-h-override"
                }`}
            >
              {agriculture.length > 0 ? (
                <div className="mt-2">
                  <Link className="flex w-fit" to={"/search?category=agriculture"}>
                    <div className="flex justify-start my-1 gap-1 items-center">
                      <IoTrendingUp className="w-5 h-5 text-purple-600" />
                      <h1 className="text-lg">Agriculture</h1>
                      <div className="mt-1">
                        <FaAngleRight />
                      </div>
                    </div>
                  </Link>
                  <div className=" overflow-x-scroll overflow-y-hidden p-1 flex w-full scrollbar-thin 5xl:justify-center scrollbar-thumb-transparent gap-2 scrollbar-track-transparent justify-between  items-center ">
                    <div className="flex w-full sm:w-auto flex-col gap-2 justify-around sm:flex-row items-center">
                      {agriculture.map((post) => (
                        <PostCard key={post._id} post={post} />
                      ))}
                    </div>
                  </div>
                  <Link
                    to="/search?category=agriculture"
                    className=" hover:underline"
                  >
                    <span className=" dark:text-cyan-300">More Agriculture News</span>
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Link className="flex w-fit" to={`/search`}>
        <div className="flex justify-start gap-1 my-3 mx-5 items-center">
          <IoTrendingUp className="w-5 h-5 text-purple-600" />
          <h1 className="text-lg hover:underline dark:text-cyan-300">All Posts</h1>
          <div className="mt-1 dark:text-cyan-300">
            <FaAngleRight />
          </div>
        </div>
      </Link>
    </div>
  );
}
