var runner = runner || {};

runner.CrushObject = function() {
	function Crusher(points) {
		this.initialize(points);
	}

	var p = Crusher.prototype = new runner.GameObject();
	p.GameObject_initialize = p.initialize;
	p.initialize = function(points) {
		this.GameObject_initialize();
		this.crusherCoords = points;
		this.category = "triangle";

		this.width = 14;
		this.height = 20;


		// draw shape
		var shape = new runner.CommonShapes.triangle({
			pt1: {x: this.crusherCoords.pt1.x, y: this.crusherCoords.pt1.y},
			pt2: {x: this.crusherCoords.pt2.x, y: this.crusherCoords.pt2.y},
			pt3: {x: this.crusherCoords.pt3.x, y: this.crusherCoords.pt3.y},
			fillColor: "red"
		});

		this.addChild(shape);
	}


	return Crusher;
}();

