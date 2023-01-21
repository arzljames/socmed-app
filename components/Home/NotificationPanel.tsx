import { ReactElement, MutableRefObject } from "react";
import TextHeading from "../Custom/Text/TextHeading";
import TextSubHeadingMed from "../Custom/Text/TextSubHeadingMed";

const NotificationPanel = ({ ref }: any): ReactElement => {
  return (
    <div
      ref={ref}
      className="absolute  top-[100%] right-0 h-[85vh] w-full overflow-y-scroll border bg-white shadow-xl  md:right-[13%] md:top-[64px] md:max-w-sm md:rounded-lg"
    >
      <div className="sticky top-0 flex h-12 w-full items-center justify-between bg-white px-3">
        <TextHeading>Notifications</TextHeading>
        <p className="cursor-pointer text-xs font-medium text-color-main hover:underline">
          Mark all as read
        </p>
      </div>
      <TextSubHeadingMed>Today</TextSubHeadingMed>
    </div>
  );
};

export default NotificationPanel;
