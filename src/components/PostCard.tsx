import { Link } from "react-router-dom";
import type { Post } from "../lib/types";
import { useAuth } from "../firebase/auth";

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
}

const PostCard = ({ post, onEdit, onDelete }: PostCardProps) => {
  const { user } = useAuth();

  const truncatedContent =
    post.content?.length > 100
      ? post.content.slice(0, 100) + "..."
      : post.content;

  return (
    <div className="shadow-sm max-w-[400px] p-2">
      <img
        src={post.images?.[0]}
        alt={post.title}
        className="object-cover rounded-t-lg max-w-[400px] w-full aspect-[10/8.0] md:aspect-[10/9.0]"
      />
      <div className="flex gap-6 mt-10">
        <p className="text-xs font-roboto font-bold">{post.categoryName}</p>
        <p className="font-roboto text-xs font-medium text-tgray2">
          {post.createdAt}
        </p>
      </div>
      <p className="font-raleway font-bold text-2xl mt-4">{post.title}</p>
      <p className="font-roboto font-normal text-tgray2 mt-2">
        {truncatedContent}
      </p>
      <div className="flex flex-row gap-5">
        <Link to={`/blogdetail/${post.id}`}>
          <button className="mt-5 text-primary underline font-roboto font-bold text-[18px]">
            Read More...
          </button>
        </Link>
        <div className="flex flex-row gap-5">
          {user &&
            post.authorUid === user?.uid &&
            location.pathname === "/myblogs" && (
              <>
                <button
                  onClick={() => onEdit(post)}
                  className="mt-5 text-green-500 underline font-roboto font-bold text-[18px]"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="mt-5 text-red-500 underline font-roboto font-bold text-[18px]"
                >
                  Delete
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
