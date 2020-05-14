module.exports = (matches, deliveries) => {
	let result = {};
	let matchesPlayed = {};

	// Count matches played by each teams
	matches.forEach((match) => {
		matchesPlayed[match.team1]
			? (matchesPlayed[match.team1] += 1)
			: (matchesPlayed[match.team1] = 1);
		matchesPlayed[match.team2]
			? (matchesPlayed[match.team2] += 1)
			: (matchesPlayed[match.team2] = 1);
	});

	deliveries.forEach((delivery) => {
		let overNumber = parseInt(delivery.over);

		// CHECK: last 5 overs only
		if (overNumber > 15 && overNumber <= 20) {
			let total_runs = parseInt(delivery.total_runs);

			if (!result[delivery.batting_team]) {
				result[delivery.batting_team] = {};
				result[delivery.batting_team]['total_runs_made'] = total_runs;
				result[delivery.batting_team]['total_runs_given'] = 0;
			} else {
				result[delivery.batting_team]['total_runs_made'] += total_runs;
			}

			if (!result[delivery.bowling_team]) {
				result[delivery.bowling_team] = {};
				result[delivery.bowling_team]['total_runs_given'] = total_runs;
				result[delivery.bowling_team]['total_runs_made'] = 0;
			} else {
				result[delivery.bowling_team]['total_runs_given'] += total_runs;
			}
		}
	});

	// calculating average per match
	for (let res in result) {
		result[res]['total_runs_given'] = parseInt(
			result[res]['total_runs_given'] / matchesPlayed[res]
		);
		result[res]['total_runs_made'] = parseInt(
			result[res]['total_runs_made'] / matchesPlayed[res]
		);
	}
	return result;
};
