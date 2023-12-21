/**
 * Calculates the Click-Through Rate (CTR) for each campaign based on the provided campaigns data.
 * CTR is computed as the ratio of clicks to views, with a default of 0 if views are zero to prevent division by zero.
 * @param {Object} campaigns - An object containing aggregated data for each campaign, including clicks and views.
 * @returns {Array<Object>} An array of objects representing each campaign with its corresponding Click-Through Rate (CTR).
 */
export const calculateCTR = (campaigns) => {
  return Object.entries(campaigns).map(([campaign, { clicks, views }]) => ({
    campaign,
    ctr: views !== 0 ? clicks / views : 0,
  }));
};
