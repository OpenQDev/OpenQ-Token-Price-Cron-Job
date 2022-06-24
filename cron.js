var CronJob = require('cron').CronJob;

const sleep = require('./src/utils/sleep');
const indexer = require('./src/indexer');
require('dotenv').config();

var job = new CronJob(
	'*/10 * * * * *',
	async function () {
		console.log(`Initialized. Waiting for ${process.env.INITIAL_WAIT_PERIOD_MS / 1000} seconds for OpenQ-API to initialize`);
		await sleep(process.env.INITIAL_WAIT_PERIOD_MS);
		console.log('Running...');
		await indexer();
	},
	function () {
		console.log(`COMPLETED`);
	},
	true,
	'America/Los_Angeles',
	this,
	true
);