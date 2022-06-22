const updateTvls = async (values) => {
	const pending = [];
	for (let i = 0; i < values.length; i += 1) {
		const value = values[i];
		const address = getAddress(value.address);
		const tvl = parseFloat(value.tvl);
		const { organizationId } = value;

		let result = null;
		try {
			result = await axios
				.post(
					`${process.env.OPENQ_API_URL}/graphql`,
					{
						query: UPDATE_BOUNTY,
						variables: { address, tvl, organizationId },
					},
					{
						headers: {
							'Authorization': process.env.OPENQ_API_SECRET,
						},
					}
				);
		} catch (error) {
			console.error(error);
		}

		pending.push(result.data);
	}
	return Promise.all(pending);
};

module.exports = updateTvls;