const express = require('express');
const cors = require('cors');
const csv = require('csvtojson');
const economicalBowlers = require('./ipl/economicalBowlers');

const app = express();
const port = 3000;

app.use(cors());

const MATCHES_FILE = './csv_data/matches.csv';
const DELIVERIES_FILE = './csv_data/deliveries.csv';

(async () => {
	let matches, deliveries;
	try {
		[matches, deliveries] = await Promise.all([
			csv().fromFile(MATCHES_FILE),
			csv().fromFile(DELIVERIES_FILE),
		]);
	} catch (error) {
		console.error('Error while reading data files', error);
	}

	app.get('/economy', (req, res) => {
		res.json(economicalBowlers(matches, deliveries, req.query.year));
	});

	app.listen(port, () => console.log(`app listening at http://localhost:${port}`));
})();
