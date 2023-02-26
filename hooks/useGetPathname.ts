import { useRouter } from "next/router";

const useGetPathname = () => {
  const router = useRouter();
  return router.asPath;
};

export default useGetPathname;
