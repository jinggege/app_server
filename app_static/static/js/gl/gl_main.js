/**
 * Created by mj on 2016/3/21.
 * gl-index
 */
define(function(require,exports,module){

    var $ = require('JQ');
    var slide = require('http://10.155.11.94/static/js/gl/slide.js');

    var Main = function(){};

    Main.prototype = {
        init:function(){
            //this.refreshNavLeft();

            var imgArr = [];
            imgArr.push({url:'http://m1.ykimg.com/0A02000015356461BCC5A44F64AF9811'});
            imgArr.push({url:'http://m1.ykimg.com/0A0200001534AE921DB9D9718CA874EB'});
            imgArr.push({url:'http://m1.ykimg.com/0A02000015394F4B8B5CA8C0E3478601'});

            slide.start('nav-recommend',imgArr);

        },

        refreshNavLeft:function(){
            var winH = $(window).height();
            var navLeftDom = $('.main-nav-left');
            navLeftDom.css('height',winH);

            $(window).resize(
                function(){
                    winH = $(window).height();
                    navLeftDom.css('height',winH);
                }
            );

        }

    };


    module.exports = new Main();
});