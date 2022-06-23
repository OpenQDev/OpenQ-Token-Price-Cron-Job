const getTokenValues = require('../src/getTokenValues');

describe('getTokenValues', () => {
	it('getTokenValues', () => {
		const mockOrganizationId = "organizationId";
		const mockBountyAddress = "bountyAddress";

		const bounty = {
			address: mockBountyAddress,
			organization: {
				id: mockOrganizationId
			}
			bountyTokenBalances: [
				{ tokenAddress: "", volume: 1000 },
				{ tokenAddress: "", volume: 1000 },
				{ tokenAddress: "", volume: 1000 },
			]
		};

		const priceData = { [wbtcAddress]: { usd: 1400.00 } };

		// ACT
		const actualTVlBody = getTokenValues();

		// ASSERT
		const expectedTvlBody = {
			address: mockBountyAddress,
			tvl: expectedTvl,
			organizationId: mockOrganizationId;
		};

		expect(tvl).toEqual(expectedTvlBody);
	});
});