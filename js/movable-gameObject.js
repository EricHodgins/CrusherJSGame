var runner = runner || {};
runner.MovableGameObject = function() {
	function MovableGameObject() {
		this.initialize();
	}

	var p = MovableGameObject.prototype = new runner.GameObject();

	p.GameObject_initialize = p.initialize;
	p.initialize = function() {
		this.GameObject_initialize();

		this.velocity = new createjs.Point(0, 0);

		// gravity (downward speed)
		this.dropSpeed = 0.5;

		// on ground?
		this.onGround = false;

		// give a heartbeat to a movable game object
		this.addEventListener("tick", this.tick.bind(this));
	}

	p.tick = function() {
		// apply gravity
		this.velocity.y += this.dropSpeed;
		this.velocity.y = Math.min(this.velocity.y, 5);

		// going sidways
		this.velocity.x = Math.min(this.velocity.x, 5);
	}

	return MovableGameObject;
}();