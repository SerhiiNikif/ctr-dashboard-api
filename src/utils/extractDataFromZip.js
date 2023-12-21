import AdmZip from "adm-zip";

import { parseCsv } from "./parseCsv.js";

/**
 * Extracts data from CSV files within a ZIP archive based on specified date range.
 * @param {string} filePath - The path to the ZIP archive.
 * @param {string} csvFolder - The folder containing CSV files within the ZIP archive.
 * @param {string} fromDate - The start date of the period to extract data (YYYY-MM-DD format).
 * @param {string} toDate - The end date of the period to extract data (optional, YYYY-MM-DD format).
 * @returns {Array<Array<Object>>} An array of arrays representing parsed data from CSV files.
 */
export const extractDataFromZip = async (
  filePath,
  csvFolder,
  fromDate,
  toDate
) => {
  const zip = new AdmZip(filePath);
  const zipEntries = zip.getEntries();
  const resultData = [];

  for (const entry of zipEntries) {
    const entryName = entry.name;

    // Determine if the entry's date matches the specified date range.
    const selectedDate = !toDate
      ? entryName.includes(`_${fromDate}_`)
      : entryName.split("_").find((date) => date >= fromDate && date <= toDate);

    // // Check if the entry is a CSV file, is within the specified folder, and matches the date range.
    if (
      selectedDate &&
      entryName.endsWith(".csv") &&
      entry.entryName.startsWith(`${csvFolder}sessions_`)
    ) {
      const csvData = entry.getData().toString("utf8");
      const parsedRows = await parseCsv(csvData);
      resultData.push(parsedRows);
    }
  }

  return resultData;
};
