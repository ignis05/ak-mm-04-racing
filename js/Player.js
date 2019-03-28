class Player {
    constructor(startposX, startposY, ctx) {
        this.posX = startposX
        this.posY = startposY
        this.velocity = 2
        this.direction = Math.PI / 2
        this.ctx = ctx
        this.trail = new Array()
    }
    updatePos() {
        this.posX += this.velocity * Math.sin(this.direction)
        this.posY += this.velocity * Math.cos(this.direction)
        this.trail.push({ x: this.posX, y: this.posY })
    }
    turn() {
        this.direction += 0.05
    }
    draw() {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(this.posX - 5, this.posY - 5, 10, 10);
        this.drawTrail()
    }
    drawTrail() {
        let ctx = this.ctx
        ctx.beginPath();
        ctx.lineWidth = 10;
        this.trail.forEach(cords => {
            ctx.lineTo(cords.x, cords.y)
        })
        // ctx.closePath()
        ctx.strokeStyle = "#000000"
        ctx.stroke()
    }
}