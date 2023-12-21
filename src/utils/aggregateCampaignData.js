/**
 * Aggregates campaign data, calculating the total clicks and views for each campaign.
 * @param {Array<Array<Object>>} resultData - An array of arrays containing log data for each session.
 * @returns {Object} An object with aggregated campaign data, where each campaign has the total clicks and views.
 */
export const aggregateCampaignData = (resultData) => {
  const campaigns = {};

  resultData.forEach((arr) => {
    arr.forEach((row) => {
      if (!row.session) return

      const campaign = row.campaign;

      if (!campaigns[campaign]) {
        campaigns[campaign] = {
          clicks: 0,
          views: 0,
        };
      }

      campaigns[campaign].clicks += +row.ad_click;
      campaigns[campaign].views += +row.view;
    });
  });

  return campaigns;
};
