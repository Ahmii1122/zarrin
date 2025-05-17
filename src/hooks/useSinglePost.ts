import { useQuery } from "@tanstack/react-query";
import { API } from "../lib/axios";
import type { Post } from "../lib/types";

interface Category {
  id: number;
  name: string;
}

const useSinglePost = (id: number | string | undefined) => {
  const {
    data: postData,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", id],
    enabled: !!id,
    queryFn: async () => (await API.get<Post>(`/posts/${id}`)).data,
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await API.get<Category[]>("/categories")).data,
  });

  const category = categoriesData?.find(
    (cat) => cat.id === postData?.categoryId
  );

  const enrichedPost = postData
    ? {
        ...postData,
        categoryName: category?.name || "Unknown Category",
      }
    : undefined;

  return {
    post: enrichedPost,
    loading: postLoading || categoriesLoading,
    error: postError || categoriesError,
  };
};

export default useSinglePost;
