const openqPolygonMetadata = require("../constants/openq-polygon-mainnet-indexable.json");
const openqLocalMetadata = require("../constants/openq-local-indexable.json");

const getTokenMetadata = (environment) => {
	switch (environment) {
		case 'local':
			return openqLocalMetadata;
		case 'production':
		case 'staging':
			return openqPolygonMetadata;
		default:
			throw new Error();
	}
};

module.exports = getTokenMetadata;