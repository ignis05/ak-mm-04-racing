var settings = {
    keybinds: [],
    keyspressed: [],
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded");
    new Controls(settings, document.getElementById("controls"))
    new Canvas(settings, document.getElementById("canvas"))
})