import usePosts from "./useposts";
import { useAuth } from "../firebase/auth";
import { useMemo } from "react";

export const useUserPosts = () => {
  const { posts, loading } = usePosts();
  const { user } = useAuth();

  const userPosts = useMemo(() => {
    if (!user?.uid) return [];
    return posts?.filter((post) => post.authorUid === user.uid);
  }, [posts, user?.uid]);

  return { userPosts, loading };
};
