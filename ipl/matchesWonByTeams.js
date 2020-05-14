module.exports = (matches) => {
	let result = {};
	let teams = new Set();
	let seasons = new Set();

	// Making list if teams
	for (let match of matches) {
		teams.add(match.team1, match.team2);
		seasons.add(match.season);
	}

	teams.add('noResult');

	// Appending years into every team
	[...teams].forEach((team) => {
		[...seasons].forEach((season) => {
			if (!result[team]) result[team] = {};
			result[team][season] = 0;
		});
	});

	// Updating win counter
	for (let match of matches) {
		match.winner !== ''
			? (result[match.winner][match.season] += 1)
			: (result['noResult'][match.season] += 1);
	}

	return result;
};
