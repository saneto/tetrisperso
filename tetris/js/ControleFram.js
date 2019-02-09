export default class scroll{
	constructor()
	{
		this.fpsInterval = 1000/80;
	    this.then = Date.now();
	    this.now = Date.now();
		this.elapsed = this.now - this.then;
	}

	/*
		Permet de maintenir à jour le timer pour gerer nous frame
	 */
	updateTimer()
	{
		this.now = Date.now();
		this.elapsed = this.now - this.then;
	}
	/*
		Permet de controler les frames par secondes, à 1000 on est à une frame par seconde bien évidemment plus on reduit plus le nombre de frame augmente
		j'ai l'impression qu'elle ne fonctionne pas tres bien ^^', mais ça reste toujours mieux que l'application qui run à 200km/h
	 */
	checkFps()
	{
		if (this.elapsed > this.fpsInterval)
		{
			return true;
		}
		return false;
	}

	/*
	permet d'ajuster le timer pour les frames
	 */
	adjustTimer()
	{
		this.then = this.now - (this.elapsed % this.fpsInterval);
	}
}