import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export function HomePostCard({ post }) {
  return (
    <div>
      <div className="flex flex-col sm:mt-5 mt-2 justify-start items-center">
       <div className="flex flex-col-reverse text-start sm:flex-col">
        <h1 className="font-semi font-serif font-bold text-xl">{post.title}</h1>
       <Link
          to={`/search?category=${post.category}`}
          className=" mt-2 flex justify-start items-center gap-1"
        >
          <div className={`w-3 h-3 ${post.category === "breaking" ? "bg-red-400" : post.category === "most-trending" ? "bg-blue-400" : "bg-green-400"} rounded-full`}></div>
          <button className="focus:ring-0 p-0" pill color="gray" size="xs">
            {post.category === "most-trending"
              ? "Most Trending"
              : post.category === 'breaking' ? "Breaking News" : post.category}
          </button>
        </Link>
        <div className=" object-cover my-2 overflow-hidden">
          <img loading="lazy" className="w-full h-64 sm:h-96 object-cover" src={post.image} />
        </div>
       </div>
        <div
          className="md:line-clamp-3 text-start line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content1 }}
        ></div>
        <span className="text-cyan-500 text-nowrap">Read More</span>
      </div>
    </div>
  );
}
