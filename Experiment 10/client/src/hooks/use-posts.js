import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "../../../shared/routes";

export function usePosts() {
  return useQuery({
    queryKey: [api.posts.list.path],
    queryFn: async () => {
      const res = await fetch(api.posts.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch posts");
      return api.posts.list.responses[200].parse(await res.json());
    }
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(api.posts.create.path, {
        method: api.posts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include"
      });

      if (!res.ok) throw new Error("Failed to create post");
      return api.posts.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.posts.list.path] });
    },
    onError: () => {
      console.error("Failed to create post");
    }
  });
}

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId) => {
      const url = buildUrl(api.posts.like.path, { id: postId });
      const res = await fetch(url, {
        method: api.posts.like.method,
        credentials: "include"
      });

      if (!res.ok) throw new Error("Failed to like post");
      return api.posts.like.responses[200].parse(await res.json());
    },
    onMutate: async (postId) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: [api.posts.list.path] });
      const previousPosts = queryClient.getQueryData([api.posts.list.path]);

      if (previousPosts) {
        queryClient.setQueryData(
          [api.posts.list.path],
          previousPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
          )
        );
      }
      return { previousPosts };
    },
    onError: (err, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData([api.posts.list.path], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [api.posts.list.path] });
    }
  });
}