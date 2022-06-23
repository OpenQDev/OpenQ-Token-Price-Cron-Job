const { getAddress } = require('@ethersproject/address');

const calculateTvl = require('./calculateTvl');
const getTokenMetadata = require('./utils/getTokenMetadata');

/**
 * 
 * @param {Array of bounties} bounties 
 * @param {Array of token addresses used to fund any bounty} pricingMetadata 
 * @returns 
 * @devnote Coingecko returns address-indexed prices using lower-case addresses
 * @description Returns the formatted parameters for updating TVL for each bounty in the OpenQ-API
 */
const getTokenValues = async (bounties, pricingMetadata, data, environment) => {
	const tokenMetadata = getTokenMetadata(environment);
	const tvls = bounties.map((bounty) => {
		const tvl = calculateTvl(bounty, tokenMetadata, data);
		return {
			address: bounty.address,
			tvl,
			organizationId: bounty.organization.id,
		};
	});
	return tvls;
};

module.exports = getTokenValues;