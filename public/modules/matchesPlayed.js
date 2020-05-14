import { styleSetting } from './styleSettings.js';

export default (matchesPlayedPerYear) => {
	let seriesData = [];
	for (let year in matchesPlayedPerYear) {
		seriesData.push([year, matchesPlayedPerYear[year]]);
	}

	Highcharts.chart('matches-played-per-year', {
		chart: {
			type: 'column',
			...styleSetting,
		},
		title: {
			text: 'Matches Played Per Year',
		},
		subtitle: {
			text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
		},
		xAxis: {
			type: 'category',
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Matches',
			},
		},
		series: [
			{
				name: 'Years',
				data: seriesData,
			},
		],
	});
};
