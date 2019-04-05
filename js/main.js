var canvas;
var settings = {
    keybinds: [],
    keyspressed: [],
}
var img1
var img2
var img3
var img4
var imgGrass
var imgSlag
document.addEventListener("DOMContentLoaded", async () => {
    console.log("loaded");
    img1 = new Image(40, 40);
    img1.src = `./img/moto4.png`
    img1.onload = () => {
        img2 = new Image(40, 40);
        img2.src = `./img/moto1.png`
        img2.onload = () => {
            img3 = new Image(40, 40);
            img3.src = `./img/moto2.png`
            img3.onload = () => {
                img4 = new Image(40, 40);
                img4.src = `./img/moto3.png`
                img4.onload = () => {
                    imgGrass = new Image(40, 40);
                    imgGrass.src = `./img/grass.jpg`
                    imgGrass.onload = () => {
                        imgSlag = new Image(40, 40);
                        imgSlag.src = `./img/slag.jpg`
                        imgSlag.onload = () => {
                            var controls = new Controls(settings, document.getElementById("controls"))
                            canvas = new Canvas(settings, document.getElementById("canvas"))
                        }
                    }
                }
            }
        }
    }

    // debug
    // - cordinates for measuring
    document.getElementById("canvas").addEventListener("mousemove", function (e) {
        // console.log(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
    })
    // enddebug

})