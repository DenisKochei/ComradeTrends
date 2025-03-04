import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export function HomePostCard({ post }) {
  return (
    <div>
      <div className="flex flex-col justify-start items-center">
        <h1 className="font text-xl">{post.title}</h1>
        <Link
          to={`/search?category=${post.category}`}
          className="self-center mt-2"
        >
          <Button className="focus:ring-0" pill color="gray" size="xs">
            {post.category === "most-trending"
              ? "Most Trending"
              : post.category}
          </Button>
        </Link>
        <div className=" object-cover my-2 overflow-hidden">
          <img className="w-full h-72 sm:h-96 object-cover" src={post.image} />
        </div>
        <div
          className="line-clamp-2 text-l"
          dangerouslySetInnerHTML={{ __html: post.content1 }}
        ></div>
        <span className="text-cyan-500 text-nowrap">Read More</span>
      </div>
    </div>
  );
}
