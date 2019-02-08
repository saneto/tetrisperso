
/*

 */


import Entity from '/js/Entity.js';
import ControleFram from '/js/ControleFram.js';
export default class Scroll{
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
			console.log(entity.pos)
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

	draw(arena, matrix, pos) {
	    this.context.fillStyle = '#000';
	    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

	    this.drawMatrix(arena, {x: 0, y: 0});
	    this.drawMatrix(matrix, pos);
	}

    enqueue() {
    	requestAnimationFrame(this.update);
    	
    }


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

	start() {
        this.enqueue();
    }
}



