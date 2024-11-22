import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostBar } from "../components/PostBar.jsx";
import { HomePostCard } from "../components/HomePostCard.jsx";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../components/PostCard.jsx";
import { Spinner } from "flowbite-react";
import { Helmet } from "react-helmet";

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
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?category=trending&limit=3");
      const data = await res.json();
      setTrending(data.posts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?category=breaking&limit=3");
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
      const res = await fetch("/api/post/getposts?limit=3");
      const data = await res.json();
      setRecent(data.posts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=3&category=politics");
      const data = await res.json();
      setPolitics(data.posts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=3&category=sports");
      const data = await res.json();
      setSports(data.posts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        "/api/post/getposts?limit=3&category=international"
      );
      const data = await res.json();
      setInternational(data.posts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        "/api/post/getposts?limit=3&category=entertainment"
      );
      const data = await res.json();
      setEntertainment(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className="flex flex-col my-5 mx-5 lg:mx-10 min-h-screen">
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
      <div className="flex flex-col md:flex-row gap-2">
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
        {recent.length === 0 &&
        mostTrending.length === 0 &&
        breaking.length === 0 ? (
          <div>
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
          <div className="sm:w-1/2 w-full">
            {trending && trending.length > 0 && (
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
            )}
          </div>
          {breaking && breaking.length > 0 ? (
            <div className="sm:w-1/2 w-full">
              <div className="flex flex-col gap-6">
                <h1 className=" text-2xl font-semibold text-center">
                  Breaking News
                </h1>
                <div className="flex justify-center flex-wrap gap-4">
                  {breaking.map((post) => (
                    <PostBar post={post} key={post._id} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="sm:w-1/2 w-full">
              {sports && sports.length > 0 ? (
                <div className="flex flex-col  gap-6">
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
                <div></div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full items-center">
        {politics && politics.length > 0 && (
          <div className="flex flex-col gap-3 text-center">
            <h1 className=" text-2xl font-semibold text-center">Politics</h1>
            <div className="flex justify-center flex-wrap h-full gap-1">
              {politics.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={`/search?category=politics`}
              className=" mb-5 text-center hover:underline text-teal-500"
            >
              More Politics news
            </Link>
          </div>
        )}
        {international && international.length > 0 && (
          <div className="flex flex-col gap-3 text-center">
            <h1 className=" text-2xl font-semibold text-center">
              International News
            </h1>
            <div className="flex justify-center flex-wrap h-full gap-1">
              {international.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={`/search?category=international`}
              className=" mb-5 text-center hover:underline text-teal-500"
            >
              More international news
            </Link>
          </div>
        )}
        {entertainment && entertainment.length > 0 && (
          <div className="flex flex-col gap-3 text-center">
            <h1 className=" text-2xl font-semibold text-center">
              Entertainment
            </h1>
            <div className="flex justify-center flex-wrap h-full gap-1">
              {entertainment.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={`/search?category=entertainment`}
              className=" mb-5 text-center hover:underline text-teal-500"
            >
              More entertainment news
            </Link>
          </div>
        )}
      </div>
      {recent && recent.length > 0 && (
        <div className="flex flex-col gap-3 text-center">
          <h1 className=" text-2xl font-semibold text-center">Recent Posts</h1>
          <div className="flex justify-center flex-wrap h-full gap-1">
            {recent.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
      <div className=" mb-5 text-xl text-center hover:underline text-teal-500">
        <Link to="/search ">View All Posts</Link>
      </div>
    </div>
  );
}
