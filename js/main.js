var canvas;
var settings = {
    keybinds: [],
    keyspressed: [],
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded");
    // debug
    document.getElementById("canvas").addEventListener("mousemove", function (e) {
        console.log(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
    })
    // enddebug
    var controls = new Controls(settings, document.getElementById("controls"))
    canvas = new Canvas(settings, document.getElementById("canvas"))
})