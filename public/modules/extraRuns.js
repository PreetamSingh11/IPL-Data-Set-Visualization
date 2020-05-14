import { styleSetting } from './styleSettings.js';

export default (extraRunsByTeams) => {
	let teams = Object.keys(extraRunsByTeams);
	let extraRunsResult = [];

	teams.forEach((team) => {
		extraRunsResult.push([team, extraRunsByTeams[team]]);
	});

	Highcharts.chart('extra-runs-by-teams-in-2016', {
		chart: {
			type: 'column',
			...styleSetting,
		},
		title: {
			text: 'Extra runs conceded by each team in 2016',
		},
		subtitle: {
			text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
		},
		xAxis: {
			type: 'category',
			labels: {
				rotation: -45,
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Extra Runs',
			},
		},
		legend: {
			enabled: false,
		},
		series: [
			{
				name: 'Extra Runs',
				data: extraRunsResult,
				dataLabels: {
					enabled: true,
					color: '#FFFFFF',
					y: 30,
				},
			},
		],
	});
};
