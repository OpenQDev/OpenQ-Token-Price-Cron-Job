const getBounties = async (sortOrder, startAt, quantity) => {
	const promise = new Promise(async (resolve, reject) => {
		try {
			let result = null;
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
			} catch (error) {
				reject(e);
			}

			// Filter out any GitHub Id's that are not Issues (e.g. Pull Requests)
			const filteredBounties = filterNonIssues(result.data.bounties);
			resolve(filteredBounties);
		} catch (e) {
			reject(e);
		}
		resolve([]);
	});
	return promise;
};

module.exports = getBounties;