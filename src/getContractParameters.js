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

	// @FlagoJones: why does getIssues return two objects indexed by bountyId?

	const startAt = 0

const skip = 100
const recursivelyGetIssues = async (startAt, skip, previouslyIndexedGithubIssues, previousRepositoryIds) => {
	const { indexedGithubIssues, repositoryIds } = await getIssues(bountyIds, startAt, skip);
	
	const newIndexedGithubIssues = { ...previouslyIndexedGithubIssues, ...indexedGithubIssues };
	const newRepositoryIds = { ...previousRepositoryIds, ...repositoryIds };
	if (Object.keys(indexedGithubIssues).length === 100) {
		return await recursivelyGetIssues(startAt + skip, skip, newIndexedGithubIssues, newRepositoryIds);
	}
	return { indexedGithubIssues: newIndexedGithubIssues, repositoryIds: newRepositoryIds };
};
	const { indexedGithubIssues, repositoryIds } = await recursivelyGetIssues(startAt, skip, {}, {});
	
	//filters for closed
	const tvls = bounties
		.map((bounty) => {
			const tvl = calculateTvl(bounty, tokenMetadata, data);
			const labels = indexedGithubIssues[bounty.bountyId];
			const repositoryId = repositoryIds[bounty.bountyId];
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