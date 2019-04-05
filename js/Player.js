class Player {
    constructor(startposX, startposY, ctx, color, velociy, turning, rounds, nr) {
        console.log("vel= ", velociy);
        console.log("turn= ", turning);
        this.nr = nr
        this.posX = startposX
        this.posY = startposY
        this.velocity = velociy
        this.turning = turning
        this.direction = Math.PI / 2
        this.ctx = ctx
        this.trail = new Array()
        this.color = color
        this.rounds = rounds
        this.round = 0
        this.checkpoint = false
        this.active = true
        switch (nr) {
            case 1:
                this.image = img1
                break;
            case 2:
                this.image = img2
                break;
            case 3:
                this.image = img3
                break;
            case 4:
                this.image = img4
                break;
        }
    }
    updatePos() {
        if (this.checkCollision() && this.round < this.rounds) {
            this.posX += this.velocity * Math.sin(this.direction)
            this.posY += this.velocity * Math.cos(this.direction)
        }
        this.trail.push({ x: this.posX, y: this.posY })
        if (this.trail.length > 500) this.trail.shift()
    }
    turn() {
        this.direction += this.turning
    }
    draw() {
        // this.ctx.fillStyle = this.color
        // this.ctx.fillRect(this.posX - 5, this.posY - 5, 10, 10);
        this.drawImage(this.ctx, this.image, this.posX - 20, this.posY - 20, 40, 40, this.direction)
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
    checkCollision() {
        // 800 x 400
        // rightTurn (600, 200)
        // leftTurn (200, 200)
        //  radius = <67, 200>
        let x = this.posX
        let y = this.posY
        let distFromRight = Math.sqrt(((600 - x) * (600 - x)) + ((200 - y) * (200 - y)))
        let distFromLeft = Math.sqrt(((200 - x) * (200 - x)) + ((200 - y) * (200 - y)))
        if ((y > 0 && y < 135) || (y > 270 && y < 400)) {// on straight path
            if (x > 200 && x < 600) { // not on turn
                // console.log("straight");
                return true
            }
        }
        if ((x >= 600 || x <= 200) && ((distFromRight > 67 && distFromRight < 200) || (distFromLeft > 67 && distFromLeft < 200))) { // on turn
            // console.log("turn");
            return true
        }
        if (this.active) this.active = false
        return false
    }
    checkRound() {
        // console.log("check");
        let ctx = this.ctx
        let width = 800

        ctx.strokeStyle = 'rgba(0,0,0,0)';


        // meta
        ctx.beginPath()
        ctx.moveTo(300, 270)
        ctx.lineTo(300, 400)
        ctx.lineWidth = 6
        ctx.stroke()
        if (ctx.isPointInStroke(this.posX, this.posY)) {
            if (this.checkpoint) {
                this.round++
                this.checkpoint = false
                console.log("round: ", this.round);
            }
        }

        // checkpoint
        ctx.beginPath()
        ctx.moveTo(width - 300, 0)
        ctx.lineTo(width - 300, 135)
        ctx.lineWidth = 6
        ctx.stroke()
        if (ctx.isPointInStroke(this.posX, this.posY)) {
            this.checkpoint = true
            console.log("checkpoint!");
        }
    }
    drawImage(ctx, image, x, y, w, h, degrees) {
        ctx.save();
        ctx.translate(x + w / 2, y + h / 2);
        ctx.rotate(-degrees + Math.PI);
        ctx.translate(-x - w / 2, -y - h / 2);
        ctx.drawImage(image, x, y, w, h);
        ctx.restore();
    }
}