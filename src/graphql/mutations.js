const UPDATE_PRICES = `
	mutation Mutation($priceObj: JSON!, $pricesId: String!) {
		updatePrices(priceObj: $priceObj, pricesId: $pricesId) {
			timestamp
			priceObj
			id
			pricesId
			
		}
	}
`;

const GET_ALL_BOUNTIES = `
	query GetAllIssues($sortOrder: String!, $skip: Int!, $quantity: Int!) {
		bounties(skip: $skip, sortOrder: $sortOrder, quantity: $quantity, orderBy: $bountyMintTime) {
			bountyAddress
			bountyId
            bountyMintTime
			bountyType
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
		$tvl: Float
		$organizationId: String!
		$bountyId: String!
		$type: String!
		$repositoryId: String!
		$category: String
        $createdAt: String
	) {
		updateBounty(
			address: $address
			type: $type
			tvl: $tvl
			organizationId: $organizationId
			bountyId: $bountyId
			category: $category
			repositoryId: $repositoryId
            createdAt: $createdAt
		) {
			address
		}
	}
`;

module.exports = { UPDATE_PRICES, UPDATE_BOUNTY_TVL, GET_ALL_BOUNTIES };