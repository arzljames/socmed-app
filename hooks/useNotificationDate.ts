import React from "react";

const useNotificationDate = (date: string): string => {
  const todayDate = new Date();
  const compareDate = new Date(date);
  const completeDate =
    compareDate.toLocaleDateString("en-US", { month: "short" }) +
    " " +
    compareDate.getDate();

  if (todayDate.getDate() === compareDate.getDate()) {
    return "Today";
  } else if (todayDate.getDate() - 1 === compareDate.getDate()) {
    return "Yesterday";
  } else {
    return completeDate;
  }
};

export default useNotificationDate;
