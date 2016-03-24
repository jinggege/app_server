/**
 * Created by dell on 2016/3/24.
 * 单例管理类
 */

var SingleClass = function(){};

SingleClass.prototype = {
    start:function(){
        global.SingleClass = new SingleClass();
        this.classMap = {};
    },
    registerClass:function(className,instance) {
        this.classMap[className] = instance;
    },

    getSingleClass:function(className){
        return this.classMap[className];
    }

};

if(!global.SingleClass){
    global.SingleClass = new SingleClass();
}

module.exports =global.SingleClass;





