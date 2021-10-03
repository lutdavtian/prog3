module.exports = class Crich {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.energy = 0;
	}

	spread() {
		this.energy++;
		if (this.energy > 50) {
			for (var y = 0; y < matrix.length; y++) {
				for (var x = 0; x < matrix[y].length; x++) {
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