import { useQuery } from "@tanstack/react-query";
import { API } from "../lib/axios";

// Define Post and Category types
interface Post {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  authorId: number;
  image: string;
  publishedAt: string;
  views: number;
}

interface Category {
  id: number;
  name: string;
}

const usePosts = () => {
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => API.get<Post[]>("/posts"), // Fetching posts
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => API.get<Category[]>("/categories"), // Fetching categories
  });

  if (postsLoading || categoriesLoading) {
    return { postLoading: true, categoryLoading: true };
  }

  if (postsError || categoriesError) {
    return { postError: postsError, categoryError: categoriesError };
  }

  // Debugging: Log the posts and categories
  console.log("Posts:", posts?.data);
  console.log("Categories:", categories?.data);

  // Combine posts with category names
  const postsWithCategoryNames = posts?.data?.map((post) => {
    const category = categories?.data?.find(
      (category) => Number(category.id) === Number(post.categoryId)
    );
    if (!category) {
      console.warn(
        `Category not found for post ID ${post.id}, categoryId ${post.categoryId}`
      );
    }
    return {
      ...post,
      categoryName: category?.name || "Unknown Category", // Fallback if category is not found
    };
  });

  // Sort posts by publishedAt
  const sortedPosts = postsWithCategoryNames?.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const recentPost = sortedPosts?.[0];

  return {
    posts: sortedPosts,
    postLoading: postsLoading,
    postError: postsError,
    recentPost,
  };
};

export default usePosts;
