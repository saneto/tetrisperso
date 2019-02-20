/*
	@pos : un tableau qui stock les coordonnées de l'élément en cours
	@matrix : un tableau qui stock les informations concernant la piece en cours
	@score: le score du joueur
	@arena: table qui renferme l'ensemble des élèments concernant la zone de jeu
 */

export default class entity{
	constructor(pos ,  score, matrix)
	{
		this.pos = pos;
		this.matrix= matrix;
		this.score = score;
		this.arena = this.createMatrix(12, 20);
	}
	/*
		Ici on crée le tableau à 2 dimension que l'on utilisera pour stocker les coordonnées de tous les éléments.
	 */
	createMatrix(w, h) {
	    const matrix = [];
	    while (h--) {
	        matrix.push(new Array(w).fill(0));
	    }
	    return matrix;
	}

	/*
		La méthode ne permet de jouer une nouvelle partie, enfin pas totalement .
		à chaque fois que le jeu detectera une collision on vient ici,
		la première partie on aura un nouveau composant aléatoire qui sera générer par une liste donnée et sera stocké dans matrix

	 */

	playerReset() {
	    const pieces = 'TJLOSZI';
	    this.matrix = [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
	    this.y = 0;
	    this.x = (this.arena[0].length / 2 | 0) -
	                   (this.matrix[0].length / 2 | 0);
	    if (this.collide()) {
	        this.arena.forEach(row => row.fill(0));
	        this.score = 0;
	        this.updateScore();
	    }
	}

	setPos(pos )
	{
        this.pos = pos;
	}

	/*
		une fois une colision detecter ajouter le nouvelle élément dans la matrix pour qu'il soit pris en compte
	 */
	merge() {
	    this.matrix.forEach((row, y) => {
	        row.forEach((value, x) => {
	            if (value !== 0) {
	                this.arena[y + this.pos.y][x + this.pos.x] = value;
	            }
	        });
	    });
	}

	// la méthode permet la suppression de ligne quand cette dernière est complete et rajoute les points
	arenaSweep() {
	    let rowCount = 1;
	    outer: for (let y = this.arena.length -1; y > 0; --y) {
	        for (let x = 0; x < this.arena[y].length; ++x) {
	            if (this.arena[y][x] === 0) {
	                continue outer;
	            }
	        }

	        const row = this.arena.splice(y, 1)[0].fill(0);
	        arena.unshift(row);
	        ++y;

	        this.score += rowCount * 10;
	        rowCount *= 2;
    	}
	}
	/*
		La méthode permet de relancer une nouvelle partie
	 */
	newGame()
	{
		this.arena.forEach(row => row.fill(0));
		this.score = 0;
		this.updateScore();
	}

	updateScore() {
	    document.getElementById('score').innerText = this.score;
	}
	/*
		La méthode permet de detecter les collisions
	 */
	collide() {
	    const m = this.matrix;
        const o = this.pos;
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (this.arena[y + o.y] &&
                        this.arena[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
	    return false;
	}


}