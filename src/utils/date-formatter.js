import dayjs from "dayjs";

export const dateFormatter = (value, format = 'MMM D, YYYY') => {
  return value ? dayjs(value).format(format) : '-';
};
