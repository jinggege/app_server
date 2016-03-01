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
    var step = 0;


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
            step++;
            var type   = data.type;
            var row    = data.data.row;
            var col    = data.data.col;
            mapList[row][col] = 1;
            var idStr = "#"+row+"-"+col;
            $(idStr).addClass("piece-me");

            var baseUrl = "http://10.155.11.94:3001/getRoomStatus?roomId="+roomConfig.roomId+"&uId="+userConfig.uId;
            baseUrl+= "&action=sendStepInfo"+"&activeId="+_this.getOther().uId+"&step="+step+"&doUid="+userConfig.uId;
            baseUrl+= "&row="+row+"&col="+col;
            $.get(baseUrl,_this.sendStepResponse)

        },

        resetGrid:function(){
            _this.view.resetGrid();
        },
        startTick:function(){
            var ticker = setInterval(function(){

                var baseUrl = "http://10.155.11.94:3001/getRoomStatus?roomId="+roomConfig.roomId+"&uId="+userConfig.uId;
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
            console.log(stepInfo.activeId,_this.getMe().uId,stepInfo.activeId == _this.getMe().uId);
            if(stepInfo.activeId == _this.getMe().uId){
                $("#g-mask").css("display","none");
            }else{
                $("#g-mask").css("display","block");
            }

            console.log(stepInfo,_this.getMe().uId);

            if(stepInfo.doUid != _this.getMe().uId && stepInfo.doUid !=-1){
                var row = stepInfo.row;
                var col = stepInfo.col;

                var idStr = "#"+row+"-"+col;
                $(idStr).addClass("piece-me");
            }


        },
        getMe:function(){
            for(var i=0; i<uList.length; i++){
                if(userConfig.uId == uList[i].uId){
                    return uList[i];
                }
            }
        },

        getOther:function(){
            for(var i=0; i<uList.length; i++){
                if(userConfig.uId != uList[i].uId){
                    return uList[i];
                }
            }
        },
        sendStepResponse:function(data,status){

        }



    };

    module.exports = GC;

    });