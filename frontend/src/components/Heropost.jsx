import React from 'react'
import { IoTrendingUp } from 'react-icons/io5'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'


export function Heropost(post) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/post/${post.posts.slug}`)}
      className="lg:max-w-[700px] md:max-w-[450px] w-full  rounded-lg cursor-pointer h-[350px] md:h-[550px] bg-cover bg-center text-white flex items-end"
      style={{ backgroundImage: `url(${post.posts.image})` }}
      aria-label={post.posts.altText}
    >
      <div className="flex flex-col justify-end w-full bg-gradient-to-t h-[300px] md:h-[400px] lg:h-[450px] from-black/100 via-black/65 to-transparent md:p-3 lg:p-6 p-2">
        <h1 className="text-2xl  font-bold leading-snug mb-1 max-w-4xl">
          {post.posts.title}</h1>
        <div className="text-base sm:line-clamp-3 line-clamp-2 max-w-2xl mb-1"
          dangerouslySetInnerHTML={{ __html: post.posts.content1 }}
        ></div>
        <div className="text-xs flex justify-between text-gray-400">
          <span className=" mt-1 text-nowrap mr-2">{moment(post.posts.createdAt).fromNow()}</span>
          <div className="space-x-1 mt-1">
            <span className="italic">{post.posts.category.charAt(0).toUpperCase() + post.posts.category.slice(1)}</span>
            {post.posts.subcategory && (
              <>
                <span className="text-slate-600">/</span>
                <span>{post.posts.subcategory.charAt(0).toUpperCase() + post.posts.subcategory.slice(1)}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )

}
