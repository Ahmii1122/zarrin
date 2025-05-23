import { useParams } from "react-router-dom";
import SubscribeSec from "./SubscribeSec";
import PostCard from "./PostCard";
import useLatestPosts from "../hooks/useLatestposts";
import useSinglePost from "../hooks/useSinglePost";
const BlogDetail = () => {
  const { latestPosts } = useLatestPosts();
  const { id } = useParams<{ id: string }>();
  console.log("🚀 ~ BlogDetail ~ id:", id);
  const { post, loading, error } = useSinglePost(id);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error || !post)
    return <div className="text-center py-10">Error loading blog post.</div>;

  return (
    <div className="max-w-contained mx-auto p-4 md:p-12 mt-20">
      <div className="flex gap-4 px-4 md:px-24">
        <p className="font-roboto  text-xs font-bold">{post.categoryName}</p>

        <p className="font-roboto text-sm text-tgray2">
          {String(post.createdAt)}
        </p>
      </div>
      <p className="font-raleway font-bold text-5xl px-4 md:px-24 mt-8 ">
        {post.title}
      </p>
      <img
        src={post.images?.[0]}
        alt={post.title}
        className="w-full full rounded-md mb-6 mt-14"
      />
      <p className="font-roboto font-normal text-tgray text-base px-4 md:px-24 mt-14">
        {post.content}
      </p>
      <div className="flex justify-between items-center px-10 mt-20">
        <p className="font-roboto font-bold text-2xl">Related Posts</p>
        <button className="font-roboto font-bold text-sm text-white bg-primary px-12 py-4 rounded-md hover:bg-primary/80 transition-all duration-300">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 mb-28">
        {latestPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
      <SubscribeSec />
    </div>
  );
};

export default BlogDetail;
