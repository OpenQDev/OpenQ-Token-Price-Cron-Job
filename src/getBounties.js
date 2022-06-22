const GET_ALL_BOUNTIES = require('./graphql/getAllBounties');
const axios = require('axios');

const getBounties = async (sortOrder, startAt, quantity) => {
	const promise = new Promise(async (resolve, reject) => {
		try {
			result = await axios
				.post(
					`${process.env.OPENQ_SUBGRAPH_HTTP_URL}/graphql`,
					{
						query: GET_ALL_BOUNTIES,
						variables: { skip: startAt, sortOrder, quantity }
					},
					{
						headers: {
							'Authorization': process.env.OPENQ_API_SECRET,
						},
					}
				);
			resolve(result.data.bounties);
		} catch (e) {
			console.error(e);
			resolve([]);
		}
		resolve([]);
	});
	return promise;
};

module.exports = getBounties;