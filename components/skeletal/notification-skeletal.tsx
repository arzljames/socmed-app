import React from "react";
import CustomLoader from "../Custom/Loader";
import _ from "lodash";

const NotificationSkeletal = () => {
  return (
    <div className="flex w-full flex-col items-center px-2">
      {_.map(Array(4), (_item: any, key: number) => {
        return (
          <div
            key={key}
            className="relative z-0 flex w-full  animate-pulse flex-col  border-b bg-white py-3"
          >
            <div className="flex items-center px-3 md:px-6">
              <div
                className={`mr-2 flex  h-9 w-9 cursor-pointer items-center justify-center rounded-full `}
              >
                <div className="h-9 w-9 rounded-full bg-slate-300"></div>
              </div>

              <div className="flex flex-1 flex-col justify-center  ">
                <div className="flex flex-col justify-center">
                  <div className="mb-2 h-[8px] w-10 rounded-full bg-slate-300"></div>
                  <div className="mb-2 h-3 w-full rounded-full bg-slate-300"></div>
                  <div className="h-3 w-[50%] rounded-full bg-slate-300"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <CustomLoader h="35" w="35" m="mt-4 mb-8" c="#629AEF" />
    </div>
  );
};

export default NotificationSkeletal;
