function movePacman(now, renderer) {
	const pacman = this.pacman;

	const sur = getSurroundings(pacman, this);

	const directions = [
		{x: 2, y: 1}, // right
		{x: 1, y: 2}, // down
		{x: 0, y: 1}, // left
		{x: 1, y: 0}, // up

	];

	const ml_choices = [0, 0, 0, 0];

	for (let i in directions) {
		ml_choices[i] = ml_direction(get_ml_data(sur[directions[i].y][directions[i].x], 1 * (i == this.pacman.direction)), this.genome);
	}

	let best_choice = 0;
	for (let i in ml_choices) {
		if (ml_choices[i] > ml_choices[best_choice]) {
			best_choice = i;
		}
	}

	let curDir = dirToVec(best_choice);
	const cDirV = directions[this.pacman.direction];

	if (this.pacman.direction != best_choice && sur[cDirV.y][cDirV.x] == 0) {
		this.pacman.score -= 1;
	}
	this.pacman.direction = best_choice;

	pacman.x += curDir.x;
	pacman.y += curDir.y;
	pacman.moves++;

	if (this.maze[pacman.y][pacman.x] === 5) {
		this.maze[pacman.y][pacman.x] = 0;
		pacman.score++;
	}

	if (pacman.y < 0 || pacman.x < 0 ||
		pacman.y >= this.mazeHeight || pacman.x >= this.mazeWidth ||
		this.maze[pacman.y][pacman.x] === 1) {
		this.stop();
		this.pacman.score = -10000;
	}

	const curPos = pacman.y * this.mazeWidth + pacman.x;
	if (this.moves.has(curPos)) {
		this.repeatedMoves++;
	}
	else {
		this.moves.add(curPos);
	}


}


/**
 * chooses if it should go in a particular direction based on the data
 * @param data []
 */
function ml_direction(data, genome) {
	let res = 0;
	for (let i in data) {
		res += data[i] * genome[i];
	}
	return res;
}
/**
 *
 * [0] - free or not
 * [1] - ghost or not
 * [2] - food or not
 * [3] - random number
 * [4] - weather or not we were moving in this direction before
 * @param point
 * @return {[number,number,number]}
 */
function get_ml_data(point, isDirection) {
	const res = [0, 0, 0, 0, 0];
	switch (point) {
		case 1:
		case 2:
			res[0] = 1;
		case 3:
			res[1] = 1;
		case 5:
			res[2] = 1;
	}
	res[3] = Math.random();
	res[4] = isDirection;

	return res;
}