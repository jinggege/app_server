/**
 * Created by dell on 2016/2/19.
 */
define(function(require,exports,module){
    var $=require("JQ");
    var gv=require("./gamev.js");

    var roomConfig = window.config.roomConfig;
    var userConfig = window.config.userConfig;

    var mapList = null;
    var uList = null;


    var GC=function(){
        this.view = null;
        _this = this;
    };

    GC.prototype = {
        init:function(){
            this.view = new gv();
            this.view.init(this.clickGridEvent);
            mapList = this.view.getGrid();
            this.startTick();
        },
        clickGridEvent:function(data){
            var type   = data.type;
            var row    = data.data.row;
            var col    = data.data.col;
            mapList[row][col] = 1;
            var idStr = "#"+row+"-"+col;
            $(idStr).addClass("piece-me");

        },

        resetGrid:function(){
            _this.view.resetGrid();
        },
        startTick:function(){
            var ticker = setInterval(function(){

                var baseUrl = "http://10.155.11.94:3001/getRoomStatus?roomId="+roomConfig.roomId+"&uId="+userConfig.uId;

                //if(_this.roomIsFull()){
               if(!_this.roomIsFull()){
                    $.get(
                            baseUrl+"&action=getUserInfo",
                        _this.getUserInfo
                    )
                }else{
                    $.get(
                            baseUrl+"&action=getStepInfo",
                        _this.getStepInfo
                    )
                }



            },1000);
        },

        showUser:function(userList){
            uList = userList;
            var html = '<ul>';
            var uInfo = null;
            for(var i=0; i<userList.length; i++){
                uInfo = userList[i];
                html += '<li class="user-info">';
                html += '<div class="'+'u-'+uInfo.order+'">'+'uid:'+uInfo.uId+'</div>';
                html += '</li>';
            }
            html +='</ul>';

            $("#game-info").html(html);
        },

        roomIsFull:function(){
            if(uList == null) return false;
            return uList.length>=2;
        },

        getUserInfo:function(data,status){
            var resObj = $.parseJSON(data);
            _this.showUser(resObj.response.uList);
        },
        getStepInfo:function(data,status){
            var resObj = $.parseJSON(data);
            var stepInfo = resObj.response.stepInfo;

            if(stepInfo.activeId == _this.getMe().uId){
                $("#g-mask").css("display","block");
            }else{
                $("#g-mask").css("display","none");
            }


            console.log(resObj);
        },
        getMe:function(){
            for(var i=0; i<uList.length; i++){
                if(userConfig.uId == uList[i].uId){
                    return uList[i];
                }
            }
        }



    };

    module.exports = GC;

    });