import topEconomicalBowlers from './modules/economicalBowlers.js';

const visualizeBtn = document.querySelector('#visualize-btn');
const yearInput = document.querySelector('#year-input');
const errMsg = document.querySelector('#input-error');

visualizeBtn.addEventListener('click', renderBowlers);
yearInput.addEventListener('focus', setErrors);
yearInput.value = '';
errMsg.style.visibility = 'hidden';
errMsg.innerHTML = 'Error: Year must be from 2008 to 2019.';
errMsg.style.color = 'red';
const url = window.location.origin;

function renderBowlers() {
	const year = yearInput.value;
	if (parseInt(year) >= 2008 && parseInt(year) <= 2019) {
		fetch(`${url}/economy?year=${year}`, { method: 'GET' })
			.then((response) => response.json())
			.then((bowlers) => topEconomicalBowlers(bowlers, year));
	} else setErrors();
}

function setErrors(err) {
	let visible;
	typeof err == 'object' ? (visible = 'hidden') : (visible = 'visible');
	errMsg.style.visibility = visible;
}
