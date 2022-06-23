const getTokenMetadata = require('../src/utils/getTokenMetadata');
const openqPolygonMetadata = require("../src/constants/openq-polygon-mainnet-indexable.json");
const openqLocalMetadata = require("../src/constants/openq-local-indexable.json");

describe('getTokenMetadata', () => {
	it('getTokenMetadata', () => {
		expect(getTokenMetadata('local')).toEqual(openqLocalMetadata);
		expect(getTokenMetadata('staging')).toEqual(openqPolygonMetadata);
		expect(getTokenMetadata('production')).toEqual(openqPolygonMetadata);
	});
});