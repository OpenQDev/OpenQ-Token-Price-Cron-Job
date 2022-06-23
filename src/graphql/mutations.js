const UPDATE_PRICES = `
	mutation Mutation($priceObj: JSON) {
		updatePrices(priceObj: $priceObj) {
			timestamp
		priceObj
		}
	}
`;

const GET_ALL_BOUNTIES = `
	query GetAllIssues($sortOrder: String!, $skip: Int!, $quantity: Int!) {
		bounties(skip: $skip, sortOrder: $sortOrder, quantity: $quantity) {
			bountyAddress
			bountyId
			organization {
				id
			}
			bountyTokenBalances {
				volume
				tokenAddress
			}
		}
	}
`;

const UPDATE_BOUNTY_TVL = `
	mutation Mutation(
		$address: String!
		$tvl: Float!
		$organizationId: String!
	) {
		updateBounty(
			address: $address
			tvl: $tvl
			organizationId: $organizationId
		) {
			address
		}
	}
`;

module.exports = { UPDATE_PRICES, UPDATE_BOUNTY_TVL, GET_ALL_BOUNTIES };