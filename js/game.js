// window/global scope
var runner = runner || {}

window.onload = function() {
	// entry point
	console.log("entry point");
	runner.game = new runner.Game();
}