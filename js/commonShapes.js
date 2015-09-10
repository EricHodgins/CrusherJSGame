 var runner = runner || {}

runner.CommonShapes = (function() {
	function CommonShapes() {}

	CommonShapes.rectangle = function(rect) {
		rect.strokeThickness = rect.strokeThickness || 1;
		rect.strokeColor = rect.strokeColor || "#000";
		rect.fillColor = rect.fillColor || "#000";
		rect.x = rect.x || 0;
		rect.y = rect.y || 0;
		rect.width = rect.width || 0;
		rect.height = rect.height || 0;

		// drawing the shape
		var shape = new createjs.Shape();
		if (rect.strokeThickness > 0) {
			shape.graphics.setStrokeStyle(rect.strokeThickness);
			shape.graphics.beginStroke(rect.strokeColor);
		}
		shape.graphics.beginFill(rect.fillColor);
		shape.graphics.rect(rect.x, rect.y, rect.width, rect.height);
		return shape;
	}

	CommonShapes.triangle = function(triangle) {
		triangle.pt1 = triangle.pt1 || 0;
		triangle.pt2 = triangle.pt2 || 0;
		triangle.pt3 = triangle.pt3 || 0;

		var shape = new createjs.Shape();
		shape.graphics.beginStroke(triangle.fillColor);
		shape.graphics.beginFill(triangle.fillColor);
		shape.graphics.moveTo(triangle.pt1.x, triangle.pt1.y).lineTo(triangle.pt2.x, triangle.pt2.y).lineTo(triangle.pt3.x, triangle.pt3.y);
		//shape.graphics.moveTo(0, 0).lineTo(100, 0).lineTo(50, 100);
		shape.graphics.closePath();
		return shape
	}

	return CommonShapes;
})();