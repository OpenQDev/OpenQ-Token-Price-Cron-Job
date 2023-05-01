const polygonMetadata = require("./constants/polygon-mainnet-indexable.json");
const { getAddress } = require("@ethersproject/address");
const getMetadata = require("./utils/getTokenMetadata");

const pushAddressToArray = (address, array, openQMetadata) => {

	if(!address) return
  const checksummedAddress = getAddress(address);
  const metadataByChecksum = openQMetadata[checksummedAddress];
  const lowerCaseAddress = address.toLowerCase();
  const metadataByLowerCase = polygonMetadata[lowerCaseAddress];
  
  if (notPresentInMetadataAndInOpenQData && metadataByChecksum) {
    array.push(metadataByChecksum);
  } else if (metadataByLowerCase) {
    array.push(metadataByLowerCase);
  }
};

const populatePricingMetadata = (filteredBounties, environment) => {
  const pricingMetadata = [];
  let openQMetadata = getMetadata(environment);
  filteredBounties.forEach((bounty) => {
    bounty.bountyTokenBalances.forEach((bountyTokenBalance) => {
      pushAddressToArray(bountyTokenBalance.tokenAddress, pricingMetadata, openQMetadata);
    });
	pushAddressToArray(bounty.payoutTokenAddress, pricingMetadata, openQMetadata);
	pushAddressToArray(bounty.fundingGoalTokenAddress, pricingMetadata, openQMetadata);
  });
  return pricingMetadata;
};

module.exports = populatePricingMetadata;
