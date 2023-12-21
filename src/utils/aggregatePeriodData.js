/**
 * Aggregates log data for a specified period, calculating total clicks, views, and unique sessions for each day.
 * @param {Array<Array<Object>>} resultData - An array of arrays containing log data for each session.
 * @returns {Array<Object>} An array of objects with aggregated daily statistics, including clicks, views, and unique sessions for each day.
 */
export const aggregatePeriodData = (resultData) => {
  const dailyStats = {};

  resultData.forEach((arr) => {
    arr.forEach((row) => {
      if (!row.session) return

      const date = row.day;

      if (!dailyStats[date]) {
        dailyStats[date] = {
          clicks: 0,
          views: 0,
          uniqueSessions: new Set(),
        };
      }

      dailyStats[date].clicks += +row.ad_click;
      dailyStats[date].views += +row.view;
      dailyStats[date].uniqueSessions.add(row.session);
    });
  });

  // Convert the aggregated data to the desired array format
  const resultArray = Object.entries(dailyStats).map(([date, stats]) => ({
    date,
    clicks: stats.clicks,
    views: stats.views,
    uniqueSessions: stats.uniqueSessions.size,
  }));

  return resultArray;
};
