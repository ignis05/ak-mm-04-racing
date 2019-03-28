class Canvas {
    constructor(settings, canvas) {
        this.settings = settings
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.radius = (this.canvas.height / 2) - (this.ctx.lineWidth / 2)
        this.players = new Array()
        this.addListeners()
        this.render()
    }

    render() {
        var rendering = () => {
            this.renderTrack()
            this.updatePlayers()
            requestAnimationFrame(rendering)
        }
        rendering()
    }

    updatePlayers() {
        this.players.forEach((player, index) => {
            if (settings.keyspressed[index + 1]) {
                player.turn()
            }
            player.updatePos()
            player.drawTrail()
        })
        this.players.forEach(player => {
            player.draw()
        })
    }

    addListeners() {
        // handles multiple key controling by passing their status to settings.keyspressed[player] (keyspressed array starts with 1)

        document.addEventListener("keydown", e => {
            if (this.settings.keybinds.includes(e.code)) {
                let player = this.settings.keybinds.indexOf(e.code)
                this.settings.keyspressed[player] = true;
            }
        })

        document.addEventListener("keyup", e => {
            if (this.settings.keybinds.includes(e.code)) {
                let player = this.settings.keybinds.indexOf(e.code)
                this.settings.keyspressed[player] = false;
            }
        })
    }

    renderTrack() {
        this.renderBg()
        this.renderOuterTrack()
        this.renderInnerTrack()
    }
    renderBg() {
        let ctx = this.ctx
        let canvas = this.canvas

        ctx.beginPath();
        ctx.moveTo(0, 0)
        ctx.lineTo(canvas.width, 0)
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        ctx.fillStyle = "green";
        ctx.fill()
    }
    renderOuterTrack() {
        let ctx = this.ctx
        let canvas = this.canvas

        ctx.beginPath();
        ctx.lineWidth = 6;
        let rightDist = canvas.width - (canvas.height / 2)
        ctx.arc((canvas.height / 2), (canvas.height / 2), (this.radius), (Math.PI / 2), (-Math.PI / 2));
        ctx.arc(rightDist, (canvas.height / 2), (this.radius), (-Math.PI / 2), (Math.PI / 2));
        ctx.closePath();

        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill()
    }
    renderInnerTrack() {
        let ctx = this.ctx
        let canvas = this.canvas

        ctx.beginPath();
        ctx.lineWidth = 6;
        let rightDist = canvas.width - (canvas.height / 2)
        ctx.arc((canvas.height / 2), (canvas.height / 2), (this.radius / 3), (Math.PI / 2), (-Math.PI / 2));
        ctx.arc(rightDist, (canvas.height / 2), (this.radius / 3), (-Math.PI / 2), (Math.PI / 2));
        ctx.closePath();

        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.stroke();
        ctx.fillStyle = "green";
        ctx.fill()
    }

    startGame() {
        this.players = []
        let colors = ["#000000", "#ff0000", "#00ff00", "#0000ff"]
        console.log("starting game");
        for (let i = 0; i < this.settings.players; i++) {
            console.log("adding player");
            let player = new Player(300, 300 + (i * 20), this.ctx, colors.shift(), this.settings.speed, this.settings.turn)
            this.players.push(player)
        }
    }
}