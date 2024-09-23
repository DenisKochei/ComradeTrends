import React, { useEffect, useState } from 'react'
import { CallToAction } from '../components/CallToAction'
import { Link } from 'react-router-dom'
import {PostCard} from '../components/PostCard.jsx'

export  function Home() {
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/post/getposts')
      const data = await res.json();
      setPosts(data.posts)
      console.log(posts)
    }
    fetchPosts();
  },[])
  return (
   <div>
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Comrade Trends!</h1>
      <p className='text-gray-500 text-xs sm:text-sm'>At Comrade Trends, we're your trusted source for the latest news, insightful analysis, and trending stories from around the world.</p>
      <Link to='/search' className='text-xs sm:text-sm hover:underline text-teal-500'>
        View All Posts
      </Link>
    </div>
    <div className='mx-3'>
    <CallToAction/>
    </div>
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
      {posts && posts.length > 0 &&
      (
        <div className='flex flex-col gap-6'>
          <h1 className=' text-2xl font-semibold text-center'>Trending Posts</h1>
          <div className='flex justify-center flex-wrap gap-4'>
            {posts.map((post)=>(
              <PostCard post={post} key={post._id}/>
            ))}
          </div>
        </div>
      )}
    </div>
    <div className=' mb-5 text-xl text-center hover:underline text-teal-500'>
    <Link  to='/search '>
      View All Posts
    </Link>
    </div>
   </div>
  )
}
