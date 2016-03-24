/**
 * Created by dell on 2016/2/26.
 */
'use strict';
var route     = require('koa-route');

var s_index   = require(global.rootUrl+'/controls/s_index.js');
var s_login    = require(global.rootUrl+'/controls/s_login.js');
var s_detail    = require(global.rootUrl+'/controls/s_detail.js');
var s_admin    = require(global.rootUrl+'/controls/s_admin.js');


var C_MANAGE = function(){};
var controlList = [];


C_MANAGE.prototype = {
    start:function(app){
        this.registerControl(app);
    },
    registerControl: function (app) {
        this.addControlToList("gl_index","/gl_index",s_index.getControl);
        this.addControlToList("gl_login","/gl_login",s_login.getControl);
        this.addControlToList("gl_detail","/gl_detail",s_detail.getControl);
        this.addControlToList("gl_admin","/gl_admin",s_admin.getControl);

       for(var i=0; i<controlList.length; i++){
           var obj = controlList[i];
           app.use(route.get(obj.route,obj.control));
       }

        //==post==
        app.use(route.post('/gl_login',s_login.getControl));
    },
    addControlToList:function(key,route,control){
        controlList.push({name:key,route:route,control:control});
    }

};

module.exports = new C_MANAGE();