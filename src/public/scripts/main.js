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

function SubTest() {
    this.name = null;
}

SubTest.prototype = Object.create(Test.prototype);
SubTest.prototype.constructor = SubTest;
var sub = new SubTest();
sub.setName('xuweijian');