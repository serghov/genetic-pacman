const maze = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1],
	[1, 1, 5, 1, 5, 1, 1, 1, 1, 1, 5, 1, 5, 1, 1, 1, 5, 1, 5, 1],
	[1, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 5, 1, 5, 1, 5, 1],
	[1, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5, 1, 5, 1, 5, 1],
	[1, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 5, 1, 5, 5, 5, 1],
	[1, 1, 5, 1, 5, 1, 5, 1, 1, 1, 1, 1, 5, 1, 5, 5, 5, 1, 5, 1],
	[1, 5, 5, 1, 5, 1, 5, 5, 5, 5, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1],
	[1, 5, 1, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1],
	[1, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 1, 5, 5, 5, 1, 5, 5, 5, 1],
	[1, 1, 5, 1, 5, 1, 1, 1, 5, 1, 5, 1, 1, 5, 1, 1, 5, 1, 5, 1],
	[1, 5, 5, 1, 5, 5, 5, 1, 5, 1, 5, 1, 5, 5, 5, 5, 5, 5, 5, 1],
	[1, 5, 1, 1, 1, 1, 5, 1, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1],
	[1, 5, 5, 1, 5, 5, 5, 1, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1, 5, 1],
	[1, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 5, 5, 1],
	[1, 5, 5, 5, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 1, 1, 5, 1],
	[1, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 1],
	[1, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 1, 1, 5, 1],
	[1, 5, 5, 5, 5, 1, 5, 5, 5, 1, 5, 5, 5, 1, 5, 5, 5, 5, 5, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];