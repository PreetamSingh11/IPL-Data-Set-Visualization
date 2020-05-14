module.exports = (matches, deliveries) => {
	let result = {};
	let year = '2016';

	result[year] = {};
	let matchesPlayed = [];

	// List of matches played during season 2016
	matches.forEach((match) => {
		if (match.season == year) return matchesPlayed.push(match.id);
	});

	deliveries.forEach((delivery) => {
		if (matchesPlayed.includes(delivery.match_id)) {
			result[year][delivery.bowling_team]
				? (result[year][delivery.bowling_team] += parseInt(delivery.extra_runs))
				: (result[year][delivery.bowling_team] = parseInt(delivery.extra_runs));
		}
	});

	return result;
};
