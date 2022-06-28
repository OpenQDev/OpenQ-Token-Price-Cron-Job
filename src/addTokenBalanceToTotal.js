const polygonMetadata = require("./constants/polygon-mainnet-indexable.json");
const { getAddress } = require('@ethersproject/address');

const addTokenBalanceToTotal = (runningTotal, tokenBalance, tokenMetadata, priceData) => {
	// console.log(tokenBalance.tokenAddress);
	const checksummedTokenAddress = getAddress(tokenBalance.tokenAddress);
	const lowerCaseTokenAddress = tokenBalance.tokenAddress.toLowerCase();
	const currentMetadata = tokenMetadata[checksummedTokenAddress] || polygonMetadata[lowerCaseTokenAddress];
	const multiplier = tokenBalance.volume / 10 ** currentMetadata.decimals;
	const price = priceData[currentMetadata.address.toLowerCase()];
	const newTotal = price.usd * multiplier + parseFloat(runningTotal);
	return newTotal;
};

module.exports = addTokenBalanceToTotal;