class Grass {
    constructor(x, y,) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        console.log(emptyCells);
        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}





// GrasEater






class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.getNewCoordinates();
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);

            this.x = newX;
            this.y = newY;
        } else {
            if (this.energy < 0) {
                this.die();
            }
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell && this.energy >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 6;
        }

    }

    eat() {
        this.getNewCoordinates();
        var grassCells = this.chooseCell(1);
        var newCell = grassCells[Math.floor(Math.random() * grassCells.length)];

        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }
    }

}




// Predator






class EaterPredator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.getNewCoordinates();
        
        var newCell = random(this.chooseCell(0));
        // this.energy--;

        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            var newEaterPredator = new EaterPredator(newX, newY);
            eaterPredatorArr.push(newEaterPredator);

            this.x = newX;
            this.y = newY;
            this.energy--;
            

        } else {
            if (this.energy < 0) {
                this.die();
            }
        }
    }

    mul() {
        this.getNewCoordinates();

        var newCell = random(this.chooseCell(0));

        if (this.energy >=10 && newCell) {
            
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newEaterPredator = new EaterPredator(newX, newY);
            eaterPredatorArr.push(newEaterPredator);
            this.energy = 6;
        }

    }

    eat() {
        this.getNewCoordinates();

        var newCell = random(this.chooseCell(2));

        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in eaterPredatorArr) {
            if (this.x == eaterPredatorArr[i].x && this.y == eaterPredatorArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

}




// -----------------------------------------

// Winter Grass

// -----------------------------------------






class WinterGrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.getNewCoordinates();
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            var newWinterGrass = new WinterGrass(newX, newY);
            winterGrassArr.push(newWinterGrass);

            this.x = newX;
            this.y = newY;
        } else {
            if (this.energy < 0) {
                this.die();
            }
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell && this.energy >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newWinterGrass = new WinterGrass(newX, newY);
            winterGrassArr.push(newWinterGrass);
            this.energy = 6;
        }

    }

    eat() {
        this.getNewCoordinates();
        var grassCells = this.chooseCell(1);
        var newCell = grassCells[Math.floor(Math.random() * grassCells.length)];

        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in winterGrassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in winterGrassArr) {
            if (this.x == winterGrassArr[i].x && this.y == winterGrassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }
    }

}

// ------------------------------

// Lethal

// ------------------------------





// class Lethal {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.energy = 8;
//         this.directions = [];
//     }

//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }

//     chooseCell(character) {
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }
//     move() {
//         this.getNewCoordinates();
//         this.energy--;
//         var emptyCells = this.chooseCell(0);
//         var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
//         if (newCell && this.energy >= 0) {
//             var newX = newCell[0];
//             var newY = newCell[1];
//             matrix[newY][newX] = matrix[this.y][this.x];
//             matrix[this.y][this.x] = 0;

//             var newLethal = new Lethal(newX, newY);
//             lethalArr.push(newLethal);

//             this.x = newX;
//             this.y = newY;
//         } else {
//             if (this.energy < 0) {
//                 this.die();
//             }
//         }
//     }

//     mul() {
//         var emptyCells = this.chooseCell(0);
//         var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
//         if (newCell && this.energy >= 12) {
//             var newX = newCell[0];
//             var newY = newCell[1];
//             matrix[newY][newX] = 2;

//             var newLethal = new Lethal(newX, newY);
//             lethalArr.push(newLethal);
//             this.energy = 6;
//         }

//     }

//     eat() {
//         this.getNewCoordinates();
//         var grassCells = this.chooseCell(1);
//         var newCell = grassCells[Math.floor(Math.random() * grassCells.length)];

//         if (newCell) {
//             this.energy++
//             var newX = newCell[0];
//             var newY = newCell[1];

//             matrix[newY][newX] = matrix[this.y][this.x];
//             matrix[this.y][this.x] = 0;
//             this.x = newX;
//             this.y = newY;

//             for (var i in lethalArr) {
//                 if (newX == grassArr[i].x && newY == grassArr[i].y) {
//                     grassArr.splice(i, 1);
//                     break;
//                 }
//             }
//         } else {
//             this.move();
//         }
//     }

//     die() {
//         matrix[this.y][this.x] = 0;
//         for (var i in lethalArr) {
//             if (this.x == lethalArr[i].x && this.y == lethalArr[i].y) {
//                 grassArr.splice(i, 1);
//                 break;
//             }
//         }
//     }

// }






