var runner = runner || {}

runner.Platform = (function() {
	function Platform(width) {
		this.initialize();
	}

	var p = Platform.prototype = new runner.GameObject();
	//p.category = "platform";

	p.GameObject_initialize = p.initialize;
	p.initialize = function(width) {
		this.GameObject_initialize();
		this.width = width || 90;
		this.height = 12;

		this.category = "platform";
		
		// draw a shape to represent the platform
		var shape = new runner.CommonShapes.rectangle({
			width: this.width,
			height: this.height,
			fillColor: "#C55454"
		});
		this.addChild(shape);
	}

	return Platform;
})();