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
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["categories", postData?.categoryId],
    enabled: !!postData?.categoryId,
    queryFn: async () =>
      (await API.get<Category>(`/categories/${postData?.categoryId}`)).data,
  });

  return {
    post: postData,
    category: categoryData,
    loading: postLoading || categoryLoading,
    error: postError || categoryError,
  };
};

export default useSinglePost;
