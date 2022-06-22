const getBounties = require("./getBounties");
const getAllBounties = require("./getAllBounties");
const filterNonIssues = require('./utils/filterNonIssues');
const openqPolygonMetadata = require("./constants/openq-polygon-mainnet-indexable.json");
const openqLocalMetadata = require("./constants/openq-local-indexable.json");
const polygonMetadata = require("./constants/polygon-mainnet-indexable.json");
const populatePricingMetadata = require("./populatePricingMetadata");
// Same as in OpenQSubgraphClient
const fetchBounties = async () => {



	// Recursive function in case we need multiple pages of bounties.
	const { pricingMetadata, bounties } = await getAllBounties([], []);

	// Get token values
	const network = 'polygon-pos';
	const url = `https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${pricingMetadata
		.map((metadata) => metadata.address)
		.join(',')}&vs_currencies=usd`;
	const { data } = await axios.get(url);
	// Attach USD values to addresses
	const tvls = bounties.map((bounty) => {
		const tvl = bounty.bountyTokenBalances.reduce(
			(accum, tokenBalance) => {
				if (!accum) {
					return tokenBalance;
				}

				const currentMetadata =
					tokenMetadata[
					getAddress(tokenBalance.tokenAddress)
					] ||
					polygonMetadata[tokenBalance.tokenAddress.toLowerCase()];

				const multiplier =
					tokenBalance.volume / 10 ** currentMetadata.decimals;
				const price = data[currentMetadata.address.toLowerCase()] || 0;
				return price.usd * multiplier + parseFloat(accum);
			},
			[0]
		);
		return {
			address: bounty.bountyAddress,
			tvl,
			organizationId: bounty.organization.id,
		};
	});

	return tvls;
};

module.exports = fetchBounties;