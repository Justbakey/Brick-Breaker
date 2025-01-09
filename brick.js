//brick.js
export default class Brick {
constructor(x,y,width, height, hp) {
   
    
  
    this.width = width;
    this.height = height;
    this.visible = true;
    this.position = { x, y };
    this.hp = hp;

} 

draw(ctx){
   if (!this.visible) return;
   
        ctx.fillStyle = `hsl(${this.hp * 60}, 70%, 50%)`;
   
   ctx.fillRect(this.position.x, this.position.y, this.width, this.height);


}
isHit(ball) {
    if (!this.visible) return false;

    const withinxrange = ball.position.x > this.position.x &&
                         ball.position.x <this.position.x + this.width;

                         const withinyrange = ball.position.y - ball.radius < this.position.y + this.height &&
                         ball.position.y + ball.radius > this.position.y;
    



                         return withinxrange && withinyrange;
}

}