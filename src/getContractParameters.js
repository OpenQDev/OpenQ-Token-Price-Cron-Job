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
		if (labels?.includes("not for profit")) {
			return "not for profit";
		}
		return undefined;
	};		

	const indexedGithubIssues = await getIssues(bountyIds);
	const tvls = bounties.map((bounty) => {
		const tvl = calculateTvl(bounty, tokenMetadata, data);
		console.log(indexedGithubIssues, bounty.bountyId)
		const labels = indexedGithubIssues[bounty.bountyId];
		const category =  getCategory(labels, bounty.bountyType);
		return {
			address: bounty.bountyAddress,
			bountyId: bounty.bountyId,
			type: bounty.bountyType,
			category,
			tvl,
			organizationId: bounty.organization.id,
		};
	});
	return tvls;
};

module.exports = getContractParameters;