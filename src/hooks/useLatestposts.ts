import usePosts from "./useposts";
import type { Post } from "../lib/types";

const useLatestPosts = () => {
  const { posts } = usePosts();

  const getLatestPosts = (posts: Post[], limit: number): Post[] => {
    return [...posts] // clone array to avoid mutation
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  };

  const getPopularPosts = (posts: Post[], limit: number): Post[] => {
    return [...posts].sort((a, b) => b.views - a.views).slice(0, limit);
  };

  const latestPosts = getLatestPosts(posts ?? [], 3);
  const popularPosts = getPopularPosts(posts ?? [], 6);

  return {
    latestPosts,
    popularPosts,
  };
};

export default useLatestPosts;
