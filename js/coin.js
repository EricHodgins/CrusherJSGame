var runner = runner || {};

runner.Coin = function() {
	function Coin() {
		this.initialize();
	}

	var p = Coin.prototype = new runner.GameObject();

	p.GameObject_initialize = p.initialize;
	p.initialize = function() {
		this.GameObject_initialize();

		this.category = "coin";
		this.height = 10;
		this.width = 10;

		this.regX = this.width / 2;
		this.regY = this.height;

		var shape = new runner.CommonShapes.rectangle({
			width: this.width,
			height: this.height,
			fillColor: "orange"
		});

		this.addChild(shape);
	}

	return Coin;
}();