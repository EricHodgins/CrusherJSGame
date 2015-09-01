var runner = runner || {};
runner.Hero = function() {
	function Hero() {
		this.initialize();
	}

	var p = Hero.prototype = new runner.MovableGameObject();

	p.MovableGameObject_initialize = p.initialize;
	p.initialize = function() {
		this.MovableGameObject_initialize();

		this.category = "hero";
		this.width = 10;
		this.height = 15;

		this.jumping = false;

		// registration points (anchors)
		this.regY = this.height;
		this.regX = this.width/2;

		// collision points
		this.collisionPoints = [
			new createjs.Point(this.width/2, this.height),
		];


		var shape = runner.CommonShapes.rectangle({
			width: this.width,
			height: this.height,
			fillColor: "#4B4B84"
		});

		this.addChild(shape);

		// add heartbeat
		this.addEventListener("tick", this.tick.bind(this));
	}

	p.jump = function() {
		if (this.onGround) {
			this.velocity.y = -10;
		}
	}

	p.moveRight = function() {
		this.velocity.x = 2;
	}

	p.MovableGameObject_tick = p.tick;
	p.tick = function() {
		this.MovableGameObject_tick();
	}

	return Hero;

}();