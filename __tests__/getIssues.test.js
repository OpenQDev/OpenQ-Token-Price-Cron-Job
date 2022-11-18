const axios = require("axios");

const getIssues = require('../src/getIssues');


beforeEach(() => {
	jest.mock('axios');
	axios.post = jest.fn();
	axios.post.mockImplementation((url) => {
		switch (url) {
			case 'https://api.github.com/graphql':
				return Promise.resolve({ data: { data: { nodes: [{ id: "I_kwDOHYMKVc5MUfz4", labels: { nodes: [] }, repository: { id: "repoId1" } }] } } });
			default:
				return Promise.resolve({ data: { data: { bounties } } });
		}
	});
});

describe('getIssues', () => {
	it('getIssues', async () => {
		const mockOrganizationId = "organizationId";
		const mockBountyAddress = "bountyAddress";
		const mockBountyType = "1";
		const wbtcAddress = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
		const mockBountyId = "I_kwDOHAZTVc5PYxa5";
		const repoId1 = "repoId1";

		const bounty = {
			bountyAddress: mockBountyAddress,
			organization: {
				id: mockOrganizationId
			},
			bountyId: mockBountyId,
			bountyType: "1",
			bountyTokenBalances: [
				{ tokenAddress: wbtcAddress, volume: 1000 },
				{ tokenAddress: wbtcAddress, volume: 1000 },
				{ tokenAddress: wbtcAddress, volume: 1000 },
			]
		};

		const pricingMetadata = { [wbtcAddress.toLowerCase()]: { address: wbtcAddress } };

		const priceData = { [wbtcAddress.toLowerCase()]: { usd: 1400.00 } };
		const bounties = [bounty, bounty];

		// ACT
		const ghIssues = await getIssues([mockBountyId]);

		// ASSERT
		const expectedReturn = {
			indexedGithubIssues: { I_kwDOHYMKVc5MUfz4: [] },
			repositoryIds: { I_kwDOHYMKVc5MUfz4: 'repoId1' }
		};

		expect(ghIssues).toEqual(expectedReturn);
	});
});