const runIndexer = require('./src/runIndexer');
require('dotenv').config();

runIndexer(process.env.INITIAL_WAIT_PERIOD_MS);