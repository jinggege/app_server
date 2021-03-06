/**
 * Created by dell on 2016/2/26.
 */
var route     = require('koa-route');
var c_index   = require(global.rootUrl+'/controls/c_index.js');
var c_addroom = require(global.rootUrl+'/controls/c_addroom.js');
var c_room = require(global.rootUrl+'/controls/c_room.js');


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
        this.addControlToList("c_addroom","/addroom",c_addroom.getControl);
        this.addControlToList("c_room","/getRoomStatus",c_room.getControl);

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