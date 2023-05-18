import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { searchQuery } from "../../utils/api/api";
import _ from "lodash";
import useUserData from "../../hooks/useUserData";
import { IoSearch } from "react-icons/io5";
import OtherProfileAvatar from "../../components/avatar/user-avatar";

const SearchUsersList = ({ searchKey }: { searchKey: string }) => {
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [result, setResult] = useState<any>({});
  const { token } = useUserData() as { token: string };

  const handleSearch = async () => {
    const res = await searchQuery(token, 10, 0, searchKey);
    if (res) {
      setResult(res);
    }
    return res;
  };

  useEffect(() => {
    handleSearch();
  }, [searchKey]);

  // triggers infinite-scroll if there's still item to fetch
  // false by default
  useEffect(() => {
    setHasMore(result?.meta?.page < result?.meta?.pages);
  }, [result?.meta]);

  const getMoreResult = async () => {
    const newResult = await searchQuery(token, 10, result?.data?.length);
    if (newResult) {
      setResult({
        meta: newResult?.meta,
        data: [...result?.data, ...newResult?.data],
      });
    }
  };
  return (
    <div className="absolute top-[110%] h-auto  w-full  rounded-lg  border bg-white shadow-md">
      <div>
        {!searchKey && (
          <div className="flex items-center p-2">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-color-main text-white">
              <IoSearch />
            </div>
            <p className="text-sm font-light text-text-main">Type to search</p>
          </div>
        )}
      </div>

      {searchKey && (
        <>
          <div id="scrollable" className="overflow-y-scroll">
            <InfiniteScroll
              dataLength={result.data?.length | 0}
              next={getMoreResult}
              hasMore={hasMore}
              loader={
                <div className="flex w-full flex-col items-center">wew</div>
              }
              scrollableTarget="scrollable"
            >
              {_.map(result.data, (item: any, index: number) => {
                return (
                  <div className="sticky bottom-0 flex h-11 items-center py-2 pl-2">
                    <div className="flex h-full w-full items-center rounded-md hover:bg-slate-100">
                      <OtherProfileAvatar
                        initials={item.initials}
                        profile_color={item.profile_color}
                        profile_picture={item?.profile_photo}
                        w="w-6"
                        h="h-6"
                        ts="text-sm"
                      />
                      <div>
                        <p className="text-sm font-medium text-text-main">
                          {item.full_name}
                        </p>
                        <p className="text-xs text-text-sub">
                          {item.followers?.length || 0} Followers
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
            <div className="sticky bottom-0 flex h-10 items-center  px-2">
              <div className="flex items-center">
                <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-color-main text-white">
                  <IoSearch />
                </div>
                <p className="text-sm font-light text-text-main">
                  Search for <b>{searchKey}</b>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchUsersList;
