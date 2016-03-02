/**
 * Created by dell on 2016/2/19.
 */
define(function(require,exports,module){
    var $=require("JQ");
    var gv=require("./gamev.js");

    var roomConfig = window.config.roomConfig;
    var userConfig = window.config.userConfig;

    var N_WAIT = "等待";
    var N_WIN  = "赢";
    var N_LOST = "输";

    var mapList = null;
    var uList = null;

    var myStep = 0;

    var MAX_ROW_INDEX = 0;
    var MAX_COL_INDEX = 0;
    var MAX_WIN_COUNT = 5;

    var gameOver = false;
    var ticker = null;

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

            $("#g-notice").html(N_WAIT);
        },
        clickGridEvent:function(data){

            if(_this.gameOver){
                return;
            }

            myStep++;
            var type   = data.type;
            var row    = data.data.row;
            var col    = data.data.col;

            var myInfo =  _this.getMe();

            mapList[row][col] = myInfo.order;
            var idStr = "#"+row+"-"+col;
            $(idStr).addClass("piece-"+_this.getMe().order);

            var baseUrl =roomConfig.server_path+ "/getRoomStatus?roomId="+roomConfig.roomId+"&uId="+userConfig.uId;
            baseUrl+= "&action=sendStepInfo"+"&activeId="+_this.getOther().uId+"&step="+myStep+"&doUid="+userConfig.uId;
            baseUrl+= "&row="+row+"&col="+col+"&order="+myInfo.order;
            $.get(baseUrl,_this.sendStepResponse);


            _this.wait(true,N_WAIT);

            if(_this.checkWin(row,col,myInfo.order)){
                _this.wait(true,N_WIN);
                _this.end();
            }
        },

        resetGrid:function(){
            _this.view.resetGrid();
        },
        startTick:function(){
            ticker = setInterval(function(){

                if(_this.gameOver){
                    clearInterval(ticker);
                    alert("==GAME OVER==");
                    return;
                }

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
            var resObj   = $.parseJSON(data);
            var stepInfo = resObj.response.stepInfo;
            if(stepInfo.activeId == _this.getMe().uId){
                $("#g-mask").css("display","none");
                _this.wait(false,"");
            }else{
                _this.wait(true,N_WAIT);
            }

            if(stepInfo.doUid != _this.getMe().uId && stepInfo.doUid !=-1 && stepInfo.order != 0){
                var row = stepInfo.row;
                var col = stepInfo.col;
                var idStr = "#"+row+"-"+col;
                $(idStr).addClass("piece-"+stepInfo.order);
                mapList[row][col] = stepInfo.order;
                if(_this.checkWin(row,col,stepInfo.order)){
                   _this.end();
                    if(stepInfo.doUid == _this.getMe().uId){
                        _this.wait(true,N_WIN);
                    }else{
                        _this.wait(true,N_LOST)
                    }

                }
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
            var line1 = this.checkLine1(row,col,order);
            var line2 = this.checkLine2(row,col,order);
            var line3 = this.checkLine3(row,col,order);
            var line4 = this.checkLine4(row,col,order);
            console.log("line status=",line1,line2,line3,line4);
            if( line1 || line2 || line3 || line4){
                return true;
            }
            return false;
        },

        /**横向检测*/
        checkLine1:function(row,col,order){
            var winStep = 0;
            var rowList = mapList[row];
            for(var i=0; i<= MAX_COL_INDEX; i++){
                if(rowList[i] == order){
                    winStep++;
                    if(winStep >= MAX_WIN_COUNT){
                        return true;
                    }
                }else{
                    winStep--;
                    winStep = winStep<=0? 0:winStep;
                }
            }
            return false;
        },
        /**垂直向检测*/
        checkLine2:function(row,col,order){
            var winStep = 0;
            for(var i=0; i<=MAX_ROW_INDEX; i++){
                if(mapList[row][i] == order){
                    winStep++;
                    if(winStep>= MAX_WIN_COUNT){
                        return true;
                    }
                }else{
                    winStep--;
                    winStep = winStep<0? 0:winStep;
                }
            }

            return false;
        },

        /*
        * check 45度 线
         */
        checkLine3:function(row,col,order){
            var winStep = 0;
            var cRow = row;
            var cCol = col;
            while(cRow>0 && cCol>0){
                cRow--;
                cCol++;
                if(cCol>= MAX_COL_INDEX){
                    break;
                }
            }

            while(cRow<=MAX_ROW_INDEX && cCol>= 0){
                if(mapList[cRow][cCol] == order){
                    winStep++;
                    if(winStep>= MAX_WIN_COUNT){
                        return true;
                    }
                }else{
                    winStep--;
                    winStep = winStep<0? 0:winStep;
                }

                cRow++;
                cCol--;
            }//END WHILD

            return false;
        },

        /*
         * check 225度 线
         */
        checkLine4:function(row,col,order){
            var winStep = 0;
            var cRow = row;
            var cCol = col;

            while(cRow>0 && cCol >0){
                cRow--;
                cCol--;
            }

            while(cRow < MAX_ROW_INDEX && cCol <MAX_COL_INDEX){
                if(mapList[cRow][cCol] == order){
                    winStep++;
                    if(winStep>= MAX_WIN_COUNT){
                        return true;
                    }
                }else{
                    winStep--;
                    winStep = winStep<0? 0:winStep;
                }

                console.log("line4=",cRow,cCol);
                cRow++;
                cCol++;
            }

            return false;
        },

        end:function(){
            clearInterval(ticker);
            myStep = 0;
            gameOver = true;
        },
        wait:function(isWait,msg){
            if(isWait){
                $("#g-notice").css("display","block");
                $("#g-notice").html(msg);
                $("#g-mask").css("display","block");
            }else{
                $("#g-notice").css("display","none");
                $("#g-mask").css("display","none");
            }

        }



    };

    module.exports = GC;

    });