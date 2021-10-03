let LivingCreature = require('./LivingCreature')

module.exports = class CursedArea extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);
		this.energy = 6
    }





	eat() {
		var grasseaterCells = this.chooseCell(2);
		var newCell = grasseaterCells[Math.floor(Math.random() * grasseaterCells.length)];

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = 0;

			


		}

	}
	
}

