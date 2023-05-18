import _ from "lodash";
const FormatTime = (date: Date) => {
  if (date) {
    const newDate = new Date(date);

    let hours = newDate.getHours();
    let minutes: number | string = newDate.getMinutes();
    const dayIndicator: string = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const finalHr = hours > 9 ? hours : _.toString("0" + hours);
    const finalTime = finalHr + ":" + minutes + " " + dayIndicator;

    return finalTime;
  }
  return;
};

export default FormatTime;
