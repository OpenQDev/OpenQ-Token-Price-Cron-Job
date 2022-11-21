const axios = require('axios');
const { GET_CATEGORY } = require("./graphql/query.js");

const getIssues = async (bountyIds) => {
	let result;

	try {
		result = await axios
			.post(
				`https://api.github.com/graphql`,
				{
					query: GET_CATEGORY,
					variables: { bountyIds },
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.PAT}`,
					},
				}

			);
		const indexedGithubIssues = {};
		const repositoryIds = {};
		result.data.data.nodes.map(node => {
			const issueLabels = node.labels.nodes.map(innerNode => innerNode.name.toLowerCase()).filter(label => label === "non-profit");
			repositoryIds[node.id] = node.repository.id || null;
			return { id: node.id, labels: issueLabels };
		}).forEach(issue => {
			indexedGithubIssues[issue.id] = issue.labels || null;
		});
		return { indexedGithubIssues, repositoryIds };
	} catch (error) {
		// GraphQL errors at error.response.data.errors
		console.error('error in getIssues', error);
	}
};

module.exports = getIssues;