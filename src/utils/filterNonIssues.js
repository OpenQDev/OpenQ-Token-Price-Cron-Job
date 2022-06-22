const filterNonIssues = (bounties) => {
	return bounties.filter(
		(bounty) =>
			bounty.bountyId.slice(0, 1) === 'I' ||
			bounty.bountyId.slice(0, 1) === 'M'
	);
};

module.exports = filterNonIssues;