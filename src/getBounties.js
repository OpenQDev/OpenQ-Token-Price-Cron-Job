const { GET_ALL_BOUNTIES } = require('./graphql/mutations');
const axios = require('axios');

/**
 * 
 * @param {*} sortOrder 
 * @param {skip for offset based pagination} startAt 
 * @param {barch size} quantity 
 * @returns 
 */
const getBounties = async (sortOrder, startAt, quantity) => {
	const promise = new Promise(async (resolve, reject) => {
		try {
			result = await axios
				.post(
					`${process.env.OPENQ_SUBGRAPH_HTTP_URL}`,
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
			resolve(result.data.data.bounties);
		} catch (e) {
			console.error(e);
			resolve([]);
		}
		resolve([]);
	});
	return promise;
};

module.exports = getBounties;