import { useNavigate } from "react-router-dom"

export function PostCard2({post}) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/post/${post.slug}`)}
      className="group relative overflow-hidden rounded-lg w-full sm:!w-[300px] cursor-pointer"
    >
      <div>
        <img
          src={post.image}
          alt="Post-card"
          className="h-[200px] w-full  object-cover "
        />
      </div>
        <div className="flex justify-start items-center text-slate-600 text-xs space-x-1">
          <span className="italic">{post.category}</span>
          {post.subcategory && (
            <>
              <span className="text-slate-300">/</span>
              <span>{post.subcategory}</span>
            </>
          )}
        </div>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
      </div>
    </div>
  )
}
