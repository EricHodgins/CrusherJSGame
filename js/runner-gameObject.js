var runner = runner || {}
// Gameobject to setup inheritance 
runner.GameObject = (function() {
	function GameObject() {
		this.initialize();
	}

	var p = GameObject.prototype = new createjs.Container();

	// reference the super initialize before
	// overriding the initialize method.
	p.Container_initialize = p.initialize;
	p.initialize = function() {
		this.Container_initialize();

		this.category = "object";

		this.width = 0;
		this.height = 0;
	}

	p.hitpoint = function(point) {
		if (point.x >= 0 && point.x <= this.width &&
			point.y >= 0 && point.y <= this.height) {
			return true;
		} 
	}

	return GameObject;
})();