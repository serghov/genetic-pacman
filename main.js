let games = [];
const scores = [];

const genomes = [];
const gameCanvases = [];

const mutationRate = 0.3;

const lossValues = [];

let bestPlayer = {s: -1000};

let bestPlayerGame = null;

document.addEventListener("DOMContentLoaded", (event) => {
	canvas = document.getElementById('canvas');
	initRandomGenomes();
	makeGames();
	requestAnimationFrame(checkGames);

	document.getElementById('btn').addEventListener('click', () => {
		if (bestPlayerGame) {
			bestPlayerGame.destroy();
		}
		bestPlayerGame = new Game(document.getElementById('bestCanvas'), 100, bestPlayer.g);
	});
});

const removeCanvases = () => {
	const container = document.getElementById('canvases');

	while (container.firstChild) {
		//document.body.removeChild(gameCanvases[0]);
		container.removeChild(container.firstChild);
	}
};

const makeGames = () => {
	for (let i = 0; i < 100; i++) {
		const canvas = document.createElement('canvas');
		canvas.width = 60;
		canvas.height = 60;
		document.getElementById('canvases').appendChild(canvas);
		gameCanvases.push(canvas);
		const game = new Game(canvas, 1, genomes[i]);
		games.push(game);
	}
};

const checkGames = () => {

	let doneCount = 0;
	for (let i in games) {
		scores[i] = {s: games[i].Score, g: games[i].genome};

		if (games[i].isDone) {
			games[i].stop();
			doneCount++;
		}
	}

	if (doneCount == games.length) {
		scores.sort((a, b) => {
			return b.s - a.s
		});
		console.log(scores[0]);
		lossValues.push(scores[0].s);

		if (scores[0].s > bestPlayer.s) {
			bestPlayer = JSON.parse(JSON.stringify(scores[0]));
		}

		populate(JSON.parse(JSON.stringify(scores[0].g)), JSON.parse(JSON.stringify(scores[1].g)));
		removeCanvases();
		games = [];
		makeGames();
		updateChart();
		console.log('all done');

		requestAnimationFrame(checkGames);
	}
	else {
		requestAnimationFrame(checkGames);
	}


};

const populate = (a, b) => {
	const mergePos = Math.random() * a.length;
	const initialChild = [];
	for (let i in a) {
		if (i < mergePos) {
			initialChild.push(a[i]);
		}
		else {
			initialChild.push(b[i]);
		}
	}
	genomes[0] = a;
	genomes[1] = b;
	for (let i in genomes) {
		if (i < 2)
			continue;
		genomes[i] = mutate(initialChild);
	}
};

const mutate = (a) => {
	const res = [];
	for (let i in a) {
		if (Math.random() < mutationRate)
			res.push(a[i] + (Math.random() - 0.5));
		else
			res.push(a[i]);
	}
	return res;
};

const initRandomGenomes = () => {
	for (let i = 0; i < 100; i++) {
		genomes.push([
			Math.random() * 10 - 5,
			Math.random() * 10 - 5,
			Math.random() * 10 - 5,
			Math.random() * 10 - 5,
			Math.random() * 10 - 5
		])
	}
};

const initGenomes = () => {
	let cur = [-5, -5, -5, -5, -5];
	while (true) {
		genomes.push(JSON.parse(JSON.stringify(cur)));
		let index = 4;
		cur[index]++;

		while (cur[index] > 4) {
			cur[index] = 0;
			index--;
			cur[index]++;
			if (index == 0) {
				break;
			}
		}
		if (index == 0 && cur[index] > 4)
			break;
	}
};

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages': ['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

const dataTable = [
	['Year', 'Score Function'],
	[0, 0]
];

const options = {
	title: 'Best Score of players',
	curveType: 'function',
	legend: {position: 'bottom'},
	animation:{
		duration: 1000,
		easing: 'out'
	},
};

let data = null;
let chart = null;
const initChart = () => {
	for (let i in lossValues) {
		dataTable.push([i, lossValues[i]]);
	}

	data = google.visualization.arrayToDataTable(dataTable);
	chart = new google.visualization.LineChart(document.getElementById('chart_div'));

	chart.draw(data, options);
};

const updateChart = () => {
	const dataTable = [
		['Year', 'Score Function']
	];
	for (let i in lossValues) {
		dataTable.push([i, lossValues[i]]);
	}
	data = google.visualization.arrayToDataTable(dataTable);
	chart.draw(data, options);
};

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
	initChart();
}