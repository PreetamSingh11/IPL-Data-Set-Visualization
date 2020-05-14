import { styleSetting } from './styleSettings.js';

export default (teamsInLast5) => {
	let teams = Object.keys(teamsInLast5);
	let runsMade = [];
	let runsGiven = [];

	teams.forEach((team) => {
		runsMade.push(teamsInLast5[team]['total_runs_made']);
		runsGiven.push(teamsInLast5[team]['total_runs_given']);
	});

	Highcharts.chart('teams-in-last-5-overs', {
		chart: {
			type: 'bar',
			...styleSetting,
		},
		title: {
			text: 'Teams performances in last 5 overs (Average)',
		},
		subtitle: {
			text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
		},
		xAxis: {
			categories: teams,
			title: {
				text: null,
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Runs',
				align: 'high',
			},
			labels: {
				overflow: 'justify',
			},
		},
		tooltip: {
			valueSuffix: ' runs',
			shared: true,
		},
		plotOptions: {
			series: {
				pointPadding: 0.2,
			},
		},
		credits: {
			enabled: false,
		},
		series: [
			{
				name: 'Runs Made',
				data: runsMade,
				color: '#aed581',
			},
			{
				name: 'Runs Given',
				data: runsGiven,
				color: '#ef9a9a',
			},
		],
	});
};
