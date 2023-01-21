import { ReactElement } from "react";
import { Rings } from "react-loader-spinner";

const LoginLoader = (): ReactElement => {
  return (
    <Rings
      height="80"
      width="80"
      color="#629AEF"
      radius="6"
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};

export default LoginLoader;
