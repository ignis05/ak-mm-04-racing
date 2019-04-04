var canvas;
var settings = {
    keybinds: [],
    keyspressed: [],
}
var img1
document.addEventListener("DOMContentLoaded", async () => {
    console.log("loaded");
    img1 = new Image(40, 40);
    img1.src = `./img/moto1.png`
    img1.onload = () => {
        var controls = new Controls(settings, document.getElementById("controls"))
        canvas = new Canvas(settings, document.getElementById("canvas"))
    }

    // debug
    // - cordinates for measuring
    document.getElementById("canvas").addEventListener("mousemove", function (e) {
        // console.log(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
    })
    // enddebug

})