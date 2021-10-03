let LivingCreature = require('./LivingCreature')

module.exports = class Gishatich extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);
		this.energy = 6
	}



	move() {
		var emptyCells = this.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

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
		var GrassEaterCells = this.chooseCell(2);
		var newCell =  GrassEaterCells[Math.floor(Math.random() * GrassEaterCells.length)]

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
