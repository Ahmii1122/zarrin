import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard";
import useLatestPosts from "../../hooks/useLatestposts";

const PostsView = () => {
  const { latestPosts, popularPosts } = useLatestPosts();
  return (
    <>
      <div className="max-w-contained mx-auto p-6 md:p-12">
        <div className="flex justify-between items-center mb-20 ">
          <h2 className="text-5xl font-bold mb-6 flex items-center font-raleway pl-4">
            Latest Posts
          </h2>
          <div className="flex items-center pr-12">
            <Link to={"/blog"}>
              <button className="text-white border bg-primary border-primary py-4 px-12 rounded-lg font-roboto font-bold text-[14px] ">
                View All
              </button>
            </Link>
          </div>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
"
        >
          {latestPosts?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      </div>
      <div className="max-w-contained mx-auto p-6 md:p-12">
        <div className="flex justify-between items-center mb-20 ">
          <h2 className="text-5xl font-bold mb-6 flex items-center font-raleway pl-4">
            Popular Posts
          </h2>
          <div className="flex items-center pr-12">
            <Link to={"/blog"}>
              <button className="text-white border bg-primary border-primary py-4 px-12 rounded-lg font-roboto font-bold text-[14px] ">
                View All
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-auto">
          {popularPosts?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PostsView;
