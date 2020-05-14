import { styleSetting } from './styleSettings.js';

export default (matchesWonByTeams) => {
	let teams = Object.keys(matchesWonByTeams);
	let years = Object.keys(matchesWonByTeams[teams[0]]);
	let matchesWonResult = [];

	teams.forEach((team) => {
		let yearsData = [];
		years.forEach((year) => {
			yearsData.push(matchesWonByTeams[team][year]);
		});
		matchesWonResult.push({ name: team, data: yearsData });
	});

	Highcharts.chart('matches-won-by-teams', {
		chart: {
			type: 'column',
			...styleSetting,
		},
		title: {
			text: 'Matches Won by Teams Per Year',
		},
		subtitle: {
			text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
		},
		xAxis: {
			categories: years,
			crosshair: true,
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Matches',
			},
			tickInterval: 2,
		},
		tooltip: {
			shared: true,
		},
		series: matchesWonResult,
	});
};
