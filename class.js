class Grass {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.multiply = 4;
		this.index = index;

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


	chooseCell(num) {
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == num) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}

	mul() {
		this.multiply++;
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);
		if (newCell && this.multiply >= 8) {

			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = new Grass(newX, newY, 1);

			this.multiply = 4;
		}
	}
}


class GrassEater {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.energy = 20;
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



	chooseCell(num) {
		this.getNewCoordinates();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == num) {
					found.push(this.directions[i]);
				}
				else {
					var obj = matrix[y][x];
					if (obj.index == num) {
						found.push(this.directions[i]);
					}
				}
			}
		}
		return found;
	}

	move() {
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
		}

		this.energy--;
		if (this.energy <= 0) {
			this.die();
		}
	}

	eat() {
		var grassCells = this.chooseCell(1);
		var newCell = random(grassCells);

		if (newCell) {

			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
			this.energy++;

			if (this.energy >= 1) {
				this.mul();
			}
		}
		else {
			this.move();
		}
	}

	mul() {
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = new GrassEater(newX, newY, 2);
			this.energy = 20;
		}
	}

	die() {
		matrix[this.y][this.x] = new Cursedarea(this.x, this.y, 4);
	}
}

class Gishatich {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.energy = 10;
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

	chooseCell(num) {
		this.getNewCoordinates();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == num) {
					found.push(this.directions[i]);
				}
				else {
					var obj = matrix[y][x];
					if (obj.index == num) {
						found.push(this.directions[i]);
					}
				}
			}
		}
		return found;
	}

	move() {
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
		}

		this.energy--;


		if (this.energy <= 0) {
			this.die();
		}
	}
	eat() {
		var grasseaterCells = this.chooseCell(2);
		var newCell = random(grasseaterCells);

		if (newCell) {

			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
			this.energy += 2;

			if (this.energy >= 20) {
				this.mul();
			}
		}
		else {
			this.move();
		}
	}

	mul() {

		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = new Gishatich(newX, newY, 3);
			this.energy = 3;
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
	}
}


class Cursedarea {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.energy = 7;
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

	chooseCell(num) {
		this.getNewCoordinates();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == num) {
					found.push(this.directions[i]);
				}
				else {
					var obj = matrix[y][x];
					if (obj.index == num) {
						found.push(this.directions[i]);
					}
				}
			}
		}
		return found;
	}


	eat() {
		var grasseaterCells = this.chooseCell(2);
		var newCell = random(grasseaterCells);

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = 0;

			


		}

	}
	
}





class Crich {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.energy = 0;
	}

	spred() {
		this.energy++;
		if (this.energy > 50) {
			for (var y = 0; y < matrix.length; y++) {
				for (var x = 0; x < matrix[y].length; x++) {
					console.log("SHATACAV")
					var obj = matrix[y][x]
					if (obj == 0 || obj.index == 1 || obj.index == 2 || obj.index == 3) {
						let a = Math.floor(Math.random() * 100);
						if (a < 70) {
							matrix[y][x] = new Grass(x, y, 1);
						}
						else if (a < 90) {
							matrix[y][x] = new GrassEater(x, y, 2);
						}
						else if (a >= 10 && a < 80) {
							matrix[y][x] = new Gishatich(x, y, 3);
						}
					}
				}
			}

			this.energy = 0;

		}
	}
}
