const openqPolygonMetadata = require("./constants/openq-polygon-mainnet-indexable.json");
const openqLocalMetadata = require("./constants/openq-local-indexable.json");

const getMetadata = (environment) => {
	switch (environment) {
		case 'local':
			return openqLocalMetadata;
			break;
		case 'production':
		case 'staging':
			return openqPolygonMetadata;
	}
};

module.exports = getMetadata;