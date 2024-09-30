import React from 'react'

export  function HomePostCard({post}) {
  return (
    <div>
      <div className='flex flex-col justify-start items-center'>
        <h1 className='font-semibold text-xl'>{post.title}</h1>
        <div className=' object-cover overflow-hidden'><img className='w-full h-72 sm:h-96 object-cover' src={post.image} /></div>
        <div className='line-clamp-2' dangerouslySetInnerHTML={{__html : post.content1}}></div>
      </div>
    </div>
  )
}
