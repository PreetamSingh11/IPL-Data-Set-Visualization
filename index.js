const fs = require('fs');
const csv = require('csvtojson');

const matchesPerYear = require('./ipl/matchesPlayedPerYear');
const matchesWonByTeam = require('./ipl/matchesWonByTeams');
const extraRunByEachTeam = require('./ipl/extraRunByEachTeam');
const economicalBowlers = require('./ipl/economicalBowlers');
const teamsInLastOvers = require('./ipl/teamsInLast5Overs');

const MATCHES_FILE = './csv_data/matches.csv';
const DELIVERIES_FILE = './csv_data/deliveries.csv';
const JSON_OUTPUT_FILE = './public/data.json';

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

	const matchesPlayedPerYear = matchesPerYear(matches);
	const matchesWonByTeams = matchesWonByTeam(matches);
	const extraRunByTeams2016 = extraRunByEachTeam(matches, deliveries);
	const topEconomicalBowlers2015 = economicalBowlers(matches, deliveries);
	const teamsInLast5Overs = teamsInLastOvers(matches, deliveries);

	const resultMerger = {
		matchesPlayedPerYear,
		matchesWonByTeams,
		extraRunByTeams2016,
		topEconomicalBowlers2015,
		teamsInLast5Overs,
	};
	saveDataToFile(resultMerger, JSON_OUTPUT_FILE);
})();

function saveDataToFile(data, filePath) {
	const jsonData = JSON.stringify(data);
	fs.writeFile(filePath, jsonData, (err) => {
		if (err) console.error(err);
		else console.log('SUCCESS: Data is written to file "data.json" successfully...');
	});
}
