const axios = require("axios")

const getContractParameters = require('../src/getContractParameters');


beforeEach(() => {
	jest.mock('axios');
	axios.post = jest.fn()
axios.post.mockImplementation((url) => {
  switch (url) {
    case 'https://api.github.com/graphql':
      return Promise.resolve({data: {data:{nodes:[{id:"I_kwDOHYMKVc5MUfz4",labels:{nodes:[]}}]}}})
    default:
      return Promise.resolve({ data: { data: { bounties } } })
  }
})
});

describe('getContractParameters', () => {
	it('getContractParameters', async () => {
		const mockOrganizationId = "organizationId";
		const mockBountyAddress = "bountyAddress";
		const mockBountyType = "1"
		const wbtcAddress = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";
		const mockBountyId = "I_kwDOHAZTVc5PYxa5"
		const bounty = {
			bountyAddress: mockBountyAddress,
			organization: {
				id: mockOrganizationId
			},
			bountyId: "I_kwDOHAZTVc5PYxa5",
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
		const actualTVlBody = await getContractParameters(bounties, pricingMetadata, priceData, "production");

		// ASSERT
		const expectedTvl = .042;
		const expectedTvlBody = [{
			address: mockBountyAddress,
			tvl: expectedTvl,
			organizationId: mockOrganizationId,
			type: mockBountyType,
			bountyId: mockBountyId
		},
		{
			address: mockBountyAddress,
			tvl: expectedTvl,
			type: mockBountyType,
			bountyId: mockBountyId,
			organizationId: mockOrganizationId
		}
		];

		expect(actualTVlBody).toEqual(expectedTvlBody);
	});
});