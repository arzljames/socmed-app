import React, { ReactElement } from "react";
import { TailSpin } from "react-loader-spinner";

const CustomLoader = ({
  h = "80",
  w = "80",
  c = "#4fa94d",
  m,
}: {
  h?: string;
  w?: string;
  c?: string;
  m?: string;
}): ReactElement => {
  return (
    <div className={m}>
      <TailSpin
        height={h}
        width={w}
        color={c}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default CustomLoader;
