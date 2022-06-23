const polygonMetadata = require("./constants/polygon-mainnet-indexable.json");
const { getAddress } = require('@ethersproject/address');
const getMetadata = require("./utils/getTokenMetadata");

const populatePricingMetadata = (filteredBounties, environment) => {
	const pricingMetadata = [];
	let openQMetadata = getMetadata(environment);
	filteredBounties.forEach((bounty) => {
		bounty.bountyTokenBalances.forEach((bountyTokenBalance) => {
			const checksummedAddress = getAddress(bountyTokenBalance.tokenAddress);
			const metadataByChecksum = openQMetadata[checksummedAddress];
			const lowerCaseAddress = bountyTokenBalance.tokenAddress.toLowerCase();
			const metadataByLowerCase = polygonMetadata[lowerCaseAddress];
			const notPresentInMetadataAndInOpenQData = !pricingMetadata.includes(bountyTokenBalance.tokenAddress);
			if (notPresentInMetadataAndInOpenQData && metadataByChecksum) {
				pricingMetadata.push(
					metadataByChecksum
				);
			} else if (metadataByLowerCase) {
				pricingMetadata.push(
					metadataByLowerCase

				);
			}
		});
	});
	return pricingMetadata;
};

module.exports = populatePricingMetadata;