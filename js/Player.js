class Player {
    constructor(startposX, startposY, ctx) {
        this.posX = startposX
        this.posY = startposY
        this.velocity = 2
        this.direction = Math.PI / 2
        this.ctx = ctx
    }
    updatePos() {
        this.posX += this.velocity * Math.sin(this.direction)
        this.posY += this.velocity * Math.cos(this.direction)
    }
    turn() {
        this.direction += 0.05
    }
    draw() {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(this.posX, this.posY, 10, 10);
    }
}