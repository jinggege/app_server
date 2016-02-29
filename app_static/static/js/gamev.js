/**
 * Created by dell on 2016/2/19.
 */
define(function(require,exports,module){
    var $ = require("JQ");

    var MAP_ROW = 10;
    var MAP_COL = 10;
    var mapList = [];
    var callback= null;

    var EVENT_CLICK_GRID = "EVENT_CLICK_GRID"; //点击网格事件

    var GV = function(){

    };

    GV.prototype = {
      init:function(callback){
        this.callback = callback;
        this.creatMap();
      },

      creatMap:function(){
          var _this = this;

          var html = "<table class='game-panel'>";
          for(var i=0; i<MAP_ROW; i++){
              var arr = [];
              html += "<tr>";
              for(var j=0; j<MAP_COL; j++){
                  html += "<td class='grid'>";
                  html += "<div class='piece'"+" row="+i+" col="+j+"  ></div>";
                  html += "</td>";
                  arr.push(0);
              }
              html += "</tr>";
              mapList.push(arr);
          }

          html +="</table>";
          $("#game-container").html(html);

          $(".piece").on("click",function(event){
              var row = Number($(event.target).attr("row"));
              var col = Number($(event.target).attr("col"));
              _this.callback.call(null,{type:EVENT_CLICK_GRID,data:{target:event.target,row:row,col:col}});
          })
      },

      getGrid:function(){
          return mapList;
      },

       //重置网格
       resetGrid:function(){
            for(var i=0; i<mapList.length; i++){
                var rowArr = mapList[i];
                for(var j=0; j<rowArr.length; j++){
                    rowArr[j] = 0;
                }
            }

           $(".piece").removeClass("piece-me");
        }

    };


    module.exports = GV;

});