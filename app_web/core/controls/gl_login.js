/**
 * Created by mj on 2016/3/21.
 * good life  index
 */
'use strict';
var url         = require("url");
var render      = require(global.rootUrl+'/lib/render.js');

var GL_LOGIN = function(){};

var instance = null;
GL_LOGIN.prototype = {
    getControl:function*(){
        var renderData = {};
        renderData.desc = "Room List";
        renderData.STATIC_DOMAIN = global.appConfig.app_static_domain;
        this.body = yield render('gl_login', renderData);
    }

};

instance = instance==null? new GL_LOGIN() : instance;
module.exports = instance;