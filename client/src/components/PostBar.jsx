import { useNavigate } from "react-router-dom"
import moment from "moment"

export  function PostBar({post}) {
  console.log(post)
  const navigate = useNavigate ()
  return (
    <div onClick={()=>navigate(`/post/${post.slug}`)} className="flex px-2 hover:cursor-pointer border-b w-full dark:border-slate-500 border-slate-900 pb-3 justify-start gap-2 sm:gap-5">
      <div className="w-28 h-28 ">
        <img className="object-cover w-28 h-28 rounded-lg" src={post.image} />
      </div>
      <div className="w-full flex flex-col justify-center gap-1">
        <div className="font-bold ">
          <h3>{post.title}</h3>
        </div>
        <div className="text-gray-600">
          <div className=" text-sm flex  justify-between">
            <span>{post.category} {(post.category === "breaking") && <span>news</span>}</span>
            <span>
            {moment(post.createdAt).fromNow()}
          </span>
          </div>
        </div>
      </div>
    </div>
  )
}
