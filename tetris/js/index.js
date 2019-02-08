import Scroll from '/js/Scroll.js';
import Entity from '/js/Entity.js';
import Pos from '/js/Pos.js';

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

function loadgame()
{
	const pos = new Pos(0, 0);
	const user = new Entity(pos,null , 0);
    const scroll = new Scroll(0, 1000, 0,context, canvas, user);
	user.updateScore();

    user.playerReset();
    scroll.start();
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}
loadgame();
