const populatePricingMetadata = require('../src/populatePricingMetadata');

describe('populatePricingMetadata', () => {
	const bounty1 = { bountyTokenBalances: [{ tokenAddress: "0xd6df932a45c0f255f85145f286ea0b292b21c90b" }] };
	const bounty2 = { bountyTokenBalances: [{ tokenAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F" }] };
	it('works on prod', () => {
		const expectedMetadata = [
			{
				chainId: 137,
				name: 'Aave',
				symbol: 'AAVE',
				decimals: 18,
				address: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
				logoURI: 'https://wallet-asset.matic.network/img/tokens/aave.svg',
				tags: ['pos', 'erc20', 'swapable', 'metaTx'],
				extensions: { rootAddress: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9' }
			},
			{
				name: 'Tether USD',
				address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
				symbol: 'USDT',
				decimals: 6,
				chainId: 137,
				path: '/crypto-logos/USDT.svg'
			}
		];
		const bounties = [bounty1, bounty2];
		const value = populatePricingMetadata(bounties, "production");
		expect(value).toEqual(expectedMetadata);
	});
});