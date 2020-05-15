import { styleSetting } from './styleSettings.js';

export default (bowlersEconomies, year) => {
	let economyResult = [];

	bowlersEconomies.forEach((bowler) => {
		economyResult.push([bowler.name, bowler.economy]);
	});

	Highcharts.chart('top-economical-bowlers', {
		chart: {
			type: 'column',
			...styleSetting,
		},
		title: {
			text: `Top Economical Bowlers in ${year} season`,
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
				text: 'Economy',
			},
		},
		legend: {
			enabled: false,
		},
		series: [
			{
				name: 'Economy',
				data: economyResult,
				dataLabels: {
					enabled: true,
					color: '#FFFFFF',
					y: 30,
				},
			},
		],
	});
};
