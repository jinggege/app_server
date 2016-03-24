'use strict';

global.basePath = __dirname;
var rootUrl    = __dirname;
global.rootUrl = rootUrl+'/core';


var config = require('./appconfig.js');
var url    = require('url');
var koa    = require('koa');
var logger = require('koa-logger');

var trace    = require(global.rootUrl+'/lib/trace.js');
var singleC  = require(global.rootUrl+'/lib/singleclass.js');
var control_manage = require(global.rootUrl+'/controls/control_manage.js');
var data_manage = require(global.rootUrl+'/data/data_manage.js');

var app      = koa();
app.use(logger());

start();

function start(){
    global.appConfig = config.APP_CONFIG;

    singleC.start();
    singleC.registerClass(singleC.getCKEY().DATA_MANAGE,data_manage);
    singleC.registerClass(singleC.getCKEY().CONTROL_MANAGE,control_manage);

    singleC.getSingleClass(singleC.getCKEY().DATA_MANAGE).start();
    singleC.getSingleClass(singleC.getCKEY().CONTROL_MANAGE).start(app);

}

app.listen(config.APP_CONFIG.app_web_port);
trace(["app start on port "+config.APP_CONFIG.app_web_port]);

