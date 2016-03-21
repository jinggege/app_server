/**
 * Created by dell on 2016/3/21.
 */
define(function(require,exports, module){
    var $ = require('JQ');
    var Slide =function(){};

    Slide.prototype = {

        /*
        *imgArr = [{url:xxx,width:xxx,height:xxxx,desc:xxxx}]
        *
         */
        start:function(parentClassName,imgArr){
            var parent = $('.'+parentClassName);

            var slidePanel = $('<div class="slide-panel"></div>');

            var html = '<ul>';
            var obj = null;
            for(var i= 0; i<imgArr.length; i++){
                obj = imgArr[i];
                html += '<li class="slide-li">';
                     html +='<img class="slide-img" src="'+obj.url+'">';
                html += '</li>';
            }

            html +='</ul>';

            slidePanel.append($(html));
            parent.append(slidePanel);

            $('.slide-li').css('float','left');
            $('.slide-img').css('width','850px');
            $('.slide-img').css('height','300px');

            slidePanel.css('width',imgArr.length*850+'px');
            slidePanel.css('height','100%');
            slidePanel.css('position','relative');

            var count = 0;
            setInterval(function(){
                var pos = count*850*-1 + 'px';
                slidePanel.animate({left:pos});
                count++;
                count = count>=imgArr.length? 0 : count;
            },2000)

        }

    };

    module.exports = new Slide();

});