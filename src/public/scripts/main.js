/**
 * main.js
 */
function Test() {
	this.name = null;
}

Test.prototype.getName = function() {
	console.log(this.name);
	return this.name;
};

Test.prototype.setName = function(name) {
	this.name = name;
};

function subTest() {
    this.name = null;
}

subTest.prototype = Object.create(Test);
subTest.prototype.constructor = subTest;
subTest.setName('xuweijian');