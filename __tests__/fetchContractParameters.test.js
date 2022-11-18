const fetchContractParameters = require('../src/fetchContractParameters');
const axios = require("axios");

describe('fetchContractParameters', () => {
	const mockBountyId = "M_kwDOE5zs-M480ik8";
	const data = { "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6": { "usd": 20650 } };
	const wbtcAddress = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
	const mockOrganizationId = "O_123123123";
	const bountyAddress = "0x2ad861c24530744a46f888b8de8029cef592d23d";
	const mockRepoId = "repoId1";

	const bounty = {
		bountyId: mockBountyId,
		organization: { id: mockOrganizationId },
		bountyAddress,
		bountyType: "1",
		bountyTokenBalances: [
			{ tokenAddress: wbtcAddress, volume: 1000 },
			{ tokenAddress: wbtcAddress, volume: 1000 },
			{ tokenAddress: wbtcAddress, volume: 1000, },
		]
	};

	const bounties = [bounty, bounty];

	const expectedTvlData = [
		{
			address: '0x2ad861c24530744a46f888b8de8029cef592d23d',
			bountyId: mockBountyId,
			tvl: 0.6195,
			organizationId: 'O_123123123',
			category: "non-profit",
			type: "1",
			repositoryId: "repoId1"
		},
		{
			address: '0x2ad861c24530744a46f888b8de8029cef592d23d',
			bountyId: mockBountyId,
			tvl: 0.6195,
			category: "non-profit",
			type: undefined,
			organizationId: 'O_123123123',
			type: "1",
			repositoryId: "repoId1"
		}
	];

	beforeEach(() => {
		jest.mock('axios');
		axios.post = jest.fn();
		axios.get = jest.fn().mockResolvedValue({ data });
		axios.post.mockImplementation((url) => {
			switch (url) {
				case 'https://api.github.com/graphql':
					return Promise.resolve({ data: { data: { nodes: [{ id: mockBountyId, labels: { nodes: [{ name: "non-profit" }] }, repository: { id: mockRepoId } }] } } });
				default:
					return Promise.resolve({ data: { data: { bounties } } });
			}
		});
	});

	it('fetchContractParameters', async () => {
		const tvlData = await fetchContractParameters("production");
		expect(tvlData).toEqual(expectedTvlData);
	});
});