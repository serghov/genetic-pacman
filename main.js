const games = [];

document.addEventListener("DOMContentLoaded", (event) => {
	canvas = document.getElementById('canvas');

	for (let i =0;i<100;i++){
		const canvas = document.createElement('canvas');
		canvas.width = 60;
		canvas.height = 60;
		document.body.appendChild(canvas);
		const game = new Game(canvas, 1);
	}



});