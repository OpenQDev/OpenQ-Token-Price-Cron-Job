const getAllBounties = async (pricingMetadata = pricingMetadata, bounties) => {
	// axios
	const batch = await getBounties('asc', 0, 100);
	// Filter out any GitHub Id's that are not Issues (e.g. Pull Requests)
	const filteredBounties = filterNonIssues(batch);
	pricingMetadata = populatePricingMetadata(filteredBounties, process.env.DEPLOY_ENV);

	bounties.push(...filteredBounties);


	if (batch === 100) {
		await getAllBounties(pricingMetadata, bounties);
	}
	return { pricingMetadata, bounties };

};

module.exports = getAllBounties;