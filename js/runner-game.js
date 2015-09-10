var runner = runner || {};
runner.Game = function() {
	function RunnerGame() {
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
		// black HUD at bottom
		var HUDyPt = this.canvas.height - 40;
		var HUD = new runner.CommonShapes.rectangle({
			x: 0,
			y: HUDyPt,
			fillColor: "black",
			width: this.canvas.width,
			height: 40
		});
		this.stage.addChild(HUD);
		// text score
		var coinsCollected = this.coinsCollected = 0;
		var coinsCollectedText = this.coinsCollectedText = new createjs.Text("Coins " + coinsCollected, "20px Robot", "orange");
		coinsCollectedText.x = 40;
		coinsCollectedText.y = this.canvas.height - 30;
		coinsCollectedText.textAlign = "center";
		coinsCollectedText.textBaseLine = "middle";
		this.stage.addChild(coinsCollectedText);


		// set camera speed
		var cameraSpeed = this.cameraSpeed = 0.5;

		var lastPlatformX = 10;
		var lastPlatformY = this.canvas.height;
		var platformCountX = this.canvas.width / 120; // how many platformw will span the canvas
		var platformCountY = 20; // how many layers of platforms will come up.

		var hero = this.hero = new runner.Hero();
		hero.x = 100;
		hero.y = 100;
		this.camera.addChild(hero);

		// Draw Platforms
		for (var j=0; j < platformCountY; j++) {
			for (var i=0; i < platformCountX; i++) {
				var platform = new runner.Platform();
				platform.x = lastPlatformX;
				platform.y = lastPlatformY;

				this.camera.addChild(platform);

				// add coins randomly to platforms
				if (Math.random() < 0.3) {
					var coin = new runner.Coin();
					coin.x = platform.x + (platform.width / 2);
					coin.y = platform.y;
					this.camera.addChild(coin);
				}

				lastPlatformX += 120;

			}

			lastPlatformX = 10;
			lastPlatformY += 55;
		}


		//Draw Triangles at top that "crush" the player
		var triPt1 = {x: 0, y: 0};
		var triPt2 = {x: 14, y: 0};
		var triPt3 = {x: 7, y: 20};
		var triXpt = 0;
		var triYpt = 0;

		var crusherCount = this.canvas.width / (triPt2.x - triPt1.x);
		for (var k = 0; k < crusherCount; k++) {
			var crusherCoords = {
				pt1: {x: triPt1.x, y: triPt1.y},
				pt2: {x: triPt2.x, y: triPt2.y},
				pt3: {x: triPt3.x, y: triPt3.y}
			}

			var triangle = new runner.CrushObject(crusherCoords);
			triangle.x = triXpt;
			triangle.y = triYpt;
			this.camera.addChild(triangle);

			var triWidth = triPt2.x - triPt1.x;
			triXpt += triWidth;
		}



		// mouse events
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

	p.resetGame = function() {
		this.camera.removeAllChildren();
		this.stage.removeChild(this.coinsCollectedText);
		this.camera.y = 0;
		createjs.Ticker.removeAllEventListeners();
		createjs.Ticker.addEventListener('tick', this.tick.bind(this));
	}

	p.gameOver = function() {
		this.resetGame();
		this.initGame();
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

	p.heroCollectsCoin = function(point, coin, i) {
		this.coinsCollected++;
		this.coinsCollectedText.text = "Coins " + this.coinsCollected;

		this.camera.removeChild(coin);
	}

	p.heroHitsCrusher = function(point, gameObject, i) {
		this.camera.removeChild(this.hero);
		this.gameOver();
	}

	p.resolveCollsion = function() {
		this.hero.onGround = false;
		// hero is on platform
		this.gameObjectHitHero("platform", this.heroHitsPlatform.bind(this));

		// hero collects coin
		this.gameObjectHitHero("coin", this.heroCollectsCoin.bind(this));

		// hero gets crushed
		this.gameObjectHitHero("triangle", this.heroHitsCrusher.bind(this));
	}

	p.gameObjectHitHero = function(category, hitCallback) {
		// loop all gameobjects
		var len = this.camera.children.length;
		for (var i = 0; i < len; i++) {
			var gameObject = this.camera.children[i];

			// if gameObject is removed we skip the object.  For now I just have it for coins and hero
			if (!gameObject) continue;

			if (gameObject.category === category) {
				//loop collision points
				for (var j in this.hero.collisionPoints) {
					var collisionPoint = this.hero.collisionPoints[j];
					var point = this.hero.localToLocal(collisionPoint.x, collisionPoint.y, gameObject);
					if (gameObject.hitpoint(point)) {
						hitCallback(point, gameObject, i);
					}
				}
			}
		}
	}


	p.makeGameObjectsStandStill = function() {
		var len = this.camera.children.length;
		for (var i = 0; i < len; i++) {
			var gameObject = this.camera.children[i];
			if (gameObject.category === "triangle") {
				gameObject.y += this.cameraSpeed;
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
		this.makeGameObjectsStandStill()
		this.resolveCollsion();
	}

	p.moveCamera = function() {
		this.camera.y -= this.cameraSpeed; // found in initialization
	}

	p.moveHero = function() {
		this.hero.y += this.hero.velocity.y;
		this.hero.x += this.hero.velocity.x;

		// if hero falls down and off screen
		if (this.hero.y > (this.canvas.height + -this.camera.y)) this.gameOver();

	}


	return RunnerGame;
}(); // self invoked function