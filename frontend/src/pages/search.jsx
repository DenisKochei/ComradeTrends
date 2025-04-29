import { Button, Spinner } from "flowbite-react";
import NProgress from 'nprogress';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { Helmet } from "react-helmet";
import { Heropost } from "../components/Heropost";
import { Link } from "react-router-dom";
import { PostCard2 } from "../components/PostCard2";

export function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [readMoreLoading, setReadMoreLoading] = useState(false);
  const [totalPosts, setTotalPosts] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPosts = async () => {
      setLoading(true);
      setReadMoreLoading(false);
      const searchQuery = urlParams.toString();
      NProgress.start();
      const res = await fetch(`/api/post/getposts?${searchQuery}&limit=7`);
      if (!res.ok) {
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setTotalPosts(data.length);
        setLoading(false);
        if (data.posts.length >= 7) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
      NProgress.done()
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    NProgress.start();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort || "");
    urlParams.set("category", sidebarData.category || "");
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    NProgress.done();
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    setReadMoreLoading(true);
    const res = await fetch(`/api/post/getposts?${searchQuery}&limit=4`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      setReadMoreLoading(false);
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length < 4) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full md:flex-row">
      <Helmet>
        <title>{`ComradeTrends | Search Page`}</title>
        <meta
          name="description"
          content="We're your trusted source for the latest news, insightful analysis, and trending stories from around the world."
        />
      </Helmet>
      <div className="flex w-full flex-col md:flex-row min-h-screen">

        <div className="relative sm:w-1/4 min-w-[250px] w-full md:border-r md:min-h-screen border-b border-gray-500">
          <form
            className="flex flex-col md:sticky top-10 p-1 gap-2 justify-start"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex-col md:flex gap-0">
              <input
                id="searchTerm"
                type="text"
                value={sidebarData.searchTerm}
                onChange={handleChange}
                placeholder="Search..."
                className=" w-1/2 md:w-full dark:bg-slate-800 rounded-lg border-b-slate-500"
              />
              <select
                className=" border-none w-1/4 md:w-full focus:ring-0 dark:bg-slate-800 "
                onChange={handleChange}
                value={sidebarData.sort}
                id="sort"
              >
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </select>
              <select
                onChange={handleChange}
                value={sidebarData.category}
                id="category"
                className=" dark:bg-slate-800 border-none focus:ring-0 w-1/4 md:w-full"
              >
                <option value="">Select category</option>
                <option value="breaking">Breaking news</option>
                <option value="business">Business</option>
                <option value="climate">Climate</option>
                <option value="education">Education</option>
                <option value="entertainment">Entertainment</option>
                <option value="general">General</option>
                <option value="health">Health</option>
                <option value="market">Market</option>
                <option value="most-trending">Most trending</option>
                <option value="people">People</option>
                <option value="politics">Politics</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
                <option value="trending">Trending</option>
                <option value="agriculture">Agriculture</option>
              </select>
            </div>
            <Button
              outline
              type="submit"
              color="transparent"
              gradientDuoTone="purpleToBlue"
              className="focus:ring-0"
            >
              <span className="text-nowrap">Apply Filter</span>
            </Button>
          </form>
        </div>
        <div className="w-full mx-auto p-0 md:p-2 m-1">
          <div className="flex justify-start sm:border-b mb-2 border-gray-500 items-center gap-1">
            <h1 className="text-xl font-semibold   p-1 m-1 ">
              Search results:
            </h1>
            <span className="text-teal-500 text-xl">{totalPosts}</span>
          </div>
          <div>
            {!loading && posts.length === 0 && (
              <p className="text-xl text-gray-500">No posts found.</p>
            )}
            {loading && <p className="text-xl mt-3 ml-3 text-gray-500">Loading...</p>}

          </div>
          {(!loading && (posts.length > 0)) &&
            <div className="flex flex-col sm:flex-row justify-between items-center gap-1">
              <div className="flex flex-col w-full gap-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Heropost posts={posts[0]} />
                  <div className="flex">
                    <div className="flex w-full sm:w-auto flex-col">
                      {posts.slice(1, 3).map((post) => (
                        <PostCard2 key={post._id} post={post} />
                      ))}
                    </div>

                    <div className="w-full hidden sm:w-[200px] ml-2 sm:flex md:hidden lg:flex flex-wrap rounded-md bg-orange-800 p-3 gap-10">
                      <h1 className="text-lg my-1 text-slate-300 font-light font-serif">
                        Discover the future today, right here !
                      </h1>
                      <p className="text-slate-300">
                        Comrade Trends is your go-to source for timely, reliable, and
                        engaging news. From breaking stories and in-depth analysis to
                        entertainment, politics, campus updates, and tech trends, we keep
                        you informed 24/7. Whether you're a student or a professional,
                        Comrade Trends delivers news that matters to you, all in one place.
                        Stay ahead with real-time updates and fresh perspectives from a
                        platform built for the modern, connected reader.
                      </p>
                      <Link to={"/contacts"}>
                        <button className="focus:ring-0 w-full p-2 text-slate-300 py-1 rounded-md border mb-4 border-slate-900 transition duration-300 ease-in-out">
                          Contact us
                        </button>
                      </Link>
                    </div>

                  </div>
                  <div className="w-full sm:hidden flex flex-wrap rounded-md bg-orange-800 p-3 gap-10">
                    <h1 className="text-lg my-5 text-slate-300 font-light font-serif">
                      Discover the future today, right here !
                    </h1>
                    <p className="text-slate-300">
                      Comrade Trends is your go-to source for timely, reliable, and
                      engaging news. From breaking stories and in-depth analysis to
                      entertainment, politics, campus updates, and tech trends, we keep
                      you informed 24/7. Whether you're a student or a professional,
                      Comrade Trends delivers news that matters to you, all in one place.
                      Stay ahead with real-time updates and fresh perspectives from a
                      platform built for the modern, connected reader.
                    </p>
                    <Link to={"/contacts"}>
                      <button className="focus:ring-0 w-full text-slate-300 py-1 rounded-md p-2 border mb-4 border-slate-900 transition duration-300 ease-in-out">
                        Contact us
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex justify-center flex-wrap gap-1">
                  {posts.slice(3).map((post) => (
                    <PostCard post={post} key={post._id} />
                  ))}
                </div>
                {(showMore && !loading) && (
                  <div className="w-full flex justify-center items-center">
                    <button
                      onClick={handleShowMore}
                      className="text-teal-500 text-lg hover:underline p-2 w-full"
                    >
                      {readMoreLoading ? <Spinner /> : "Show More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          }

        </div>
      </div>
    </div>
  );
}
