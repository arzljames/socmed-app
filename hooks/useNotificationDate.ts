import React from "react";

const useNotificationDate = (date: string): Date | string | number => {
  const todayDate = new Date();
  const compareDate = new Date(date);

  if (todayDate.getDate() - 1 === compareDate.getDate()) {
    return "Today";
  } else if (todayDate.getDate() - 2 === compareDate.getDate()) {
    return "Yesterday";
  } else {
    return date;
  }
};

export default useNotificationDate;
