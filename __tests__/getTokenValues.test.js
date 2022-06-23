const getTokenValues = require('../src/getTokenValues');

describe('getTokenValues', () => {
	it('getTokenValues', async() => {
		const mockOrganizationId = "organizationId";
		const mockBountyAddress = "bountyAddress";
		const wbtcAddress = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6"
		const bounty = {
			address: mockBountyAddress,
			organization: {
				id: mockOrganizationId
			},
			bountyTokenBalances: [
				{ tokenAddress: wbtcAddress, volume: 1000 },
				{ tokenAddress: wbtcAddress, volume: 1000 },
				{ tokenAddress: wbtcAddress, volume: 1000 },
			]
		};

		const pricingMetadata = { [wbtcAddress]: { address: 1400.00 } };
		
		const priceData = { [wbtcAddress.toLowerCase()]: { usd: 1400.00 } };
	const bounties = [bounty, bounty];

		// ACT
		const actualTVlBody = await getTokenValues(bounties, pricingMetadata, priceData, "production");

		// ASSERT
const expectedTvl = .042
		const expectedTvlBody = [{
			address: mockBountyAddress,
			tvl: expectedTvl,
			organizationId: mockOrganizationId
		},
		{
			address: mockBountyAddress,
			tvl: expectedTvl,
			organizationId: mockOrganizationId
		}
		];

		expect(actualTVlBody).toEqual(expectedTvlBody);
	});
});