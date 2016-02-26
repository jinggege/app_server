
var rootUrl = __dirname;
global.rootUrl = rootUrl+'/core';

var url    = require('url');
var koa    = require('koa');
var logger = require('koa-logger');

var trace    = require(global.rootUrl+'/lib/trace.js');
var c_manage = require(global.rootUrl+'/controls/c_manage.js');
var d_manage = require(global.rootUrl+'/data/d_manage.js');

var app      = koa();
app.use(logger());

start();

function start(){
    d_manage.start();
    c_manage.start(app);
}


app.listen(3001);
trace(["app start on port 3001"]);
