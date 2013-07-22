test("Fitts object exists.", function(){
	ok(typeof Fitts == "object", "Fitts exists and is an object.");
});

test("Testing getMovementTime.", function(){
	equal(50, Fitts.getMovementTime(0, 100), "Distance is 0, width is 100, movement time is 50.");
});