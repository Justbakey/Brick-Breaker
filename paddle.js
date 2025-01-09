// paddle.js

export default class Paddle {
    constructor(canvasWidth, canvasHeight) {
        // paddle dimensions
        this.width = 100;
        this.height = 20;

        this.position = {
            x: canvasWidth / 2 - this.width / 2,
            y: canvasHeight - this.height -10
        };

        this.speed = 0;
        this.maxSpeed = 5;
    
        this.canvasWidth =canvasWidth;
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight(){
        this.speed = this.maxSpeed;
    }
    stop() {
        this.speed = 0;
    }
    update(){
        this.position.x += this.speed;

        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x > this.canvasWidth - this.width) {
            this.position.x = this.canvasWidth - this.width;

        }
    }
    draw(ctx) {
        ctx.fillStyle ='#C0C0C0';

        ctx.fillRect (this.position.x, this.position.y, this.width, this.height);
    }       
}
