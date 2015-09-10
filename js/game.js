// window/global scope
var runner = runner || {}

var KEYCODES = {
	"KEY_LEFT": 37,
	"KEY_RIGHT": 39,
	"KEY_UP": 38,
	"KEY_DOWN": 40
}

window.onload = function() {
	// entry point
	runner.game = new runner.Game();
}