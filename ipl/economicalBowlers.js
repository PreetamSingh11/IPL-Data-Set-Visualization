module.exports = (matches, deliveries, year) => {
	let result = {};
	let matchesPlayed = [];

	// List of matches played during season 2015
	matches.forEach((match) => {
		if (match.season == year) return matchesPlayed.push(match.id);
	});

	// This Block calculates 'total over' and 'total run' per player
	let lastOver = 0;
	deliveries.forEach((delivery) => {
		// CHECK: If delivery thrown during a particular year.
		if (matchesPlayed.includes(delivery.match_id)) {
			// CHECK: If bowler is not present in result set then set his name, first delivery and runs.
			if (!result[delivery.bowler]) {
				result[delivery.bowler] = {};
				result[delivery.bowler]['name'] = delivery.bowler;
				result[delivery.bowler]['total_over'] = 0.1;
				result[delivery.bowler]['total_run'] = parseInt(delivery.total_runs);
			} else {
				// CHECK: If this delivery is from last over or it is fresh over.
				if (lastOver == delivery.over) {
					result[delivery.bowler]['total_over'] += 0.1;
				} else {
					result[delivery.bowler]['total_over'] =
						Math.ceil(result[delivery.bowler]['total_over']) + 0.1;
				}
				result[delivery.bowler]['total_run'] += parseInt(delivery.total_runs);
			}
		}
		lastOver = delivery.over;
	});

	// This block is used to round off 'Overs' like 3.6 to 4 or 3.4 to keep just 3.4
	for (let res in result) {
		result[res]['total_over'] =
			result[res]['total_over'] % 1.0 > 0.5
				? Math.ceil(result[res]['total_over'])
				: parseFloat(result[res]['total_over'].toFixed(1));
	}

	/* Calculates Economy of every bowler
		Economy formula ==>  (total_runs / total_deliveries) * 6
		total_deliveries ==> over * 6
			\\ 4 overs == 4 * 6 == 24 deliveries
			\\ 3.4 overs == 3 * 6 + 4 == 22 deliveries
	*/
	for (let res in result) {
		let perBall;
		// CHECK: Whether over was finished or unfinished to change calculation formula
		if (result[res]['total_over'] % 1 == 0) {
			perBall = parseInt(result[res]['total_over']) * 6;
		} else {
			let tempOver = (result[res]['total_over'] + '').split('.');
			perBall = parseInt(tempOver[0]) * 6 + parseInt(tempOver[1]);
		}
		result[res]['economy'] = parseFloat(
			((result[res]['total_run'] / perBall) * 6).toFixed(2)
		);

		// Delete two intermediate properties which are no longer required
		delete result[res]['total_over'];
		delete result[res]['total_run'];
	}

	// Returns top 10 economical bowlers in sorted order
	return Object.keys(result)
		.map((key) => result[key])
		.sort((a, b) => (a.economy > b.economy ? 1 : b.economy > a.economy ? -1 : 0))
		.slice(0, 10);
};
