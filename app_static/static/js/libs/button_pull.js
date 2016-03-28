/**
 * Created by dell on 2016/3/28.
 */

/** ************* skin *************
 .com-btn-pb-con{
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #a0ce4e;
}

 .com-btn-pb-con span{
    float: left;
    text-align: center;
    font-size: 12px;
    margin:0;
    padding:0;
}

 .com-btn-pb-con .com-btn-pb-label{
    width: 65px;
    height: 30px;
    background-color: #a0ce4e;
}

 .com-btn-pb-con .com-btn-pb-btn{
    width: 30px;
    height: 30px;
    background-color: #FF9933;
    cursor: pointer;
}

 .com-btn-pb-con .com-btn-pb-itempanel{
    width: 65px;
    height:100% ;
    background-color: #993333;
    position: relative;
    display: none;
}

 .com-btn-pb-itempanel ul{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}


 .com-btn-pb-itempanel ul li{
    list-style: none;
    width: 100%;
}

 .com-btn-pb-itempanel .box-menu-item{
    width: 100%;
    height: 30px;
    text-align: center;
    background-color: #000000;
    color: #FFFFFF;
    cursor:pointer;
}

 .com-btn-pb-itempanel .box-menu-item:hover{
    background-color: #a0ce4e;
}

 */




define(function(require,exports,module){
    var $ = require('JQ');
    var ButtonPull = function(){};

    var CN_HideOrShow = 'com-btn-pb-itempanel';


    ButtonPull.prototype = {
        init:function(domClassName){
            this.parentDom = $(domClassName);

            this.createDom();
        },
        createDom:function(){
            var html = [
                '<div class="com-btn-pb-con">',
                    '<span class="com-btn-pb-label">AAAAA</span>',
                    '<span class="com-btn-pb-btn" >BTN</span>',
                    '<div style="clear:both"></div>',
                    '<div class="#HOS"></div>',
                '</div>'
            ].join('');

            html = html.replace('#HOS',CN_HideOrShow);

            this.parentDom.append($(html));

            $('.com-btn-pb-btn').on('click',function(event){
                var target = $('.com-btn-pb-itempanel');
                console.log(target);
                var showFlag = target.css('display') =='block'? 'none' : 'block';
                $('.'+CN_HideOrShow).css('display',showFlag);
            });
        },

        setData:function(arr){
            var container = $('.com-btn-pb-itempanel');

            var html = '<ul>';
            for(var i=0; i<arr.length; i++){
                html +=  '<li style="list-style: none">';
                    html += '<span class="box-menu-item" data="'+arr[i]+'" >';
                        html += arr[i];
                    html += '</span>';
                html += '</li>';
            }

            html += '</ul>';
            container.append($(html));

            $('.box-menu-item').on('click',function(event){
                var val = $(event.target).attr('data');
                $('.com-btn-pb-label').text(val);
                $('.'+CN_HideOrShow).css('display','none');
            });


        }



    };

    module.exports = new ButtonPull();

});