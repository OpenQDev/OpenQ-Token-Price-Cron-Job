
const openqPolygonMetadata = require("./constants/openq-polygon-mainnet-indexable.json");
const openqLocalMetadata = require("./constants/openq-local-indexable.json");
const polygonMetadata = require("./constants/polygon-mainnet-indexable.json");
const { getAddress } = require('@ethersproject/address');


const newMetadata = (filteredBounties, environment) => {
	const pricingMetadata = [];
	let openQMetadata = [];
	filteredBounties.forEach((bounty) => {
		switch (environment) {
			case 'local':
				openQMetadata = openqLocalMetadata;
				break;
			case 'production':
			case 'staging':
				openQMetadata = openqPolygonMetadata;
		}
		bounty.bountyTokenBalances.forEach((bountyTokenBalance) => {
			const checksummedAddress = getAddress(bountyTokenBalance.tokenAddress);
			const metadataByChecksum = openQMetadata[checksummedAddress];
			const lowerCaseAddress = bountyTokenBalance.tokenAddress.toLowerCase();
			const metadataByLowerCase = polygonMetadata[
				lowerCaseAddress
			];
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

module.exports = newMetadata;