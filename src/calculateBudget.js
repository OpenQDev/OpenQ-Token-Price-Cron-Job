const ethers = require("ethers");
const polygonMetadata = require("./constants/polygon-mainnet-indexable.json");
const { getAddress } = require('@ethersproject/address');

const calculateBudget = (bounty, tokenMetadata, priceData) => {
	
	const getBudgetTokenBalance = ()=>{
			const {
		payoutSchedule,
		payoutTokenAddress,
	
		fundingGoalTokenAddress,
		fundingGoalVolume,
	  } = bounty;
	  const type = bounty.bountyType;
	  if (type === "2" || type === "3") {
		const bigNumberEmpty = ethers.BigNumber.from(0);
		const updatedTierVolumes = payoutSchedule.reduce((accum, elem) => {
		  const bigNumberElem = ethers.BigNumber.from(elem);
		  return accum.add(bigNumberElem);
		}, bigNumberEmpty);
		return {
		  budgetTokenAddress: payoutTokenAddress,
		  volume: updatedTierVolumes.toString(),
		};
	  } else
		return {
		  budgetTokenAddress: fundingGoalTokenAddress,
		  volume: (fundingGoalVolume || 0 ).toString(),
		};
	}
	  const { budgetTokenAddress, volume } = getBudgetTokenBalance();
	  
	const checksummedTokenAddress = getAddress(budgetTokenAddress);
	const lowerCaseTokenAddress = budgetTokenAddress.toLowerCase();
	
	const currentMetadata = tokenMetadata[checksummedTokenAddress] || polygonMetadata[lowerCaseTokenAddress];
	const multiplier = volume / 10 ** currentMetadata.decimals;
	const price = priceData[currentMetadata.address.toLowerCase()];
	return  price.usd * multiplier;
};

module.exports = calculateBudget;