import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {PostCard} from '../components/PostCard';
import { Helmet } from 'react-helmet';

export function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: '',
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [readMoreLoading, setReadMoreLoading] = useState(false)

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      setReadMoreLoading(false)
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || '';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort || '');
    urlParams.set('category', sidebarData.category || '');
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    setReadMoreLoading(true);
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
    setReadMoreLoading(false);
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      <Helmet>
        <title>{`ComradeTrends | Search Page`}</title>
        <meta name="description" content="We're your trusted source for the latest news, insightful analysis, and trending stories from around the world." />
      </Helmet>
      <div className='p-3 border-b md:border-r md:min-h-screen border-gray-500'>
     <form className='flex flex-col gap-2 justify-start' onSubmit={handleSubmit}>
      <div className='w-full flex gap-0'>
        <input 
          id='searchTerm'
          type='text'
          value={sidebarData.searchTerm}
          onChange={handleChange} 
          placeholder='Search...'
          className=' w-1/2 dark:bg-slate-800 rounded-lg border-b-slate-500'/>
        <select className=' border-none w-1/4 focus:ring-0 dark:bg-slate-800 '  onChange={handleChange} value={sidebarData.sort} id='sort'>
         <option value='desc'>Latest</option>
         <option value='asc'>Oldest</option>
       </select>
       <select
         onChange={handleChange}
         value={sidebarData.category}
         id='category'
         className=' dark:bg-slate-800 border-none focus:ring-0 w-1/4'
       >
          <option value=''>uncategorized</option>
          <option value='sports'>sports</option>
          <option value='business'>business</option>
          <option value='health'>health</option>
          <option value='politics'>politics</option>
          <option value='entertainment'>entertainment</option>
          <option value='general'>general</option>
          <option value='Technology'>technology</option>
          <option value='international'>international</option>
          <option value='education'>education</option>
       </select>
      </div>
      <Button outline type='submit' color='transparent' gradientDuoTone='purpleToBlue' className='focus:ring-0'><span className='text-nowrap'>Apply Filter</span></Button>
     </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          Posts results:
        </h1>
        <div className='p-7 flex justify-center flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {(showMore && !loading) && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              {(readMoreLoading) ? <Spinner /> : "Read More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}