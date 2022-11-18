const { getAddress } = require('@ethersproject/address');

const calculateTvl = require('./calculateTvl');
const getIssues = require('./getIssues');
const getTokenMetadata = require('./utils/getTokenMetadata');

/**
 * 
 * @param {Array of bounties} bounties 
 * @param {Array of token addresses used to fund any bounty} pricingMetadata 
 * @returns 
 * @devnote Coingecko returns address-indexed prices using lower-case addresses
 * @description Returns the formatted parameters for updating TVL and category for each bounty in the OpenQ-API 
 */
const getContractParameters = async (bounties, pricingMetadata, data, environment) => {
	const tokenMetadata = getTokenMetadata(environment);
	const bountyIds = bounties.map(bounty => {
		return bounty.bountyId;
	});
	const getCategory = (labels) => {
		if (labels?.includes("non-profit")) {
			return "non-profit";
		}
		return undefined;
	};

	// TODO: 
	const { indexedGithubIssues, repositoryId } = await getIssues(bountyIds);
	console.log('repositoryId', repositoryId);
	//filters for closed
	const tvls = bounties.filter((bounty) => { return bounty.status === "0" || bounty.bountyType !== "0"; })
		.map((bounty) => {
			const tvl = calculateTvl(bounty, tokenMetadata, data);
			const labels = indexedGithubIssues[bounty.bountyId];
			// TODO:How to get this repositoryId to the bountyUpdater?
			console.log('indexedGithubIssues[bounty.bountyId] keys', JSON.stringify(indexedGithubIssues[bounty.bountyId]));
			const repositoryId = repositoryId[bounty.bountyId];
			const category = getCategory(labels, bounty.bountyType);
			return {
				address: bounty.bountyAddress,
				bountyId: bounty.bountyId,
				type: bounty.bountyType,
				category,
				tvl,
				organizationId: bounty.organization.id,
				repositoryId
			};
		});
	return tvls;
};

module.exports = getContractParameters;