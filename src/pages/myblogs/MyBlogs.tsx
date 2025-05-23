import { useUserPosts } from "../../hooks/useUserPosts";
import PostCard from "../../components/PostCard";
import CardSkeleton from "../../skeleton/CardSkeleton";
import AddBlogPopup from "../../components/AddBlog";
import { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { Post } from "../../lib/types";

const MyBlogs = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { userPosts = [], loading } = useUserPosts(refreshKey);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsOpen(true);
  };

  const handleDelete = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteDoc(doc(db, "posts", postId));
        alert("Deleted successfully!");
        setRefreshKey((prev) => prev + 1); // trigger refresh
      } catch (error) {
        alert(
          "Failed to delete blog: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
      }
    }
  };

  const handleUpdatePost = async (updatedPost: Post) => {
    try {
      const postRef = doc(db, "posts", updatedPost.id);
      await updateDoc(postRef, {
        title: updatedPost.title,
        content: updatedPost.content,
        categoryName: updatedPost.categoryName,
        images: updatedPost.images,
        // other fields if necessary
      });
      setIsOpen(false);
      setEditingPost(null);
      alert("Post updated successfully!");
      setRefreshKey((prev) => prev + 1); // trigger refresh
    } catch (error) {
      alert(
        "Failed to update post: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

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
          <button
            onClick={() => {
              setEditingPost(null);
              setIsOpen(true);
            }}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Add New Blog
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
            </div>
          ) : userPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-tgray2 text-center text-base font-roboto">
                No blogs found
              </p>
              <button
                onClick={() => {
                  setEditingPost(null);
                  setIsOpen(true);
                }}
                className="bg-primary max-w-[200px] mx-auto text-white px-4 py-2 rounded-md"
              >
                Add New Blog
              </button>
            </div>
          )}
        </div>
      </div>

      <AddBlogPopup
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingPost(null);
        }}
        postToEdit={editingPost}
        onUpdate={handleUpdatePost}
      />
    </>
  );
};

export default MyBlogs;
