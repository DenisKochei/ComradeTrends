import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaClock } from "react-icons/fa";
import { IoTrendingUp } from "react-icons/io5";

export function PostBar({ post }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/post/${post.slug}`)}
      className="flex px-2 h-24 hover:cursor-pointer w-full border-b dark:border-slate-700 border-slate-600 py-1 items-center justify-center gap-2 sm:gap-5"
    >
      <div className="w-full flex flex-col justify-center gap-1">
        <div className="flex justify-start max-w-9 lg:max-w-full items-center dark:text-slate-400 text-xs space-x-1">
          <IoTrendingUp className="w-5 h-5 text-purple-600" />
          <span className="italic text-nowrap">{post.category}</span>
          {post.subcategory && (
            <>
              <span className=" dark:text-slate-600">/</span>
              <span className="text-nowrap">{post.subcategory}</span>
            </>
          )}
        </div>

        <div className="">
          <h3 className="line-clamp-2 font-serif">{post.title}</h3>
        </div>
        <div className="dark:text-gray-400">
          <div className=" text-sm flex  justify-between">
            <span className="flex gap-1 text-xs items-center justify-center">
              <span className="mt-1 text-xs">
                <FaClock className="text-blue-500" />
              </span>
              <span className=" text-xs">
                {moment(post.createdAt).fromNow()}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="w-28 flex justify-center items-center h-28 ">
        <img loading="lazy" alt={post.title} className="object-cover w-28 h-20 rounded-lg" src={post.image} />
      </div>
    </div>
  );
}
