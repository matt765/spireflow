import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export const convertToCSV = <T extends object>(arr: T[]): string => {
  const headers = Object.keys(arr[0]).map(capitalizeFirstLetter);

  const data = arr.map((row) => {
    return Object.values(row).map((value) => {
      return typeof value === "string" && value.includes(",")
        ? `"${value}"`
        : value?.toString() ?? "";
    });
  });

  const array = [headers].concat(data);

  return array.map((row) => row.join(",")).join("\n");
};

export const exportToCSV = <T extends object>(data: T[], filename: string) => {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
