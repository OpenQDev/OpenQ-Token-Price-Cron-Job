const { getAddress } = require('@ethersproject/address');
const axios = require('axios');

const { UPDATE_BOUNTY_TVL } = require('./graphql/mutations');

const updateContracts = async (tvlBodies) => {
	const pending = [];
	for (let i = 0; i < tvlBodies.length; i += 1) {
		const value = tvlBodies[i];
		const address = getAddress(value.address);
		const category = value.category;
		const tvl = parseFloat(value.tvl);
		const bountyId = value.bountyId;
		const type = value.type;
		let { organizationId, repositoryId } = value;
		
		// set repositoryId to this value if undefined
		if (repositoryId === undefined) {
			repositoryId = 'MDEwOlJlcG9zaXRvcnkzODcxNjc5MjQ=';
		}

		let result = null;
		
		try {
			result = await axios
				.post(
					`${process.env.OPENQ_API_URL}/graphql`,
					{
						query: UPDATE_BOUNTY_TVL,
						variables: { address, tvl, organizationId, bountyId, type, repositoryId, category },
					},
					{
						headers: {
							'Authorization': process.env.OPENQ_API_SECRET,
						},
					}
				);

		} catch (error) {
			// GraphQL errors at error.response.data.errors
			console.error('error in updateTvls', error);

			// log error.response.data if it has no undefined properties
			if (error.response !== undefined && error.response.data !== undefined) {
				console.error('error.response.data', error.response.data);
			}
		}
		pending.push(result.data);
	}
	return Promise.all(pending);
};

module.exports = updateContracts;