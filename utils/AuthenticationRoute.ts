export const AuthenticationRoute = () => {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};
