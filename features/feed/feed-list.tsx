import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useUserData from "../../hooks/useUserData";
import { getPosts } from "../../utils/api/api";
import _ from "lodash";
import Feed from "../../components/card/feed";

const FeedList = ({ data }: any) => {
  const { user, token } = useUserData() as any;
  const [meta, setMeta] = useState(data?.meta);
  const [posts, setPosts] = useState(data.data);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setHasMore(meta.page < meta.pages);
  }, [posts]);

  const getMorePost = async () => {
    const newPosts = await getPosts(token, 10, posts?.length);
    setMeta(newPosts?.meta);
    setPosts([...posts, ...newPosts?.data]);
  };
  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={data.data.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
        scrollableTarget="scrollable"
      >
        {_.map(posts, (item: any, index: number) => {
          return <Feed key={index} data={item} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default FeedList;
