var socket = io();

var side = 10;
var matrix = []
// let grassCountElement = document.getElementById('grassCount');
// let grassEaterCountElement = document.getElementById('grassEaterCount');


var weath = 'summer'
function setup() {
    createCanvas(50 * side, 50 * side);
    background("pink");

    let grassElementCount = document.getElementById('grassCount');
    let grasseaterElementCount = document.getElementById('grasseaterCount');
    let gishatichElementCount = document.getElementById('gishatichCount');
    let cursedareaElementCount = document.getElementById('cursedareaCount');
    let crichElementCount = document.getElementById('crichCount');


socket.on("weather", function (data) {
    weath = data;
})

socket.on('data', nkarel)

function nkarel(data) {
    console.log(data);
    matrix = data.matrix
    grassElementCount.innerText = data.grassCount;
    grasseaterElementCount.innerText = data.grasseaterCount;
    gishatichElementCount.innerText = data.gishatichCount;
    cursedareaElementCount.innerText = data.cursedareaCount;
    crichElementCount.innerText = data.crichCount;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1){
                if(weath == "summer") {
                fill("green");
            }else if (weath == "autumn") {
                fill("#333300");
            }else if (weath == "winter") {
                fill("white");
            }else if (weath == "spring") {
                fill("#4dffa6");
            }
        }else if (obj == 2) {
                fill("yellow");
            }else if (obj == 0){
                fill("grey")
            }else if(obj == 3){
                fill("red")
            }else if(obj == 4){
                fill("cyan")
            }else if(obj == 5){
                fill("orange")
            }

            rect(x * side, y * side, side, side);
        }
    }
}

}


function kill() {
    
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addGishatich() {
    socket.emit("add Gishatich")
}
function addCursedArea() {
    socket.emit("add CursedArea")
}
function addCrich() {
    socket.emit("add Crich")
}

