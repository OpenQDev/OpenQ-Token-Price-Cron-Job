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
			externalUserId			
			fundingGoalVolume
			fundingGoalTokenAddress
			payoutSchedule
			payoutTokenAddress
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
		$budget: Float
		$organizationId: String!
		$bountyId: String!
		$type: String!
		$repositoryId: String!
        $createdAt: String
		$creatingUserId: String
		$title: String
	) {
		updateBounty(
			address: $address
			title: $title
			type: $type
			tvl: $tvl
			budgetValue: $budget
			organizationId: $organizationId
			bountyId: $bountyId
			repositoryId: $repositoryId
            createdAt: $createdAt
			creatingUserId: $creatingUserId
		) {
			address
		}
	}
`;

module.exports = { UPDATE_PRICES, UPDATE_BOUNTY_TVL, GET_ALL_BOUNTIES };