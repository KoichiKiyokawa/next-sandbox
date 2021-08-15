export const formatYYYYMMDD = (date: Date, separator: string = "-") =>
  `${date.getFullYear()}${separator}${String(date.getMonth() + 1).padStart(2, "0")}${separator}${String(
    date.getDate()
  ).padStart(2, "0")}`;
