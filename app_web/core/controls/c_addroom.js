/**
 * Created by dell on 2016/2/26.
 */
'use strict';
var url      = require("url");
var render   = require(global.rootUrl+'/lib/render.js');
var d_manage = require(global.rootUrl+'/data/d_manage.js');

var C_ADDROOM = function(){};

var instance = null;
C_ADDROOM.prototype = {
    getControl:function*(){
        var cUrl   = this.request.url;
        var arg    = url.parse(cUrl, true).query;
        var roomId = arg.room;
        var uId    = arg.uId;

        if(d_manage.roomIsFull(roomId)){
            this.body = yield render('roomfull', {});
            return;
        }

        /**
         *防止重复加入room
         * 同一uid 加入同一room            ok
         * 同一ip& 同一uid  加入同一room   no
         *
         */
        var userInfo = d_manage.getRoomUserById(roomId,uId);
        if(userInfo == undefined ||  userInfo== null){
            d_manage.joinRoom(roomId,uId);
        }else{
            if(userInfo.uId == null || userInfo.uId == undefined){
                if(userInfo.roomId != roomId){
                    d_manage.joinRoom(roomId,uId);
                }
            }
        }


        var renderData    = {};
        renderData.roomId = roomId;
        renderData.uId    = uId;
        renderData.STATIC_DOMAIN = global.appConfig.app_static_domain;
        renderData.server_path   = global.appConfig.app_web_path;

        this.body = yield render('room_game', renderData);
    }

};

instance = instance==null? new C_ADDROOM() : instance;
module.exports = instance;


/*
function *roomLog(){
    var cUrl = this.request.url;
    var arg  = url.parse(cUrl, true).query;
    trace(["jsonp",arg.callback]);
    this.body = arg.callback+'('+'{"msg":"jsonp  test--"}'+')';  //jsonp 解决跨域请求问题
}
    */