/**
 * Created by dell on 2016/2/26.
 */
/**
 * Created by dell on 2016/2/26.
 */
'use strict';
var url         = require("url");
var render      = require(global.rootUrl+'/lib/render.js');
var d_manage = require(global.rootUrl+'/data/d_manage.js');

var C_INDEX = function(){};

var instance = null;
C_INDEX.prototype = {
    getControl:function*(){
        var renderData = {};
        renderData.desc = "Room List";
        renderData.roomList = d_manage.getRoomList();
        renderData.STATIC_DOMAIN = global.appConfig.app_static_domain;
        this.body = yield render('index', renderData);
    },

    checkRoomStatus:function(){
        console.log("room status");
    }

};

instance = instance==null? new C_INDEX() : instance;
module.exports = instance;