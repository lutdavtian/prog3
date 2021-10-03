var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

GrassArr = [];
GrassEaterArr = [];
GishatichArr = [];
CursedAreaArr = [];
CrichArr = [];
matrix = [];

var n = 50;

weath = "winter";
Grass = require('./Grass');
GrassEater = require('./GrassEater');
CursedArea = require('./CursedArea');
Crich = require('./Crich');
Gishatich = require('./Gishatich');

function rand(min, max) {
    return Math.random() * (max - min + 1) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 5))

    }
}

io.sockets.emit("send matrix", matrix)



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1
                GrassArr.push(new Grass(x, y, 1))
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                GrassEaterArr.push(new GrassEater(x, y, 2))
            }
            else if (matrix[y][x] == 3) {
                matrix[y][y] == 3
                GishatichArr.push(new Gishatich(x, y, 3))
            }
            else if (matrix[y][x] == 4) {
                matrix[y][y] == 4
                CursedAreaArr.push(new CursedArea(x, y, 4))
            }
            else if (matrix[y][x] == 5) {
                matrix[y][y] == 5
                CrichArr.push(new Crich(x, y, 5))
            }

        }
    }
}

function game() {
    for (var i = 0; i < GrassArr; i++) {
        GrassArr[i].mul()
    }
    for (var i = 0; i < GrassEaterArr; i++) {
        GrassEaterArr[i].eat();
    }
    for (var i = 0; i < GishatichArr; i++) {
        GishatichArr[i].eat();
    }
    for (var i in CursedAreaArr) {
        CursedAreaArr[i].eat();
    }
    for (var i in CrichArr) {
        CrichArr[i].spread();
    }
    dataSend = {
        matrix: matrix,
        grassCount: GrassArr.length,
        grasseaterCount: GrassEaterArr.length,
        gishatichCount: GishatichArr.length,
        cursedareaCount: CursedAreaArr.length,
        crichCount: CrichArr.length,
    }
    io.sockets.emit("data", dataSend);
}

setInterval(game, 1000)


function kill() {
    GrassArr = [];
    GrassEaterArr = [];
    GishatichArr = [];
    CursedAreaArr = [];
    CrichArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            GrassArr.push(gr)
        }
    }
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            GrassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
}


function addGishatich() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            GishatichArr.push(new Gishatich(x, y, 3))
        }
    }
}
function addCursedArea() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            CursedAreaArr.push(new CursedArea(x, y, 4))
        }
    }
}
function addCrich() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            CrichArr.push(new Crich(x, y, 5))
        }
    }
}



function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


////

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add Gishatich", addGishatich);
    socket.on("add CursedArea", addCursedArea);
    socket.on("add Crich", addCrich);

});


var statistics = {};

setInterval(function () {
    statistics.Grass = GrassArr.length;
    statistics.GrassEater = GrassEaterArr.length;
    statistics.Gishatich = GishatichArr.length;
    statistics.CursedArea = CursedAreaArr.length;
    statistics.Crich = CrichArr.length;

    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send")
    })
}, 1000)