const axios = require('axios');
const fetch = require('cross-fetch');
const { getAddress } = require('@ethersproject/address');
const { ApolloClient, InMemoryCache, HttpLink } = require('@apollo/client');

const UPDATE_BOUNTY = require('./graphql/updateBounty');
const CREATE_PRICES = require('./graphql/createPrices');
const GET_ALL_BOUNTIES = require('./graphql/getAllBounties');
const UPDATE_PRICES = require('./graphql/updatePrices');
const tokenMetadata = require('./constants/local.json');
const polygonMetadata = require('./constants/polygon-mainnet-indexable.json');
const openQLocalTokens = require('./constants/openq-local-enumerable.json');

const tvlClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		fetch,
		uri: `${process.env.OPENQ_API_URL}`,
	}),
});

const subGraphClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		fetch,
		uri: `${process.env.OPENQ_SUBGRAPH_HTTP_URL}`,
		defaultOptions: {
			query: {
				fetchPolicy: 'no-cache',
			},
		},
	}),
});

// Same as in OpenQSubgraphClient
const fetchBounties = async () => {
	const getBounties = async (sortOrder, startAt, quantity) => {
		try {
			const result = await subGraphClient.query({
				query: GET_ALL_BOUNTIES,
				fetchPolicy: 'no-cache',
				variables: { skip: startAt, sortOrder, quantity },
			});
			return result.data.bounties.filter(
				(bounty) =>
					bounty.bountyId.slice(0, 1) === 'I' ||
					bounty.bountyId.slice(0, 1) === 'M'
			);
		} catch (e) {
			console.log(e);
		}
		return [];
	};

	const bounties = [];
	const pricingMetadata = [];

	// Recursive function in case we need multiple pages of bounties.
	const getAllBounties = async () => {
		const batch = await getBounties('asc', 0, 100);
		batch.forEach((bounty) => {
			bounty.bountyTokenBalances.forEach((bountyTokenBalance) => {
				if (
					!pricingMetadata.includes(
						bountyTokenBalance.tokenAddress
					) &&
					tokenMetadata[
					getAddress(bountyTokenBalance.tokenAddress)
					]
				) {
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
const updateTvls = async (values) => {
	const pending = [];
	for (let i = 0; i < values.length; i += 1) {
		const value = values[i];
		const address = getAddress(value.address);
		const tvl = parseFloat(value.tvl);
		const { organizationId } = value;
		const result = tvlClient.mutate({
			mutation: UPDATE_BOUNTY,
			variables: { address, tvl, organizationId },
		});
		pending.push(result);
	}
	return Promise.all(pending);
};


const indexer = async () => {
	const firstTen = openQLocalTokens.slice(0, 11).map(elem => elem.address).concat('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270');
	const network = 'polygon-pos';
	const stringifiedTokens = firstTen.join(',');
	const firstTenPrices = await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${stringifiedTokens}&vs_currencies=usd`);

	const updated = await tvlClient.mutate({
		mutation: UPDATE_PRICES,
		variables: { priceObj: firstTenPrices.data }
	});
	if (updated.data.updatePrices.count === 0) {

		await tvlClient.mutate({
			mutation: CREATE_PRICES,
			variables: { priceObj: firstTenPrices.data }
		});
	}

	try {
		const TVLS = await fetchBounties();
		await updateTvls(TVLS);
	}
	catch (err) {
		console.log('could not update bounties');
	}
};

module.exports = indexer;
