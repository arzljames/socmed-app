import { NextRouter } from "next/router";

// Refresh fetched data from SSR
const useRefreshData = (router: NextRouter) => {
  return router.replace(router.asPath);
};

export default useRefreshData;
