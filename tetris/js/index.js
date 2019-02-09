import Scroll from '/js/Scroll.js';
import Entity from '/js/Entity.js';
import Pos from '/js/Pos.js';

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

/*
    la méthode qui charge notre jeu, si vous mettez un système de routage en place on utilisera celle la
 */
function loadgame()
{
	const pos = new Pos(0, 0);
	const user = new Entity(pos,null , 0);
    const scroll = new Scroll(0, 1000, 0,context, canvas, user);
	user.updateScore();

    user.playerReset();
    scroll.start();
}

loadgame();
