import moment from "moment";
import { useNavigate } from "react-router-dom";

export function PostCard2({ post }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/post/${post.slug}`)}
      className="group relative mb-1 dark:border-slate-600 h-[270px] border-slate-800 rounded-b-md border overflow-hidden rounded-lg w-full sm:!w-[250px] cursor-pointer"
    >
      <div>
        <img
          loading="lazy"
          src={post.image}
          alt={post.title}
          className="h-[190px] w-full  object-cover "
        />
      </div>
      <div className="flex justify-between mx-2 items-center dark:text-slate-400 text-xs space-x-1">
        <div className="space-x-1 mt-1">
          <span className="italic">{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
          {post.subcategory && (
            <>
              <span className="text-slate-600">/</span>
              <span>{post.subcategory.charAt(0).toUpperCase() + post.subcategory.slice(1)}</span>
            </>
          )}
        </div>
        <span className=" mt-1 text-nowrap mr-2">{moment(post.createdAt).fromNow()}</span>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <p className=" mb-0.5 line-clamp-2">{post.title}</p>
      </div>
    </div>
  );
}
