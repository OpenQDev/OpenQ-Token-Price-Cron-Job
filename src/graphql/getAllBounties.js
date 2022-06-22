const { gql } = require('@apollo/client');

const GET_ALL_BOUNTIES = gql`
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
