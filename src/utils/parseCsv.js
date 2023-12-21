import papa from "papaparse";

/**
 * Parses CSV data, cleaning and converting it to a structured array using PapaParse.
 * @param {string} csvData - The raw CSV data to be parsed.
 * @returns {Promise<Array<Object>>} A promise resolving to an array of objects representing the parsed CSV data.
 */
export const parseCsv = (csvData) => {
  const cleanedCsvData = csvData.replace(/[;"]/g, "");

  return new Promise((resolve, reject) => {
    papa.parse(cleanedCsvData, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error.message);
      },
    });
  });
};
