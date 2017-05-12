class Renderer {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.width = canvas.width;
		this.height = canvas.height;

		this.isRunning = false;

		this._updateFunctions = [];
	}

	start() {
		if (this.isRunning)
			return this;

		this.isRunning = true;
		this._update();
		return this;
	}

	pause() {
		this.isRunning = false;
		return this;
	}

	update(fcn, tags = [], interval = null) {
		const res = {
			fcn: fcn,
			last: 0,
			interval: interval,
			tags: tags,
			isRunning: true
		};
		this._updateFunctions.push(res);

		return res;
	}

	getByTag(tag) {
		const res = [];
		for (let i in this._updateFunctions) {
			if (this._updateFunctions[i].tags.indexOf(tag) != -1) {
				res.push(this._updateFunctions[i]);
			}
		}
		return res;
	}

	_update() {
		if (!this.isRunning)
			return;

		let now = Date.now();

		for (let i in this._updateFunctions) {
			if (this._updateFunctions[i].isRunning &&
				now - this._updateFunctions[i].last > this._updateFunctions[i].interval) {
				this._updateFunctions[i].last = now;
				this._updateFunctions[i].fcn(now, this);
			}
		}

		requestAnimationFrame(this._update.bind(this));
	}

	destroy() {
		this.isRunning = false;
		this.context = null;
		this.canvas = null;
		this._updateFunctions = null;
	}
}