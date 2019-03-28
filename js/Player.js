class Player {
    constructor(startposX, startposY, ctx, color, velociy, turning) {
        console.log("vel= ", velociy);
        console.log("turn= ", turning);
        this.posX = startposX
        this.posY = startposY
        this.velocity = velociy
        this.turning = turning
        this.direction = Math.PI / 2
        this.ctx = ctx
        this.trail = new Array()
        this.color = color
    }
    updatePos() {
        this.posX += this.velocity * Math.sin(this.direction)
        this.posY += this.velocity * Math.cos(this.direction)
        this.trail.push({ x: this.posX, y: this.posY })
        if (this.trail.length > 500) this.trail.shift()
    }
    turn() {
        this.direction += this.turning
    }
    draw() {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.posX - 5, this.posY - 5, 10, 10);
    }
    drawTrail() {
        let trailrev = this.trail.slice(0)
        trailrev.reverse()
        trailrev.forEach((cords, index) => {
            let opacity = 255 - index
            if (opacity < 0) opacity = 0
            let hexString = (~~(opacity / 3)).toString(16);
            this.ctx.fillStyle = this.color + hexString
            this.ctx.fillRect(cords.x - 5, cords.y - 5, 10, 10);
        })
    }
}