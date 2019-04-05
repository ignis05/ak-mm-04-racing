class Canvas {
    constructor(settings, canvas) {
        this.running = true
        this.settings = settings
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.radius = (this.canvas.height / 2)
        this.players = new Array()
        this.addListeners()
        this.render()
    }

    render() {
        var rendering = () => {
            if (this.running) {
                this.renderTrack()
                this.updatePlayers()
                let active = this.players.length
                for (let player of this.players) {
                    if (!player.active) active--
                    if (player.round == player.rounds) {
                        window.alert(`Player ${player.nr} wins`)
                        this.running = false
                    }
                }
                if (active == 1) {
                    let winner = this.players.find(player => player.active)
                    window.alert(`Player ${winner.nr} wins`)
                    this.running = false
                }
            }
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
            player.checkRound()
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
        this.renderStartLine()
        this.renderCounter()
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

        let pat = ctx.createPattern(imgGrass, "repeat");
        ctx.fillStyle = pat;
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

        let pat = ctx.createPattern(imgSlag, "repeat");
        ctx.fillStyle = pat;
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

        let pat = ctx.createPattern(imgGrass, "repeat");
        ctx.fillStyle = pat;
        ctx.fill()
    }
    renderStartLine() {
        let ctx = this.ctx
        let canvas = this.canvas
        ctx.beginPath()
        ctx.moveTo(300, 270)
        ctx.lineTo(300, 400)
        ctx.lineWidth = 3
        ctx.strokeStyle = "rgba(0,0,0,0.5)"
        ctx.stroke()
    }
    renderCounter() {
        let ctx = this.ctx
        let canvas = this.canvas

        let round
        for (let player of this.players) {
            if (round == undefined) {
                round = player.rounds - player.round
            }
            else {
                if (player.rounds - player.round < round) round = player.rounds - player.round
            }
        }

        ctx.font = "50px Arial";
        ctx.fillStyle = "red"
        if (round) {
            ctx.fillText(round, canvas.width / 2 - 20, canvas.height / 2 + 10);
        }
    }

    startGame() {
        this.running = true
        this.players = []
        let colors = ["#000000", "#ff0000", "#00ff00", "#0000ff"]
        console.log("starting game");
        for (let i = 0; i < this.settings.players; i++) {
            // console.log("adding player");
            let player = new Player(300, 300 + (i * 20), this.ctx, colors.shift(), this.settings.speed, this.settings.turn, this.settings.rounds, i + 1)
            this.players.push(player)
        }
    }
}