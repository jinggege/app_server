
var rootUrl = __dirname;
global.rootUrl = rootUrl+'/core';

var config = require('./appconfig.js');
var url    = require('url');
var koa    = require('koa');
var logger = require('koa-logger');

var trace    = require(global.rootUrl+'/lib/trace.js');
var c_manage = require(global.rootUrl+'/controls/c_manage.js');
var d_manage = require(global.rootUrl+'/data/d_manage.js');

var app      = koa();
//app.use(logger());

start();

function start(){
    global.appConfig = config;
    d_manage.start();
    c_manage.start(app);
}


app.listen(config.app_web_port);
trace(["app start on port "+config.app_web_port]);


