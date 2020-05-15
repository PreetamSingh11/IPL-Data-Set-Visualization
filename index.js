const express = require('express');
const cors = require('cors');
const path = require('path');
const csv = require('csvtojson');
const economicalBowlers = require('./ipl/economicalBowlers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

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

	app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));
})();
