import createCanvas from '/js/canvas.js';
import {type_check_v1, type_check_v2, prop_access} from '/js/fonctionCours.js';
import {loadJSON, loadPieceShape} from '/js/loader.js';
import Pos from '/js/Pos.js';
import Scroll from '/js/Scroll.js';
import Entity from '/js/Entity.js';


const screen = new createCanvas(document.getElementById('tetris'));
let canvas = prop_access(screen, 'area');
let context = screen.context;


const tetrisMatrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

function draw(){
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawTetrisMatrix(values.matrix, values.position);
    updateScore();
}

//param : tetrisMatrix et décalage
//fonction : dessiner la pièce
function drawTetrisMatrix(matrix, offset){
    tetrisMatrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0){
                context.fillStyle = 'red';
                //on utilise le décalage pour l'ordonnée y et l'abscisse x
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}


//création de la pièce aléatoirement
function piecesRandom() {
    /*const pieces = 'TJLOSZI';
    values.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    values.position.y = 0;*/
}


//afficher le score de la partie
function updateScore() {
    document.getElementById('score').innerText = values.score;
}

//event pour deplacer la piece
document.addEventListener('keydown', event => {
    if (event.key === "ArrowLeft") {
        console.log("ArrowLeft");
    } else if (event.key === "ArrowRight") {
        console.log("ArrowRight");
    } else if (event.key === "ArrowDown") {
        console.log("ArrowDown");
    } else if (event.key === "q") {
        console.log("key q");
    } else if (event.key === "d") {
        console.log("key d");
    }
});

const values = {
    position : {x: 5, y:5},
    matrix: tetrisMatrix,
    score: 0
};




function loadgame()
{
    const pos = new Pos(0, 0);
    const user = new Entity(pos,0 , 0);
    const scroll = new Scroll(0, 1000, 0,context, canvas, user);
    user.playerReset();
    user.updateScore();
    scroll.start();
}

loadgame();
