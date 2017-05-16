let games = [];
const scores = [];

const genomes = [];
const gameCanvases = [];

const mutationRate = 0.3;

const lossValues = [];

let bestPlayer = {s: 1000000, g: [-3.077051565652084,-6.28198245605659,2.156777337384829,1.7043822141621026,2.3660700150156684,-3.050802370299082]};

let bestPlayerGame = null;

document.addEventListener("DOMContentLoaded", (event) => {

	document.getElementById('btn').addEventListener('click', () => {
		if (bestPlayerGame) {
			bestPlayerGame.destroy();
		}
		bestPlayerGame = new Game(document.getElementById('bestCanvas'), 100, bestPlayer.g);
	});
});
