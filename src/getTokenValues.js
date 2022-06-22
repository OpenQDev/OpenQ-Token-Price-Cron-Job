const calculateTvl = require('./addTokenBalanceToTotal');
const { getAddress } = require('@ethersproject/address');
const getMetadata = require('./utils/getMetadata');

/**
 * 
 * @param {Array of bounties} bounties 
 * @param {Array of token addresses used to fund any bounty} pricingMetadata 
 * @returns 
 * @devnote Coingecko returns address-indexed prices using lower-case addresses
 * @description Returns the formatted parameters for updating TVL for each bounty in the OpenQ-API
 */
const getTokenValues = async (bounties, pricingMetadata, data, environment) => {
	const tokenMetadata = getMetadata(environment);
	const tvls = bounties.map((bounty) => {
		const tvl = calculateTvl(bounty, tokenMetadata);
		return {
			address: bounty.bountyAddress,
			tvl,
			organizationId: bounty.organization.id,
		};
	});
	return tvls;
};

module.exports = getTokenValues;