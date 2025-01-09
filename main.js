//main.js
import Paddle from './paddle.js';
import Brick from './brick.js';
import Ball from './ball.js';

const canvas = document.getElementById('gameCanvas');

 const ctx = canvas.getContext('2d');

    

const paddle =new Paddle(canvas.width, canvas.height);

const ball = new Ball(canvas.width, canvas.height);

document.addEventListener('keydown', (event) => {
    switch (event.key) {

        case 'ArrowLeft':
        paddle.moveLeft();
        break;

        case 'ArrowRight':
        paddle.moveRight();
        break;
    
    }
});
document.addEventListener('keyup', (event) => {
    switch(event.key){

    case 'ArrowLeft':
    case 'ArrowRight':
    paddle.stop();
    break;
    }
});
const rows =5;
const cols =9;
const brickwidth = 75;
const brickheight =20;;
const brickPadding = 10;
const brickoffsettop =50;
const brickoffsetleft = 20;

const bricks = [];

for (let row = 0; row < rows; row++) {
    
    bricks[row] = [];

    for (let col = 0; col < cols; col++) {

 const x = col * (brickwidth + brickPadding) + brickoffsetleft;
 const y = row * (brickheight + brickPadding) + brickoffsettop;
 
 bricks[row][col] = new Brick (x, y, brickwidth, brickheight, row);


    }
}
window.score = { value: 0 }; 

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    paddle.update();
    paddle.draw(ctx);

    ball.update(paddle, bricks, score);
    ball.draw(ctx);

    bricks.forEach(row => row.forEach(brick => brick.draw(ctx)))
    if (!bricksLeft ())
    {
        alert ("win");
        bricks.forEach(row => row.forEach(brick => {
            brick.hp =Math.random()*5;
            brick.visible = true;
            ball.reset();
        }));
    }
    ctx.font = '20px Arial';
    ctx.fillStyle  = '#FFFFFF';
    ctx.fillText(`score: ${score.value}`,10,20);
    requestAnimationFrame(gameLoop);
}
function bricksLeft () {
    let result = false;
    bricks.forEach(row => row.forEach(brick => {
        if (brick.visible) result = true;

    }));
    return result;
}
gameLoop();