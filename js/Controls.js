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

        this.keybindsDiv = document.createElement("div")
        this.keybindsDiv.id = "keybinds"
        this.DOMElement.appendChild(this.keybindsDiv)

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
        this.select.addEventListener("change", () => {
            let nr = this.select.value
            this.settings.players = nr
            console.log(`changed players to ${nr}`);
            this.showKeybinders(nr)
        })

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
        this.settings.rounds = 1

        let label3 = document.createElement("label")
        label3.innerText = "Speed:"
        set.appendChild(label3)
        var select3 = document.createElement("input")
        select3.type = "number"
        select3.max = 5
        select3.min = 0.5
        select3.step = 0.5
        select3.value = 2
        this.settings.speed = select3.value
        label3.appendChild(select3)
        select3.style.marginLeft = "10px"
        select3.addEventListener("change", () => {
            let nr = select3.value
            this.settings.speed = nr
            console.log(`changed speed to ${nr}`);
        })

        let label4 = document.createElement("label")
        label4.innerText = "Maneuverability:"
        set.appendChild(label4)
        var select4 = document.createElement("input")
        select4.type = "number"
        select4.max = 10
        select4.min = 1
        select4.step = 1
        select4.value = 5
        this.settings.turn = select4.value / 100
        label4.appendChild(select4)
        select4.style.marginLeft = "10px"
        select4.addEventListener("change", () => {
            let nr = select4.value
            this.settings.turn = nr / 100
            console.log(`changed speed to ${nr}`);
        })

        let start = document.createElement("button")
        start.id = "btStart"
        start.innerHTML = "START"
        start.style.padding = "5px"
        start.addEventListener("click", () => {
            let ok = true
            for (let i = 1; i <= this.settings.players; i++) {
                if (this.settings.keybinds[i] == undefined) ok = false
            }
            if (ok) {
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
        let colors = ["#000000", "#ff0000", "#00ff00", "#0000ff"]
        for (let i = 1; i <= players; i++) {
            let cont = document.createElement("div")
            cont.classList.add("keybindCont")
            this.keybindsDiv.appendChild(cont)

            let label = document.createElement("div")
            label.style.color = colors.shift()
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