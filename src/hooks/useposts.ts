import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { Post, Category } from "../lib/types";

const parseDate = (date: any): Date => {
  if (date?.toDate && typeof date.toDate === "function") {
    return date.toDate();
  } else if (typeof date === "string") {
    return new Date(date);
  } else if (date instanceof Date) {
    return date;
  }
  return new Date(0); // fallback to epoch if invalid
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const usePosts = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const categoriesSnap = await getDocs(collection(db, "categories"));
        const categoriesData: Category[] = categoriesSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Category, "id">),
        }));
        setCategories(categoriesData);

        // Fetch posts WITHOUT ordering
        const postsSnap = await getDocs(collection(db, "posts"));

        const postsData: Post[] = postsSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            content: data.content,
            categoryId: data.categoryId,
            authorId: data.authorId,
            authorUid: data.authorUid,
            images: data.images,
            views: data.views,
            createdAt: formatDate(data.createdAt),
            _rawDate: data.createdAt,
          };
        });

        // Sort locally by date descending
        postsData.sort((a, b) => {
          const dateA = parseDate(a.createdAt);
          const dateB = parseDate(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });

        // Map category names
        const postsWithCategoryNames = postsData.map((post) => {
          const category = categoriesData.find(
            (cat) => cat.id.toString() === post.categoryId?.toString()
          );
          return {
            ...post,
            categoryName: category?.name || "Unknown Category",
          };
        });

        setPosts(postsWithCategoryNames);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    posts,
    categories,
    loading,
    error,
    recentPost: posts ? posts[0] : null,
  };
};

export default usePosts;
