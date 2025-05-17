import usePosts from "./useposts";
import type { Post } from "../lib/types";

const useLatestPosts = () => {
  const { posts } = usePosts();
  const parseDate = (dateString: string): Date => new Date(dateString);

  const getLatestPosts = (posts: Post[], limit: number): Post[] => {
    return posts
      .sort(
        (a, b) =>
          parseDate(b.publishedAt).getTime() -
          parseDate(a.publishedAt).getTime()
      )
      .slice(0, limit);
  };
  const getPopularPosts = (posts: Post[], limit: number): Post[] => {
    return posts.sort((a, b) => b.views - a.views).slice(0, limit);
  };

  const latestPosts = getLatestPosts(posts ?? [], 3);
  const popularPosts = getPopularPosts(posts ?? [], 6);

  return {
    latestPosts,
    popularPosts,
  };
};

export default useLatestPosts;
