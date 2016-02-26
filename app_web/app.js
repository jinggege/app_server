
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

var c_index  = require(global.rootUrl+'/controls/c_index.js');
var c_addroom  = require(global.rootUrl+'/controls/c_addroom.js');

var app        = koa();  


start();
  
app.use(logger());
//app.use(route.get('/room',roomLog));

app.use(route.get('/',c_index.getControl));
app.use(route.get('/index',c_index.getControl));
app.use(route.get('/addroom',c_addroom.getControl));


function start(){
	globalData.setRoomList(data.getRoomList());
}



function *roomLog(){
	var cUrl = this.request.url;
	var arg  = url.parse(cUrl, true).query
	trace(["jsonp",arg.callback]);
	this.body = arg.callback+'('+'{"msg":"jsonp  test--"}'+')';  //jsonp 解决跨域请求问题
}



  
app.listen(3001);
trace(["app start on port 3001"]);
