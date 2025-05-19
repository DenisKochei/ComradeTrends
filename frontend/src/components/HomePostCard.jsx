import { Link } from "react-router-dom";
import moment from "moment";

export function HomePostCard({ post }) {
  return (
    <div>
      <div className="flex flex-col sm:mt-1 -mb-4 sm:mb-0 mt-2 justify-start items-center">
        <div className="flex flex-col-reverse text-start sm:flex-col">
          <h1 className="font-semi font-serif font-bold text-xl">{post.title}</h1>
          <div className=" flex justify-between items-center mx-1">
            <Link
              to={`/search?category=${post.category}`}
              className=" mt-2 flex justify-start items-center gap-1"
            >
              <div className={`w-3 h-3 ${post.category === "breaking" ? "bg-red-400" : post.category === "most-trending" ? "bg-blue-400" : "bg-green-400"} rounded-full`}></div>
              <span className="focus:ring-0 " pill color="gray" size="xs">
                {post.category === "most-trending"
                  ? "Most Trending"
                  : post.category === 'breaking' ? "Breaking News" : post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
            </Link>
            <span className=" mt-1 text-nowrap mr-2">{moment(post.createdAt).fromNow()}</span>
          </div>
          <div className=" object-cover md:my-2 overflow-hidden">
            <img loading="lazy" alt={post.title} className="w-full h-64 sm:h-96 object-cover" src={post.image} />
          </div>
        </div>
        <div
          className=" text-start line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content1 }}
        ></div>
        <span className="text-cyan-500 -mt-1 text-nowrap"><p>Read More</p></span>
      </div>
    </div>
  );
}
