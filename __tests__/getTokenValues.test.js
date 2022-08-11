const getTokenValues = require('../src/getTokenValues');

describe('getTokenValues', () => {
	it('getTokenValues', async () => {
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
		const actualTVlBody = await getTokenValues(bounties, pricingMetadata, priceData, "production");

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