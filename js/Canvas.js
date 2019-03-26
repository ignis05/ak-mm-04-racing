class Canvas {
    constructor(settings, canvas) {
        this.settings = settings
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.radius = (this.canvas.height / 2) - (this.ctx.lineWidth / 2)
        this.addListeners()
        this.render()
    }

    render() {
        var rendering = () => {
            this.renderTrack()
            requestAnimationFrame(rendering)
        }
        rendering()
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
}