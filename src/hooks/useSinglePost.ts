import { useQuery } from "@tanstack/react-query";
import { API } from "../lib/axios";
import type { Post } from "../lib/types";

const useSinglePost = (id: number | string | undefined) => {
  const {
    data: postData,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", id],
    enabled: !!id,
    queryFn: async () =>
      (await API.get<Post>(`/posts/${id}?_expand=category`)).data,
  });

  return {
    post: postData,
    loading: postLoading,
    error: postError,
  };
};

export default useSinglePost;
