// var matrix = [
//     [0, 0, 1, 0, 0],
//     [1, 0, 2, 0, 0],
//     [0, 1, 0, 0, 3],
//     [0, 3, 1, 0, 0],
//     [1, 1, 0, 2, 0],
//     [1, 1, 0, 0, 0],
//     [1, 1, 0, 0, 2]
// ];

var matrix = [];
var rows = 35;
var columns = 35;

for (var y = 0; y < rows; y++) {
    matrix[y] = [];
    for (var x = 0; x < columns; x++) {
        var a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 85) {
            matrix[y][x] = 1;
        }
        else if (a >= 60 && a < 88) {
            matrix[y][x] = 2;
        }
        else if (a >= 90 && a < 92) {
            matrix[y][x] = 3;
        }
        else if (a >= 30 && a < 90) {
            matrix[y][x] = 4;
        }
        // else if (a >= 0 && a < 90) {
        //     matrix[y][x] = 5;
        // }
       
    }
}


var side = 20;

var grassArr = [];
var grassEaterArr = [];
var eaterPredatorArr = [];
var winterGrassArr = [];
// var lethalArr = [];

function setup() {
    frameRate();
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y);
                grassEaterArr.push(gr);
            }
            else if (matrix[y][x] == 3) {
                var gr = new EaterPredator(x, y);
                eaterPredatorArr.push(gr);
            }
            else if (matrix[y][x] == 4) {
                var gr = new WinterGrass(x, y);
                winterGrassArr.push(gr);
               
            }
            // else if (matrix[y][x] == 5) {
            //     var gr = new Lethal(x, y);
            //     lethalArr.push(gr);
               
            // }
            
        }
    }


}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("white");
            }
            // else if (matrix[y][x] == 5) {
            //     fill("#ff0000");
            // }
            
            

            rect(x * side, y * side, side, side);

        }
    }
    for (var i in grassArr) {
        try { grassArr[i].mul() } catch (err) { continue; }
    }

    for (var i in grassEaterArr) {
        try { grassEaterArr[i].eat() } catch (err) { continue };
        try { grassEaterArr[i].mul() } catch (err) { continue };
    }

    for (var i in eaterPredatorArr) {
        try { eaterPredatorArr[i].eat() } catch (err) { continue };
        try { eaterPredatorArr[i].mul() } catch (err) { continue };
    } 
    for (var i in winterGrassArr) {
        try { winterGrassArr[i].eat() } catch (err) { continue };
        try { winterGrassArr[i].mul() } catch (err) { continue };
    }
    // for (var i in lethalArr) {
    //     try { lethalArr[i].eat() } catch (err) { continue };
    //     try { lethalArr[i].mul() } catch (err) { continue };
    // }
    

}












