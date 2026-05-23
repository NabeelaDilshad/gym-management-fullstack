export type DateFormat = "short" | "long";

export function formatDate(
  dateString: string,
  format: DateFormat = "short"
): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions =
    format === "long"
      ? {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      : {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        };

  return date.toLocaleDateString("en-GB", options);
}
// utils/dateFormat.ts

export const formatInputDate = (dateString: string): string => {
  if (!dateString) return "";

  return new Date(dateString).toISOString().split("T")[0];
};

// // Usage
// console.log(formatDate("2026-05-05T18:30:00.000Z"));
// // 06/05/2026

// console.log(formatDate("2026-05-05T18:30:00.000Z", "long"));
// // 06 May 2026