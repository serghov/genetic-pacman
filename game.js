class Game {
	constructor(canvas = document.createElement('canvas'), moveDelay = 200) {

		this.ghosts = [
			{x: 1, y: 2, direction: 0, img: document.getElementById('ghost0')},
			{x: 1, y: 4, direction: 0, img: document.getElementById('ghost1')},
			{x: 1, y: 6, direction: 0, img: document.getElementById('ghost2')},
			{x: 1, y: 8, direction: 0, img: document.getElementById('ghost3')},
		];

		this.pacman = {x: 1, y: 1, direction: 0, img: document.getElementById('pacman'), score: 0, moves: 1};

		this.renderer = new Renderer(canvas);
		this.renderer.start();

		this.maze = JSON.parse(JSON.stringify(maze));


		this.mazeWidth = this.maze[0].length;
		this.mazeHeight = this.maze.length;

		this.cellWidth = canvas.width / this.maze.length;
		this.cellHeight = canvas.height / this.maze[0].length;

		this.renderer.update(drawBackground.bind(this), ['draw']);
		this.renderer.update(drawMaze.bind(this), ['draw']);
		this.renderer.update(drawGhosts.bind(this), ['draw']);
		this.renderer.update(drawPacman.bind(this), ['draw']);

		this.renderer.update(moveGhosts.bind(this), ['motion'], moveDelay);
		this.renderer.update(movePacman.bind(this), ['motion'], moveDelay);


		this.genome = [-10, -5, 2, 5, 0];

	}

	get Score() {
		return this.pacman.score / this.pacman.moves;
	}

	stop() {
		this.renderer.pause();
	}

}

function drawBackground(now, renderer) {
	const ctx = renderer.context;
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, renderer.width, renderer.height);
}

function drawMaze(now, renderer) {
	const ctx = renderer.context;

	for (let y in this.maze) {
		for (let x in this.maze[y]) {
			if (this.maze[y][x] === 1) {
				ctx.fillStyle = "#0000AA";
				ctx.fillRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
			}
			else if (this.maze[y][x] === 5) {
				ctx.fillStyle = "#FFFFFF";
				ctx.fillRect(x * this.cellWidth + this.cellWidth * 0.4, y * this.cellHeight + this.cellHeight * 0.4, this.cellWidth * 0.2, this.cellHeight * 0.2);
			}
		}
	}
}

function drawGhosts(now, renderer) {
	const ctx = renderer.context;

	for (let i in this.ghosts) {
		ctx.drawImage(this.ghosts[i].img, this.ghosts[i].x * this.cellWidth, this.ghosts[i].y * this.cellHeight, this.cellWidth, this.cellHeight);
	}
}

function drawPacman(now, renderer) {
	const ctx = renderer.context;
	ctx.drawImage(this.pacman.img, this.pacman.x * this.cellWidth, this.pacman.y * this.cellHeight, this.cellWidth, this.cellHeight);
}