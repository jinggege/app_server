/**
 * Created by dell on 2016/3/25.
 */
var Util = function(){};

Util.prototype = {
    createGid:function(){
        return Math.floor(Math.random()*999999);
    }

};

module.exports = new Util();