import React, { useEffect, useState } from 'react'
import { CallToAction } from '../components/CallToAction'
import { Link } from 'react-router-dom'
import {PostBar} from '../components/PostBar.jsx'
import { HomePostCard } from '../components/HomePostCard.jsx'
import { useNavigate } from 'react-router-dom'
import { PostCard } from '../components/PostCard.jsx'

export  function Home() {
  const navigate = useNavigate();
  const [trending,setTrending] = useState([])
  const [breaking,setBreaking] = useState([])
  const [mostTrending,setMostTrending] = useState([])
  const [recent,setRecent] = useState([])
  const [sports,setSports] = useState([])
  const [politics,setPolitics] = useState([])
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
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/post/getposts?category=most-trending')
      const data = await res.json();
      setMostTrending(data.posts)
    }
    fetchPosts();
  },[])
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/post/getposts?limit=3')
      const data = await res.json();
      setRecent(data.posts)
    }
    fetchPosts();
  },[])
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/post/getposts?limit=3&category=politics')
      const data = await res.json();
      setPolitics(data.posts)
    }
    fetchPosts();
  },[])
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/post/getposts?limit=3&category=sports')
      const data = await res.json();
      setSports(data.posts)
    }
    fetchPosts();
  },[])
  return (
   <div className='flex flex-col my-5 mx-5 lg:mx-20 min-h-screen'>
    <div className='flex flex-col md:flex-row gap-2'>
      
      {(breaking && breaking.length >0 ) ? 
      <div onClick={()=>navigate(`/post/${breaking[0].slug}`)} className='!sm:w-1/2 h-auto hover:cursor-pointer w-full flex'>
        <HomePostCard key={breaking[0]._id} post={breaking[0]}/>
      </div> : <div></div>
      }
      {(mostTrending && mostTrending.length >0 && breaking.length === 0) ? 
      <div onClick={()=>navigate(`/post/${mostTrending[0].slug}`)} className='!sm:w-1/2 h-auto hover:cursor-pointer w-full flex'>
        <HomePostCard key={mostTrending[0]._id} post={mostTrending[0]}/>
      </div> : <div></div>
      }
      {(recent && recent.length > 0 && mostTrending.length == 0) ? 
      <div onClick={()=>navigate(`/post/${recent[0].slug}`)} className='!sm:w-1/2 h-auto hover:cursor-pointer w-full flex'>
      <HomePostCard key={recent[0]._id} post={recent[0]}/>
    </div> : <div></div>}
      <div className='flex md:flex-row gap-2 flex-col'>
      <div className={'sm:w-auto w-full'}>
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
      </div>
      <div className={`sm:w-auto w-full`}>
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
      </div>
    </div>
    <div className='flex flex-col w-full items-center'>
    {recent && recent.length > 0 &&
    <div className='flex flex-col gap-3 text-center'>
      <h1 className=' text-2xl font-semibold text-center'>Recent Posts</h1>
      <div  className='flex justify-center flex-wrap h-full gap-1'>
     {recent.map((post)=>( 
      <PostCard key={post._id} post={post} />
     ))}
    </div>
    </div>
    }
    {politics && politics.length > 0 &&
    <div className='flex flex-col gap-3 text-center'>
      <h1 className=' text-2xl font-semibold text-center'>Politics</h1>
      <div  className='flex justify-center flex-wrap h-full gap-1'>
     {politics.map((post)=>( 
      <PostCard key={post._id} post={post} />
     ))}
    </div>
    </div>
    }
    {sports && sports.length > 0 &&
    <div className='flex flex-col gap-3 text-center'>
      <h1 className=' text-2xl font-semibold text-center'>sports</h1>
      <div  className='flex justify-center flex-wrap h-full gap-1'>
     {sports.map((post)=>( 
      <PostCard key={post._id} post={post} />
     ))}
    </div>
    </div>
    }
    </div>
    <div className=' mb-5 text-xl text-center hover:underline text-teal-500'>
    <Link  to='/search '>
      View All Posts
    </Link>
    </div>
   </div>
  )
}
