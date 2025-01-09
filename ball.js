//ball .js

export default class Ball {

    constructor(canvasWidth, canvasHeight) {

        this.radius = 10;
        this.position = {
            x:canvasWidth / 2,
            y:canvasHeight /2
        
        };
        this.speed = {
            x: 3,
            y: -3
        };

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.visible = true;
    }

    update(paddle, bricks) {
    if (!this.visible) return;
        this.position.x += this.speed.x /1.5; 
        this.position.y += this.speed.y /1.5;

      if (this.position.x  < this.radius || this.position.x >this.canvasWidth -this.radius) {
        this .speed.x = -this.speed.x;
       }
 
     if (this.position.y < this.radius) {
        this.speed.y = -this.speed.y;

     }
     else if (
        this.position.y +this.radius > paddle.position.y &&
        this.position.x >paddle.position.x &&
        this.position.x < paddle.position.x + paddle.width
     ){
        this.speed.y = -this.speed.y;
        const middle = paddle.position.x + (paddle.width /2);
        if (this.position.x < middle)
        {
            this.speed.x = 0 - (middle - this.position.x) /15;
        }else {
            this.speed.x = (this.position.x - middle) /15;
        }
        
     } 

     if (this.position.y > this.canvasHeight){
        console.log("Game Over")
        setTimeout(() => this.reset(), 1000);
     }
     let collisionDetected = false
     bricks.forEach(row => {
        row.forEach(brick => {
            if (!collisionDetected &&  brick.isHit(this)) {
              if(brick.hp <= 0) {
                window.score.value += 10;
                brick.visible = false;
              }else {
                brick.hp --;
              } 
                this.speed.y = -this.speed.y
             
               collisionDetected = true
            }
        });
     });
    
     
    }
    reset() {
        this.position.x = this .canvasWidth /2;
        this.position.y = this. canvasHeight /2 -this.radius * 2;
        this.visible = false

        this.speed = {
            x: (Math.random() > 0.5 ? 5 : -5),
            y:-3
        };
        setTimeout(() => {
         
        this.visible = true
        }, 800);
    }
    
    draw(ctx) {
        if (!this.visible) return;


        ctx.fillStyle = '#FF5733';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    
    }
}