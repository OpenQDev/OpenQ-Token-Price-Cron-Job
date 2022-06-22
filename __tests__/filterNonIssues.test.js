const filterNonIssues = require('../src/utils/filterNonIssues');

describe('filterNonIssues', () => {
	const issue1 = { bountyId: 'I_kwDOE5zs-M480ik8' };
	const issue2 = { bountyId: 'M_kwDOE5zs-M480ik8' };
	const pullRequest1 = { bountyId: 'PR_kwDOE5zs-M480ik8' };

	it('filterNonIssues', () => {
		// ARRANGE
		const bounties = [issue1, issue2, pullRequest1];

		// ACT
		const filteredBounties = filterNonIssues(bounties);

		// ASSERT
		expect(filteredBounties).toEqual([issue1, issue2]);
	});
});