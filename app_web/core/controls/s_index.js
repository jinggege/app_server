/**
 * Created by mj on 2016/3/21.
 * good life  index
 */
'use strict';
var url         = require("url");
var render      = require(global.rootUrl+'/lib/render.js');
var d_manage = require(global.rootUrl+'/data/d_manage.js');

var GL_INDEX = function(){};

var instance = null;
GL_INDEX.prototype = {
    getControl:function*(){
        var renderData = {};
        renderData.desc = "Room List";
        renderData.roomList = d_manage.getRoomList();
        renderData.STATIC_DOMAIN = global.appConfig.app_static_domain;
       this.body = yield render('gl_index', renderData);
    }

};

instance = instance==null? new GL_INDEX() : instance;
module.exports = instance;