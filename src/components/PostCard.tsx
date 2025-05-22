import { Link } from "react-router-dom";
import type { Post } from "../lib/types";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const truncatedContent =
    post.content?.length > 100
      ? post.content?.slice(0, 100) + "..."
      : post.content;

  return (
    <div className=" shadow-sm max-w-[400px] p-2">
      <img
        src={post.images?.[0]}
        alt={post.title}
        className="object-cover rounded-t-lg max-w-[400px] w-full aspect-[10/8.0] md:aspect-[10/9.0]"
      />
      <div className=" flex gap-6 mt-10">
        <p className="text-xs font-roboto font-bold">{post.categoryName}</p>
        <p className="font-roboto text-xs font-medium text-tgray2">
          {String(post.publishedAt)}
        </p>
      </div>
      <p className="font-raleway font-bold text-2xl mt-4">{post.title}</p>
      <p className="font-roboto font-normal text-tgray2 mt-2">
        {truncatedContent}
      </p>
      <Link to={`/blogdetail/${post.id}`}>
        <button className="mt-5 text-primary underline font-roboto font-bold text-[18px] mb-14">
          Read More...
        </button>
      </Link>
    </div>
  );
};
export default PostCard;
