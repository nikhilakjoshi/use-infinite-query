import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Cards = () => {
  const [inViewRef, inView] = useInView();
  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<Post[], Error, InfiniteData<Post[]>, string[], number>({
      initialPageParam: 0,
      getNextPageParam: (_, __, lastPageParam) => {
        return lastPageParam + 10;
      },
      queryKey: ["cards"],
      queryFn: async ({ pageParam }) => {
        //add a delay to simulate a slow network
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_start=${pageParam}&_limit=10`
        );
        const data = (await response.json()) as Post[];
        return data;
      },
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  console.log({
    isFetching,
    isFetchingNextPage,
  });

  return (
    <React.Fragment>
      <div className="grow grid grid-cols-2 p-4 gap-4 pt-24 bg-gray-50">
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-lg shadow-sm border relative"
              >
                <h1 className="text-xl font-semibold">{post.title}</h1>
                <p className="text-gray-500">{post.body}</p>
                <p className="absolute bottom-3 right-3">{post.id}</p>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {(isFetching || isFetchingNextPage) && (
        <div className="fixed inset-0 bg-white bg-opacity-50 grid place-items-center z-50">
          <pre>loading...</pre>
        </div>
      )}
      <div
        ref={inViewRef}
        className="p-4 w-screen bg-green-400 text-white mt-auto bottom-0 left-0"
      >
        <pre>use React Intersection Observer to trigger fetching next page</pre>
      </div>
    </React.Fragment>
  );
};

export default Cards;
