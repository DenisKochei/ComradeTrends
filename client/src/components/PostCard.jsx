import { useNavigate } from "react-router-dom"

export  function PostCard({post}) {
  const navigate = useNavigate ()
  return (
    <div onClick={()=>navigate(`/post/${post.slug}`)} className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] hover:cursor-pointer transition-all">
      <div>
        <img src={post.image} alt="Post-card" className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20" />
      </div>
      <div className="p-3 flex flex-col gap-2" >
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-xs">{post.category}</span>
        <span className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2">Read Article</span>
      </div>
    </div>
  )
}
