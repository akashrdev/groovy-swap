import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useInfiniteFeed = () => {
  const fn = async ({ pageParam = 1 }: { pageParam: number }) => {
    console.log("pageParam", pageParam);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}&_limit=10`
    );

    return data;
  };
  return useInfiniteQuery({
    queryKey: ["useInfiniteFeed"],
    queryFn: fn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, hasNextPage) =>
      hasNextPage ? lastPage + 1 : null
  });
};
