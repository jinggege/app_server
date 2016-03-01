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

    var MAX_ROW_INDEX = 0;
    var MAX_COL_INDEX = 0;


    var GC=function(){
        this.view = null;
        _this = this;
    };

    GC.prototype = {
        init:function(){
            this.view = new gv();
            this.view.init(this.clickGridEvent);
            mapList = this.view.getGrid();
            MAX_ROW_INDEX = mapList.length - 1;
            MAX_COL_INDEX = mapList[0].length - 1;
            this.startTick();
        },
        clickGridEvent:function(data){
            step++;
            var type   = data.type;
            var row    = data.data.row;
            var col    = data.data.col;

            var myInfo =  _this.getMe();

            mapList[row][col] = myInfo.order;
            var idStr = "#"+row+"-"+col;
            $(idStr).addClass("piece-"+_this.getMe().order);
            _this.checkWin(row,col,myInfo.order);

            var baseUrl =roomConfig.server_path+ "/getRoomStatus?roomId="+roomConfig.roomId+"&uId="+userConfig.uId;
            baseUrl+= "&action=sendStepInfo"+"&activeId="+_this.getOther().uId+"&step="+step+"&doUid="+userConfig.uId;
            baseUrl+= "&row="+row+"&col="+col+"&order="+myInfo.order;
            $.get(baseUrl,_this.sendStepResponse)

        },

        resetGrid:function(){
            _this.view.resetGrid();
        },
        startTick:function(){
            var ticker = setInterval(function(){

                var baseUrl =roomConfig.server_path+ "/getRoomStatus?roomId="+roomConfig.roomId+"&uId="+userConfig.uId;
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
                $("#g-mask").css("display","none");
            }else{
                $("#g-mask").css("display","block");
            }

            if(stepInfo.doUid != _this.getMe().uId && stepInfo.doUid !=-1 && stepInfo.order != 0){
                var row = stepInfo.row;
                var col = stepInfo.col;
                var idStr = "#"+row+"-"+col;
                $(idStr).addClass("piece-"+stepInfo.order);
                mapList[row][col] = stepInfo.order;
                _this.checkWin(row,col,stepInfo.order);
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

        },
        checkWin:function(row,col,order){
            console.log("==check win");
           // mapList

            var maxStep = 5;
            var count = 1;

            for(var i=0; i<maxStep; i++){
                //todo 思维不清晰  暂停
            }
        }



    };

    module.exports = GC;

    });