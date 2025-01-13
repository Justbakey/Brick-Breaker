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
    let lives = 3;
    let isgameover = false;
    let level = 5;
    let controllerRestart = false;


  
const paddle =new Paddle(canvas.width, canvas.height);

const ball = new Ball(canvas.width, canvas.height);

window.addEventListener("gamepadconnected", (event) => {
    console.log("Gamepad connected:", event.gamepad);
});


function handleGamepadInput() {
    const gamepad = navigator.getGamepads()[0]; 
    if (!gamepad) return null; {
        const axis = gamepad.axes[0]; 
        if (axis < -0.5) {
            return "left"
        } else if (axis > 0.5) {
            return "right"
        } 
            
        
        
    }
    return null
}


function handleRestartWithController() {
    const gamepad = navigator.getGamepads()[0]; 
    if (gamepad) {
       
        if (gamepad.buttons[0].pressed && isgameover) { 
            if (!controllerRestart) { 
                restartgame(); 
            }
            controllerRestart = true; 
        } else if (!gamepad.buttons[0].pressed) {
            controllerRestart = false; 
        }
    }
}






document.addEventListener('keydown', (event) => {
    switch (event.key) {

        case 'ArrowLeft':
        keys.left = true
        break;

        case 'ArrowRight':
        keys.right = true
        break;
    
        case 'r':
        case 'R':
          restartgame(); 
        break
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

function handleLifeLoss () {
    lives -= 1;
    if (lives <= 0) {
        isgameover = true;
        controllerRestart = false;
    }else {
        ball.reset();
    }
}
function  restartgame() {
    isgameover = false;
    lives =3;
    score.value = 0;
    level = 5;
    bricks.forEach(row => row.forEach(brick => {
        brick.hp =Math.floor(Math.random()*level);
        brick.visible = true;
        ball.reset();
    }));
    
    
}

function drawGameOverScreen() {
    ctx.clearRect (0, 0, canvas.width, canvas.height);

ctx.font = '30px Arial';
ctx.fillStyle = '#FF0000';
ctx.textAlign = 'center';
ctx.fillText("Game Over",canvas.width / 2,canvas.height / 2 -20 );

ctx.font = '20px Arial';
ctx.fillStyle = '#FFFFFF';
ctx.fillText ("press r or A to Restart",canvas.width / 2, canvas.height / 2 + 20);
ctx.fillText (`Score ${score.value}`,canvas.width / 2, canvas.height / 2 + 0);
}

function gameLoop() {
    if (isgameover) {
        drawGameOverScreen();
        handleRestartWithController ();
        requestAnimationFrame(gameLoop);
        return;
    }
    handleInput();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    paddle.update();
    paddle.draw(ctx);

    ball.update(paddle, bricks, handleLifeLoss);
    ball.draw(ctx);
   
    

   

    bricks.forEach(row => row.forEach(brick => brick.draw(ctx)))
    if (!bricksLeft ())
    {
        level++
        bricks.forEach(row => row.forEach(brick => {
            brick.hp =Math.floor(Math.random()*level);
            brick.visible = true;
            ball.reset();
            
        }));
    }
    ctx.font = '20px Arial';
    ctx.fillStyle  = '#FFFFFF';
    ctx.fillText(`score: ${score.value}`,10,20);
    ctx.fillText(`Lives: ${lives}`, canvas.width - 100, 20);
    ctx.fillText(`Level: ${level -4}`, canvas.width - 450, 20);
    ctx.textAlign = "start";
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