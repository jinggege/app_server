var data    = require('./data.js');

var TDATA = function(){};

TDATA.prototype = {
	init:function(){
		console.log("call data getIndex");
		console.log(data);
		
		console.log((data.getIndex(5));
	}
	
}

module.exports = new TDATA();