var canvas;
var settings = {
    keybinds: [],
    keyspressed: [],
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded");
    var controls = new Controls(settings, document.getElementById("controls"))
    canvas = new Canvas(settings, document.getElementById("canvas"))
})