import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaClock } from "react-icons/fa";

export function PostBar({ post }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/post/${post.slug}`)}
      className="flex px-2 hover:cursor-pointer border-b w-full dark:border-slate-500 border-slate-300 py-2 justify-start gap-2 sm:gap-5"
    >
      <div className="w-28 h-28 ">
        <img className="object-cover w-28 h-28 rounded-lg" src={post.image} />
      </div>
      <div className="w-full flex flex-col justify-center gap-3">
        <div className="">
          <h3 className="line-clamp-2 font-serif">{post.title}</h3>
        </div>
        <div className="text-gray-600">
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
    </div>
  );
}
