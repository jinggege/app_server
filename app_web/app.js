
var rootUrl = __dirname;
global.rootUrl = rootUrl+'/core';

var url    = require('url');
var koa    = require('koa');  
var route  = require('koa-route');
var logger = require('koa-logger');
var render = require(global.rootUrl+'/lib/render.js');
var data   = require(global.rootUrl+'/data/data.js');
var trace = require(global.rootUrl+'/lib/trace.js');

var globalData = require(global.rootUrl+'/data/globaldata.js');
var roomC      = require(global.rootUrl+'/controls/roomcontrol.js');
var app        = koa();  





start();
  
app.use(logger());
app.use(route.get('/',indexLog));
//app.use(route.get('/room',roomLog));
app.use(route.get('/room',roomTest));


function start(){
	globalData.setRoomList(data.getRoomList());
}


function *indexLog(){	
	this.body = yield render('index', {desc:"Room List",author:'demo',roomList:globalData.getRoomList() });	
}

function *roomLog(){
	var cUrl = this.request.url;
	var arg  = url.parse(cUrl, true).query
	trace(["jsonp",arg.callback]);
	
	this.body = arg.callback+'('+'{"msg":"未开播"}'+')';  //jsonp 解决跨域请求问题	
}


function *roomTest(){
	var cUrl = this.request.url;
	var arg  = url.parse(cUrl, true).query
	var roomId = arg.room;
	roomC.updataRoomListByRoomId(roomId);
	this.body = yield render('roomtest', {roomId:roomId});
}



  
app.listen(3001);
trace(["app start on port 3001"]);
