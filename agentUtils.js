/**
 *
 * 0 - free
 * 1 - wall
 * 2 - out of bounds
 * 3 - ghost
 * 4 - pacman
 * 5 - food
 * @param pos
 */
const getSurroundings = (pos, game) => {
	const maze = game.maze;
	const ghosts = game.ghosts;
	const pacman = game.pacman;

	const res = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];

	const motion = [-1, 0, 1];

	for (let x in motion) {
		for (let y in motion) {
			const dx = motion[x];
			const dy = motion[y];

			let curPos = {
				x: pos.x + dx,
				y: pos.y + dy
			};

			// out of bounds
			if (curPos.x < 0 || curPos.x >= game.mazeWidth ||
				curPos.y < 0 || curPos.y >= game.mazeHeight) {
				res[1 + dy][1 + dx] = 2;
				continue;
			}

			//maze
			if (game.maze[curPos.y][curPos.x] === 1) {
				res[1 + dy][1 + dx] = game.maze[curPos.y][curPos.x];
				continue;
			}

			// ghost
			for (let i in ghosts) {
				if (ghosts[i].x == curPos.x && ghosts[i].y == curPos.y) {
					res[1 + dy][1 + dx] = 2;
					break;
				}
			}
			if (res[1 + dy][1 + dx] == 2) {
				continue;
			}

			//food
			if (game.maze[curPos.y][curPos.x] === 5) {
				res[1 + dy][1 + dx] = game.maze[curPos.y][curPos.x];
				continue;
			}

			// pacman
			if (pacman.x == curPos.x && pacman.y == curPos.y) {
				res[1 + dy][1 + dx] = 4;
				continue;
			}

		}
	}
	return res;
};

/**
 *
 * @param dir
 */
const dirToVec = (dir) => {
	dir %= 4;
	switch (dir) {
		case 0:
			return {x: 1, y: 0}; // right
		case 1:
			return {x: 0, y: 1}; // down
		case 2:
			return {x: -1, y: 0}; // left
		case 3:
			return {x: 0, y: -1}; // up
	}
};