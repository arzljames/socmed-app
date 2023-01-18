import { NextRouter } from "next/router";

const useRefreshData = (router: NextRouter) => {
  return router.replace(router.asPath);
};

export default useRefreshData;
