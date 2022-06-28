const fetchTvls = require('../src/fetchTvls');
const axios = require("axios");
const data = { "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6": { "usd": 20650 } };
const wbtcAddress = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
const mockOrganizationId = "O_123123123";
const bountyAddress = "0x2ad861c24530744a46f888b8de8029cef592d23d";
const bounty = {
	bountyId: 'M_kwDOE5zs-M480ik8',
	organization: { id: mockOrganizationId },
	bountyAddress,
	bountyTokenBalances: [
		{ tokenAddress: wbtcAddress, volume: 1000 },
		{ tokenAddress: wbtcAddress, volume: 1000 },
		{ tokenAddress: wbtcAddress, volume: 1000 },
	]
};
const expectedTvlData = [
	{
		address: '0x2ad861c24530744a46f888b8de8029cef592d23d',
		tvl: 0.6195,
		organizationId: 'O_123123123'
	},
	{
		address: '0x2ad861c24530744a46f888b8de8029cef592d23d',
		tvl: 0.6195,
		organizationId: 'O_123123123'
	}
];

const bounties = [bounty, bounty];
beforeEach(() => {
	jest.mock('axios');
	axios.get = jest.fn().mockResolvedValue({ data });
	axios.post = jest.fn().mockResolvedValue({ data: { data: { bounties } } });
});

describe('fetchTvls', () => {
	it('fetchTvls', async () => {
		const tvlData = await fetchTvls("production");
		expect(tvlData).toEqual(expectedTvlData);
	});
});