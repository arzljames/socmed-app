import { useRouter } from "next/router";

const useGetPathname = () => {
  const router = useRouter();
  return router.pathname;
};

export default useGetPathname;
