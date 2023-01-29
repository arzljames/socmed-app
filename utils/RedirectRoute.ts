export const RedirectRoute = () => {
  return {
    props: {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    },
  };
};
