import { useState, useEffect } from "react";
import usePosts from "./useposts";
import type { Post } from "../lib/types";

type PostWithCategory = Post & { categoryName?: string };

const useSinglePost = (id: string | number | undefined) => {
  const { posts, loading: postsLoading, error: postsError } = usePosts();
  const [post, setPost] = useState<PostWithCategory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setPost(null);
      return;
    }

    const findPostAndFetchCategory = async () => {
      setLoading(true);
      setError(null);

      try {
        const foundPost = posts?.find((p) => p.id.toString() === id.toString());

        if (!foundPost) {
          setPost(null);
          setLoading(false);
          return;
        }

        let categoryName = foundPost.categoryName ?? "";

        setPost({ ...foundPost, categoryName });
      } catch (err: any) {
        setError(err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (!postsLoading && !postsError) {
      findPostAndFetchCategory();
    }
  }, [id, posts, postsLoading, postsError]);

  return { post, loading: loading || postsLoading, error: error || postsError };
};

export default useSinglePost;
