import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../firebase/auth";
import type { Post } from "../lib/types";

type Category = {
  id: string;
  name: string;
};

export const useUserPosts = (refreshKey: number = 0) => {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setUserPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchUserPostsAndCategories = async () => {
      try {
        // Fetch categories
        const catSnapshot = await getDocs(collection(db, "categories"));
        const categories: Category[] = catSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { name: string }),
        }));

        // Fetch posts by user
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("authorUid", "==", user.uid));
        const postSnapshot = await getDocs(q);

        const posts: Post[] = postSnapshot.docs.map((doc) => {
          const data = doc.data() as Post;
          const category = categories.find((c) => c.id === data.categoryId);
          return {
            ...data,
            id: doc.id,
            categoryName: category?.name || "Unknown",
          };
        });

        setUserPosts(posts);
      } catch (error) {
        console.error("Failed to fetch posts or categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPostsAndCategories();
  }, [user?.uid, refreshKey]);

  return { userPosts, loading };
};
