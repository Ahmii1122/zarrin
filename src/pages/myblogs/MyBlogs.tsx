import { useUserPosts } from "../../hooks/useUserPosts";
import PostCard from "../../components/PostCard";
import CardSkeleton from "../../skeleton/CardSkeleton";
import AddBlogPopup from "../../components/AddBlog";
import { useState } from "react";

const MyBlogs = () => {
  const { userPosts = [], loading } = useUserPosts();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="max-w-contained mx-auto md:px-20 mt-20 justify-items-center">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-base font-bold font-raleway text-tgray2">
            My Blogs
          </h1>
          <p className="font-bold font-raleway text-5xl mb-10">
            Find All Your Blogs Here
          </p>
        </div>
      </div>

      {loading ? (
        <div className="max-w-contained mx-auto md:px-20 mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
        </div>
      ) : userPosts.length > 0 ? (
        <div className="max-w-contained mx-auto md:px-20 mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-tgray2 text-center text-base font-roboto">
            No blogs found
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary max-w-[200px] mx-auto text-white px-4 py-2 rounded-md"
          >
            Add New Blog
          </button>
          <AddBlogPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default MyBlogs;
