import matchesPlayedPerYear from './modules/matchesPlayed.js';
import matchesWonByTeams from './modules/matchesWon.js';
import extraRunsIn2016 from './modules/extraRuns.js';
import topEconomicalBowlers2015 from './modules/economicalBowlers.js';
import teamsPerformanceInLast5 from './modules/teamsPerformance.js';

(() => {
	fetch('./data.json')
		.then((r) => r.json())
		.then(visualizeData);
})();

function visualizeData(data) {
	matchesPlayedPerYear(data.matchesPlayedPerYear);
	matchesWonByTeams(data.matchesWonByTeams);
	extraRunsIn2016(data.extraRunByTeams2016['2016']);
	topEconomicalBowlers2015(data.topEconomicalBowlers2015);
	teamsPerformanceInLast5(data.teamsInLast5Overs);
	window.dispatchEvent(new Event('resize'));
}
