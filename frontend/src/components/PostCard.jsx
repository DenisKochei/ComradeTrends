import { useNavigate } from "react-router-dom";
import moment from "moment";

export function PostCard({ post }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/post/${post.slug}`)}
      className="group relative border border-teal-500 h-[290px] overflow-hidden rounded-lg w-full sm:!w-[245px]  hover:cursor-pointer transition-all"
    >
      <div>
        <img
          loading="lazy"
          src={post.image}
          alt={post.title}
          className="h-[200px] w-full  object-cover group-hover:h-[150px] transition-all duration-300 z-20"
        />
      </div>
      <div className="p-3 flex flex-col gap-2">
        <p className=" font-semibold line-clamp-2">{post.title}</p>
        <div className="flex justify-between mx-2 items-center text-slate-800 dark:text-slate-400 text-xs space-x-1"> 
          <span className=" mt-1 text-nowrap mr-2">{moment(post.createdAt).fromNow()}</span>
        </div>

        <span className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2">
          Read Article
        </span>
      </div>
    </div>
  );
}
