const moveGhost = (ghost, game) => {
	const sur = getSurroundings(ghost, game);

	let curDir = dirToVec(ghost.direction);

	let i = 0;
	while (i < 5 && (sur[1 + curDir.y][1 + curDir.x] === 1 || sur[1 + curDir.y][1 + curDir.x] === 2 || sur[1 + curDir.y][1 + curDir.x] === 3)) {
		ghost.direction = parseInt(Math.random() * 4);
		curDir = dirToVec(ghost.direction);
		i++;
	}

	if (sur[1 + curDir.y][1 + curDir.x] % 5 == 0) {
		ghost.x += curDir.x;
		ghost.y += curDir.y;
	}

	if (ghost.x === game.pacman.x && ghost.y === game.pacman.y) {
		game.stop();

		game.pacman.score -= 20;

	}
};

function moveGhosts(now, renderer) {
	for (let i in this.ghosts) {
		moveGhost(this.ghosts[i], this);
	}
}