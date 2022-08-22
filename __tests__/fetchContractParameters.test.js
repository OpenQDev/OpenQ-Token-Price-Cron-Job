const fetchContractParameters = require('../src/fetchContractParameters');
const axios = require("axios");
const data = { "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6": { "usd": 20650 } };
const wbtcAddress = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
const mockOrganizationId = "O_123123123";
const bountyAddress = "0x2ad861c24530744a46f888b8de8029cef592d23d";
const bounty = {
	bountyId: 'M_kwDOE5zs-M480ik8',
	organization: { id: mockOrganizationId },
	bountyAddress,
	bountyType: "1",
	bountyTokenBalances: [
		{ tokenAddress: wbtcAddress, volume: 1000 },
		{ tokenAddress: wbtcAddress, volume: 1000 },
		{ tokenAddress: wbtcAddress, volume: 1000, },
	]
};
const expectedTvlData = [
	{
		address: '0x2ad861c24530744a46f888b8de8029cef592d23d',
		bountyId: 'M_kwDOE5zs-M480ik8',
		tvl: 0.6195,
		organizationId: 'O_123123123',
		category: "learn2earn",
		type: "1"
	},
	{
		address: '0x2ad861c24530744a46f888b8de8029cef592d23d',
		bountyId: 'M_kwDOE5zs-M480ik8',
		tvl: 0.6195,
		category: "learn2earn",
		type: undefined,
		organizationId: 'O_123123123',
		type: "1"
	}
];

const bounties = [bounty, bounty];
beforeEach(() => {
	jest.mock('axios');
	axios.post = jest.fn()
	axios.get = jest.fn().mockResolvedValue({data});
axios.post.mockImplementation((url) => {
  switch (url) {
    case 'https://api.github.com/graphql':
      return Promise.resolve({data: {data:{nodes:[{id:"M_kwDOE5zs-M480ik8",labels:{nodes:[{name: "Learn2Earn"}]}}]}}})
    default:
      return Promise.resolve({ data: { data: { bounties } } })
  }
})
});

describe('fetchContractParameters', () => {
	it('fetchContractParameters', async () => {
		const tvlData = await fetchContractParameters("production");
		expect(tvlData).toEqual(expectedTvlData);
	});
});