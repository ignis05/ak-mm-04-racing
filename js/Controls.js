class Controls {
    constructor(settings, DOMElement) {
        this.DOMElement = DOMElement
        this.settings = settings

        this.createPanel()

        this.showKeybinders(1)
        this.settings.players = 1
    }
    createPanel() {
        let set = document.createElement("div")
        set.id = "mainsettings"
        this.DOMElement.appendChild(set)

        let label = document.createElement("label")
        label.innerText = "Players:"
        set.appendChild(label)

        this.select = document.createElement("select")
        for (let i = 1; i <= 4; i++) {
            let opt = document.createElement("option")
            opt.value = i
            opt.innerHTML = i
            this.select.appendChild(opt)
        }
        label.appendChild(this.select)
        this.select.style.marginLeft = "10px"

        let label2 = document.createElement("label")
        label2.innerText = "Rounds:"
        set.appendChild(label2)
        var select2 = document.createElement("select")
        label2.appendChild(select2)
        select2.style.marginLeft = "10px"
        for (let i = 1; i <= 5; i++) {
            let opt = document.createElement("option")
            opt.value = i
            opt.innerHTML = i
            select2.appendChild(opt)
        }
        select2.addEventListener("change", () => {
            let nr = select2.value
            this.settings.rounds = nr
            console.log(`changed rounds to ${nr}`);
        })

        this.keybindsDiv = document.createElement("div")
        this.keybindsDiv.id = "keybinds"
        this.DOMElement.appendChild(this.keybindsDiv)

        this.select.addEventListener("change", () => {
            let nr = this.select.value
            this.settings.players = nr
            console.log(`changed players to ${nr}`);
            this.showKeybinders(nr)
        })

        let start = document.createElement("button")
        start.id = "btStart"
        start.innerHTML = "START"
        start.addEventListener("click", () => {
            let ok = true
            for (let i = 1; i <= this.settings.players; i++){
                if(this.settings.keybinds[i] == undefined) ok = false
            }
            if(ok){
                canvas.startGame()
            }
            else {
                window.alert("Not all keybinds are assigned")
            }
        })
        set.appendChild(start)

    }
    showKeybinders(players) {
        this.keybindsDiv.innerHTML = ""
        for (let i = 1; i <= players; i++) {
            let cont = document.createElement("div")
            cont.classList.add("keybindCont")
            this.keybindsDiv.appendChild(cont)

            let label = document.createElement("div")
            label.innerText = `Player ${i}:`
            cont.appendChild(label)

            let inp = document.createElement("input")
            if (this.settings.keybinds[i]) {
                inp.value = this.settings.keybinds[i]
            }
            inp.addEventListener("keydown", e => {
                inp.value = e.code
                this.settings.keybinds[i] = e.code
                inp.blur()
            })
            cont.appendChild(inp)
        }
    }
}