class Canvas {
    constructor(settings, canvas) {
        this.settings = settings
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.addListeners()
    }
    addListeners(){
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
}