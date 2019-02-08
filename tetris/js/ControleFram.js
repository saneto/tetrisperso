export default class scroll{
	constructor()
	{
		this.fpsInterval = 1000;
	    this.then = Date.now();
	    this.now = Date.now();
		this.elapsed = this.now - this.then;
	}

	updateTimer()
	{
		this.now = Date.now();
		this.elapsed = this.now - this.then;
	}

	checkFps()
	{
		if (this.elapsed > this.fpsInterval)
		{
			return true;
		}
		return false;
	}

	adjustTimer()
	{
		this.then = this.now - (this.elapsed % this.fpsInterval);
	}
}