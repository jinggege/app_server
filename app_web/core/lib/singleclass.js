/**
 * Created by dell on 2016/3/24.
 * 单例管理类
 */

var app_config = require('../../appconfig.js');

var SingleClass = function(){};

SingleClass.prototype = {
    start:function(){
        global.SingleClass = new SingleClass();
        this.classMap = {};

        this.CKEY = app_config.C_KEY;
    },
    registerClass:function(className,instance) {
        this.classMap[className] = instance;
    },

    getSingleClass:function(className){
        return this.classMap[className];
    },

    getCKEY:function(){
        return this.CKEY;
    }

};

if(!global.SingleClass){
    global.SingleClass = new SingleClass();
}

module.exports =global.SingleClass;





