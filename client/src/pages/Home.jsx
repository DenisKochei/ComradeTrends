import React, { useEffect, useState } from 'react'
import { CallToAction } from '../components/CallToAction'
import { Link } from 'react-router-dom'
import {PostBar} from '../components/PostBar.jsx'

export  function Home() {
  const [trending,setTrending] = useState([])
  const [breaking,setBreaking] = useState([])
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/post/getposts?category=trending')
      const data = await res.json();
      setTrending(data.posts)
    }
    fetchPosts();
  },[])
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/post/getposts?category=breaking')
      const data = await res.json();
      setBreaking(data.posts)
    }
    fetchPosts();
  },[])
  return (
   <div className='min-h-screen'>
    <div className='flex flex-col gap-3 py-8 md:py-20 px-3 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Comrade Trends!</h1>
      <p className='text-gray-500 text-xs sm:text-sm'>At Comrade Trends, we're your trusted source for the latest news, insightful analysis, and trending stories from around the world.</p>
    </div>
    <div className='flex justify-center m-3'>
    <CallToAction/>
    </div>
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
      {breaking && breaking.length > 0 && 
        <div className='flex flex-col gap-6'>
        <h1 className=' text-2xl font-semibold text-center'>Breaking News</h1>
        <div className='flex justify-center flex-wrap gap-4'>
          {breaking.map((post)=>(
            <PostBar post={post} key={post._id}/>
          ))}
        </div>
      </div>
      }
      {trending && trending.length > 0 &&
      (
        <>
          <div className='flex flex-col gap-6'>
          <h1 className=' text-2xl font-semibold text-center'>Trending News</h1>
          <div className='flex justify-center flex-wrap gap-4'>
            {trending.map((post)=>(
              <PostBar post={post} key={post._id}/>
            ))}
          </div>
        </div>
        </>
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
