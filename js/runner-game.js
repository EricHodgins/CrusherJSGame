var runner = runner || {};
runner.Game = function() {
	function RunnerGame() {
		console.log("Runner Game init");
		// get canvas and attach to easeljs
		this.canvas = document.getElementById('game-canvas');
		this.stage = new createjs.Stage(this.canvas);

		// Camera
		this.camera = new createjs.Container();
		this.stage.addChild(this.camera);

		// creat a heartbeat for the game
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", this.tick.bind(this));

		this.initGame();
	}

	var p = RunnerGame.prototype; // link RunnerGame to prototype

	p.initGame = function() {
		var lastPlatformX = 10;
		var lastPlatformY = this.canvas.height;
		var platformCount = this.canvas.width / 120;

		var hero = this.hero = new runner.Hero();
		hero.x = 100;
		hero.y = 100;
		this.camera.addChild(hero);

		for (var j=0; j < 5; j++) {
			for (var i=0; i < platformCount; i++) {
				var platform = new runner.Platform();
				platform.x = lastPlatformX;
				platform.y = lastPlatformY;

				this.camera.addChild(platform);

				lastPlatformX += 150;

			}

			lastPlatformX = 10;
			lastPlatformY += 75;
		}

		this.stage.on('stagemousedown', function() {
			hero.jump();
		});

		this.stage.on('stagemousedown', function() {

		});

		this.stage.on('stagemouseup', function() {

		});

		document.onkeydown = this.keyDown.bind(this);
		document.onkeyup = this.keyUp.bind(this);
	}


	p.keyUp = function(key) {
		if (this.hero.onGround) {
			this.hero.velocity.x = 0;
		}

		// stop player from moving after jumping or falling to a new platform when there's nothing being pressed.
		this.hero.playerInput = false;
	}

	p.keyDown = function(key) {
		this.hero.playerInput = true;
		switch (key.keyCode) {
			case KEYCODES["KEY_UP"]:
				this.hero.jump();
				break;
			case KEYCODES["KEY_RIGHT"]:
				this.hero.moveRight();
				break;
			case KEYCODES["KEY_LEFT"]:
				this.hero.moveLeft();
				break;
		}
	}


	p.heroHitsPlatform = function(point) {
		var distanceY = -point.y;
		if (this.hero.velocity.y > 0) {
			this.hero.y += distanceY;
			this.hero.velocity.y = 0;
		}

		if (!this.hero.playerInput) {
			this.hero.velocity.x = 0;
		}

		this.hero.onGround = true;
	}

	p.resolveCollsion = function() {
		this.hero.onGround = false;
		// hero is on platform
		this.gameObjectHitHero("platform", this.heroHitsPlatform.bind(this));
	}

	p.gameObjectHitHero = function(category, hitCallback) {
		// loop all gameobjects
		var len = this.camera.children.length;
		for (var i = 0; i < len; i++) {
			var gameObject = this.camera.children[i];

			if (gameObject.category === category) {
				//loop collision points
				for (var j in this.hero.collisionPoints) {
					var collisionPoint = this.hero.collisionPoints[j];
					var point = this.hero.localToLocal(collisionPoint.x, collisionPoint.y, gameObject);
					if (gameObject.hitpoint(point)) {
						hitCallback(point);
					}
				}
			}
		}
	}


	p.updateView = function() {
		this.stage.update();
	}

	p.tick = function() {
		this.updateView();
		this.moveCamera();
		this.moveHero();
		this.resolveCollsion();
	}

	p.moveCamera = function() {
		this.camera.y -= 1;
	}

	p.moveHero = function() {
		this.hero.y += this.hero.velocity.y;
		this.hero.x += this.hero.velocity.x;
	}


	return RunnerGame;
}(); // self invoked function