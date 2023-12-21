import moment from "moment";

import { extractDataFromZip } from "../utils/extractDataFromZip.js";
import { aggregateCampaignData } from "../utils/aggregateCampaignData.js";
import { aggregatePeriodData } from "../utils/aggregatePeriodData.js";
import { calculateCTR } from "../utils/calculateCTR.js";
import ApiError from "../exceptions/api-error.js";

class LogService {
  /**
   * Retrieves log data for a specific day and calculates click-through rates (CTR) for campaigns.
   * @async
   * @method
   * @param {string} date - The date for which log data is to be retrieved.
   * @returns {Array<Object>} An array of objects containing campaign and calculated click-through rates (CTR).
   * Each object has the properties:
   * - campaign: The name of the campaign.
   * - ctr: The calculated click-through rate (CTR) for the campaign.
   * @throws {ApiError} Throws an error if the date is in an incorrect format or no data is found.
   */
  async dataPerDay(date) {
    const filePath = `./src/data/events.zip`;
    const csvFolder = "events/";

    const format = "YYYY-MM-DD";
    const isValideDate = moment(date, [format], true).isValid();
    if (!isValideDate) throw ApiError.BadRequest("Incorrect date format");
    const selectedDate = moment(date, format).format(format);

    const resultData = await extractDataFromZip(
      filePath,
      csvFolder,
      selectedDate
    );

    if (resultData.length === 0) {
      throw ApiError.NotFoundError("No data found for the specified date.");
    }

    const campaigns = aggregateCampaignData(resultData);
    return calculateCTR(campaigns);
  }

  /**
   * Retrieves log data for a specified period and aggregates the data.
   * @async
   * @method
   * @param {string} from - The start date of the period.
   * @param {string} to - The end date of the period.
   * @returns {Array<Object>} An array of objects containing aggregated daily statistics for each day within the specified period.
   * Each object includes the date, total clicks, total views, and the count of unique sessions.
   * @throws {ApiError} Throws an error if the date range is in an incorrect format or no data is found.
   */
  async dataForPeriod(from, to) {
    const filePath = `./src/data/events.zip`;
    const csvFolder = "events/";

    const format = "YYYY-MM-DD";
    const isValideDateFrom = moment(from, [format], true).isValid();
    const isValideDateTo = moment(to, [format], true).isValid();
    if (!isValideDateFrom || !isValideDateTo)
      throw ApiError.BadRequest("Incorrect date format");

    const fromDate = moment(from, format).format(format);
    const toDate = moment(to, format).format(format);

    const resultData = await extractDataFromZip(
      filePath,
      csvFolder,
      fromDate,
      toDate
    );

    if (resultData.length === 0) {
      throw ApiError.NotFoundError("No data found for the specified period.");
    }

    return aggregatePeriodData(resultData);
  }
}

export default new LogService();
