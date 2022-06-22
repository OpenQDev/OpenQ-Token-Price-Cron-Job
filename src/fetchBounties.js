const getBounties = require("./getBounties");
const filterNonIssues = require('./utils/filterNonIssues');

// Same as in OpenQSubgraphClient
const fetchBounties = async () => {
	const bounties = [];
	const pricingMetadata = [];



	// Recursive function in case we need multiple pages of bounties.
	const getAllBounties = async () => {
		const batch = await getBounties('asc', 0, 100);
		// Filter out any GitHub Id's that are not Issues (e.g. Pull Requests)
		const filteredBounties = filterNonIssues(batch);

		batch.forEach((bounty) => {
			bounty.bountyTokenBalances.forEach((bountyTokenBalance) => {
				const foo = !pricingMetadata.includes(bountyTokenBalance.tokenAddress) && tokenMetadata[getAddress(bountyTokenBalance.tokenAddress)];
				if (foo) {
					pricingMetadata.push(
						tokenMetadata[
						getAddress(
							bountyTokenBalance.tokenAddress
						)
						]
					);
				} else if (
					polygonMetadata[
					bountyTokenBalance.tokenAddress.toLowerCase()
					]
				) {
					pricingMetadata.push(
						polygonMetadata[
						bountyTokenBalance.tokenAddress.toLowerCase()
						]
					);
				}
			});
		});

		bounties.push(...batch);

		if (batch === 100) {
			await getAllBounties();
		}
	};

	await getAllBounties();

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