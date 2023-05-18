import _ from "lodash";
import CustomLoader from "../../components/Custom/Loader";
const FeedSkeletal = (): JSX.Element => {
  return (
    <>
      {_.map(Array(2), (_item: any, key: number) => {
        return (
          <div
            key={key}
            className="relative z-0 mb-4 flex w-full animate-pulse flex-col rounded-xl  bg-white py-3   shadow-sm md:py-4"
          >
            <div className="flex px-3 md:px-6">
              <div
                className={`mr-2 flex  h-9 w-9 cursor-pointer items-center justify-center rounded-full `}
              >
                <div className="h-9 w-9 rounded-full bg-slate-300"></div>
              </div>

              <div className="0 mb-4 flex flex-1 flex-col ">
                <div className="mb-4 flex flex-col justify-center">
                  <div className="mb-2 h-2 w-10 rounded-full bg-slate-300"></div>
                  <div className="h-2 w-20 rounded-full bg-slate-300"></div>
                </div>
              </div>
            </div>
            <div className="mb-2  px-3 md:px-6">
              <div className="mb-3 flex h-6  w-full rounded-full bg-slate-300 px-3 md:px-6"></div>
              <div className="mb-3 flex h-3 w-3/4 rounded-full bg-slate-300 px-3 md:px-6"></div>
            </div>
          </div>
        );
      })}
      <CustomLoader h="35" w="35" m="mt-4 mb-8" c="#629AEF" />
    </>
  );
};

export default FeedSkeletal;
