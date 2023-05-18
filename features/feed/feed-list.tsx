import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPosts } from "../../utils/api/api";
import _ from "lodash";
import Feed from "../../components/card/feed";
import useUserData from "../../hooks/useUserData";
import FeedSkeletal from "../../components/skeletal/feed-skeletal";

const FeedList = () => {
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { token, posts, setPosts, isFetching, isLoading } = useUserData() as {
    token: string;
    posts: any;
    setPosts: any;
    isFetching: boolean;
    isLoading: any;
  };

  // triggers infinite-scroll if there's still item to fetch
  // false by default
  useEffect(() => {
    setHasMore(posts?.meta?.page < posts?.meta?.pages);
  }, [posts?.meta]);

  const getMorePost = async () => {
    const newPosts = await getPosts(token, 10, posts?.data?.length);
    if (newPosts) {
      setPosts({
        meta: newPosts?.meta,
        data: [...posts?.data, ...newPosts?.data],
      });
    }
  };

  if (isFetching && _.isEmpty(posts?.data)) return <FeedSkeletal />;

  if (_.isEmpty(posts?.data) && !isFetching) {
    return (
      <div className="my-10 flex flex-col items-center justify-center">
        <img className="w-60" src="/empty.svg" alt="empty" />
        <p className="text-center text-sm font-light text-text-sub">
          It's empty. Nothing to show from your feed
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={posts.data?.length | 0}
        next={getMorePost}
        hasMore={hasMore}
        loader={
          <div className="flex w-full flex-col items-center">
            <FeedSkeletal />
          </div>
        }
        endMessage={
          posts?.data?.length >= 5 ? (
            <p className="mb-8 mt-4 flex justify-center text-sm font-light text-text-sub">
              End of feed. No more data to show
            </p>
          ) : null
        }
        scrollableTarget="scrollable"
      >
        {_.map(posts.data, (item: any, index: number) => {
          return <Feed key={index} data={item} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default FeedList;
