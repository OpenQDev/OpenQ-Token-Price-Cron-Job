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

module.exports = GET_ALL_BOUNTIES;
