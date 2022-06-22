const { gql } = require('@apollo/client');

const UPDATE_BOUNTY = gql`
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

module.exports = UPDATE_BOUNTY;
