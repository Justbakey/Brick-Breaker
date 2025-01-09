//main.js
import Paddle from './paddle.js';
import Brick from './brick.js';
import Ball from './ball.js';

const canvas = document.getElementById('gameCanvas');

 const ctx = canvas.getContext('2d');

    const keys = {
        left: false,
        right: false
    };

const paddle =new Paddle(canvas.width, canvas.height);

const ball = new Ball(canvas.width, canvas.height);

window.addEventListener("gamepadconnected", (event) => {
    console.log("Gamepad connected:", event.gamepad);
});


function handleGamepadInput() {
    const gamepad = navigator.getGamepads()[0]; // Get the first connected gamepad
    if (gamepad) {
        const axis = gamepad.axes[0]; // Use the left stick's horizontal axis
        if (axis < -0.5) {
            return "left"
        } else if (axis > 0.5) {
            return "right"
        } else {
            
        }
    }
    return null
}


document.addEventListener('keydown', (event) => {
    switch (event.key) {

        case 'ArrowLeft':
        keys.left = true
        break;

        case 'ArrowRight':
        keys.right = true
        break;
    
    }
});
document.addEventListener('keyup', (event) => {
    switch(event.key){

    case 'ArrowLeft':
        keys.left = false
         break;

    case 'ArrowRight':
       keys.right = false
    break;
    }
});

function handleInput () {
const gamepadInput = handleGamepadInput();

if (gamepadInput === "left" || keys.left) {
    paddle.moveLeft();

}   else if (gamepadInput === "right" || keys.right){
        paddle.moveRight();
    } else {
        paddle.stop ();
    }
  
}




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
    handleInput();
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