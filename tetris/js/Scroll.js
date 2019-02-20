import Entity from '/js/Entity.js';
import ControleFram from '/js/ControleFram.js';
export default class Scroll{

	//
	/*
		la partie la plus importante est le update!
		la fonction du update est en boucle infinie, c'est le seul moyen que j'ai trouvé pour exploiter la méthode
		requestAnimationFrame sans avoir tous les attributs à nul
	 */
	//
	constructor(dropCounter, dropInterval,lastTime, context, canvas,entity)
	{
		this.lastTime = lastTime;
		this.dropInterval= dropInterval;
		this.dropCounter = dropCounter;
		this.context=context;
		this.canvas = canvas;
		this.entity=entity;
		this.colors = [
			    null,
			    '#FF0D72',
			    '#0DC2FF',
			    '#0DFF72',
			    '#F538FF',
			    '#FF8E0D',
			    '#FFE138',
			    '#3877FF',
			];
		this.ControleFram = new ControleFram();
		this.update = (time ) => {
			this.ControleFram.updateTimer()
		    if (this.ControleFram.checkFps()) {
		    	const deltaTime = time - this.lastTime;	
			    this.dropCounter += deltaTime;
			    if (this.dropCounter > this.dropInterval) {
			    	entity.pos.increlementY();
			    	if (entity.collide()) {
			    		entity.pos.y--;
			       		entity.merge();
			        	entity.playerReset();
			        	entity.arenaSweep();
				        entity.updateScore();
				    }
			    	
			        this.dropCounter=0;
			    }
			    this.lastTime = time;
			    this.draw(entity.arena, entity.matrix, entity.pos);
			    this.ControleFram.adjustTimer();
		    	
		    }
		    this.enqueue();
		}
	}

	/*
		la méthode regroupe toute les méthodes dont on a besoin pour déssiner nous carrés
	 */

	draw(arena, matrix, pos) {
	    this.context.fillStyle = '#000';
	    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

	    this.drawMatrix(arena, {x: 0, y: 0});
	    this.drawMatrix(matrix, pos);
	}

	/*
		permet de boucler à l'infinie sur se que l'on veut faire,
		je vous invite à aller chercher sur internet pour plus d'information sur la méthode natif
		requestAnimationFrame 
	 */
    enqueue() {
    	requestAnimationFrame(this.update);
    	
    }

    /*
    	c'est ici que les carrés sont déssinés un par un + leur css
     */
	drawMatrix(matrix, offset) {
	    matrix.forEach((row, y) => {
	        row.forEach((value, x) => {
	            if (value !== 0) {
	                this.context.fillStyle = this.colors[value];
	                this.context.fillRect(x + offset.x,
	                                 y + offset.y,
	                                 1, 1);
	            }
	        });
	    });
	}

	/*
		la méthode vérifier la collision entre les éléments envoyer en paramètre
		celle-la commes les précédentes peuvent être sorti dans un fichier à part
	 */
	collide(arena, matrix, pos) {
	    const m = matrix;
	    const o = pos;
	    for (let y = 0; y < m.length; ++y) {
	        for (let x = 0; x < m[y].length; ++x) {
	            if (m[y][x] !== 0 &&
	               (arena[y + o.y] &&
	                arena[y + o.y][x + o.x]) !== 0) {
	                return true;
	            }
	        }
	    }
	    return false;
	}

	/*
		la méthode qui run notre schmilblick!
	 */
	start() {
        this.enqueue();
    }
}
