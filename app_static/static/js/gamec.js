/**
 * Created by dell on 2016/2/19.
 */
define(function(require,exports,module){
    var $=require("JQ");
    var gv=require("./gamev.js");

    var roomConfig = window.config.roomConfig;

    var GC=function(){
        this.view = null;
        _this = this;
    };

    GC.prototype = {
        init:function(){
            this.view = new gv();
            this.view.init(this.clickGridEvent);
            this.startTick();
        },
        clickGridEvent:function(data){
            console.log(_this.view.getGrid());

            $.getJSON('http://127.0.0.1:3001/room?callback=?',
                function(respone){
                    console.log("1");
                    console.log(respone.msg);
                }
            );

        },

        resetGrid:function(){
            _this.view.resetGrid();
        },
        startTick:function(){
            var ticker = setInterval(function(){
                $.get(
                    "http://10.155.11.94:3001/getRoomStatus?roomId="+roomConfig.roomId+"&action=getUserInfo",
                    function(data,status){
                        console.log(status,data);
                    }
                )

            },2000);
        }





    };

    module.exports = GC;

    });