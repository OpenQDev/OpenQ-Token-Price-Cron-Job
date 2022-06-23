const populatePricingMetadata = require('./populatePricingMetadata');
const filterNonIssues = require('./utils/filterNonIssues');
const getBounties = require('./getBounties');

/**
 * 
 * @param {Array of metadata only for the token addresses present on bounties} pricingMetadata 
 * @param {Bounties, filtered to only issues} bounties 
 * @returns 
 * Recursive paginated function
 */
const getAllBounties = async (pricingMetadata = pricingMetadata, bounties, environment) => {
	const batch = await getBuounties('asc', 0, 100);
	// Filter out any GitHub Id's that are not Issues (e.g. Pull Requests)
	const filteredBounties = filterNonIssues(batch);
	pricingMetadata = populatePricingMetadata(filteredBounties, environment);

	bounties.push(...filteredBounties);

	if (batch === 100) {
		await getAllBounties(pricingMetadata, bounties);
	}

	return { pricingMetadata, bounties };
};

module.exports = getAllBounties;