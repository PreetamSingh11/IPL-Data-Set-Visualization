module.exports = (matches) => {
	const result = {};
	for (let match of matches) {
		result[match.season] ? (result[match.season] += 1) : (result[match.season] = 1);
	}
	return result;
};
