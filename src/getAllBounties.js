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
const getAllBounties = async (pricingMetadata = pricingMetadata, bounties=[], environment, batchSize, startAt=0) => {
	const batch = await getBounties('asc', startAt, batchSize);
	// Filter out any GitHub Id's that are not Issues (e.g. Pull Requests)
	const filteredBounties = filterNonIssues(batch);

	bounties.push(...filteredBounties);

	if (batch.length === 100) {
		return  await getAllBounties(pricingMetadata, bounties, environment, batchSize, startAt+batchSize);
	}

	pricingMetadata = populatePricingMetadata(bounties, environment);
	console.log(pricingMetadata)
	return { pricingMetadata, bounties };
};

module.exports = getAllBounties;