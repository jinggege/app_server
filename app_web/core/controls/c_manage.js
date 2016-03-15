/**
 * Created by dell on 2016/2/26.
 */
'use strict';
var route     = require('koa-route');
var c_index   = require(global.rootUrl+'/controls/c_index.js');
var c_joinroom = require(global.rootUrl+'/controls/c_joinroom.js');
var c_roomstatus = require(global.rootUrl+'/controls/c_roomstatus.js');
var c_admin = require(global.basePath+'/admin/controls/c_admin.js');


var C_MANAGE = function(){};
var instance = null;
var controlList = [];


C_MANAGE.prototype = {
    start:function(app){
        this.registerControl(app);
    },
    registerControl: function (app) {
        this.addControlToList("c_index","/",c_index.getControl);
        this.addControlToList("c_index","/index",c_index.getControl);
        this.addControlToList("c_joinroom","/addroom",c_joinroom.getControl);
        this.addControlToList("c_roomstatus","/getRoomStatus",c_roomstatus.getControl);
        this.addControlToList("c_admin","/admin",c_admin.getControl);

       for(var i=0; i<controlList.length; i++){
           var obj = controlList[i];
           app.use(route.get(obj.route,obj.control));
       }
    },
    addControlToList:function(key,route,control){
        controlList.push({name:key,route:route,control:control});
    }

};

instance = instance==null? new C_MANAGE() : instance;
module.exports = instance;