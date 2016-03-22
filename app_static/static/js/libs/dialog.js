/**
 * Created by dell on 2016/3/15.
 */
define(function(require,exports,module){

    var $ = require("JQ");
    var Dialog = function(){};

    Dialog.prototype = {

        alert:function(msg){
            this.createMask();
            this.createAlert();
        },

        /*
        *param : renderFunc   creat display view
        * param: closeCallback  close window callback
        *
         */
        panel:function(renderFunc,closeCallback){
            var view = renderFunc.call();
            this.createMask();
            $('.dialog-mask').append(view);
            this.autoToCenter('dialog-panel');

            if(closeCallback != null || closeCallback != undefined){
                this.showClose(view,closeCallback);
            }

        },

        createAlert:function(){
            var html = [
                '<div class="dialog-alert">',
                '</div>'
            ].join('');

            $('.dialog-mask').append($(html));
            this.autoToCenter('dialog-alert');
        },

        autoToCenter:function(domClassName){
            var w = $(window).width();
            var h = $(window).height();

            var jqElement = $('.'+domClassName);

            var domW = jqElement.width();
            var domH = jqElement.height();
            this.setXY(jqElement,(w-domW)/2,(h-domH)/2 );

            var _this = this;

            $(window).resize(function(){
                w = $(window).width();
                h = $(window).height();
                _this.setXY(jqElement,(w-domW)/2,(h-domH)/2 );
            })

        },

        setXY:function(jqDom,x,y){
            jqDom.css('left',x);
            jqDom.css('top',y);
        },

        createMask:function(){
            var html = '<div class="dialog-mask"></div>';
            $(document.body).append($(html));

            var w = $(window).width();
            var h = $(window).height();

            var jqDom = $('.dialog-mask');

            jqDom.css('width',w);
            jqDom.css('height',h);


            $(window).resize(function(){
                w = $(window).width();
                h = $(window).height();

                jqDom.css('width',w);
                jqDom.css('height',h);
            });

        },

        showClose:function(targetJQDom,callback){
            var dialogContainer = $('.dialog-mask');
            var html_btn_close = [
                '<div class="dialog-btn-close">X</div>'
            ].join('');
            dialogContainer.append($(html_btn_close));

            var jqBtnClose = $('.dialog-btn-close');

            var w = $(window).width();
            var h = $(window).height();

            var domW = targetJQDom.width();
            var domH = targetJQDom.height();

            var _this = this;

            _this.setXY(jqBtnClose,w/2+domW/2 - jqBtnClose.width(),h/2 - domH/2);

            $(window).resize(function(){
                w = $(window).width();
                h = $(window).height();
                _this.setXY(jqBtnClose,w/2+domW/2 - jqBtnClose.width(),h/2 - domH/2);
            });

            jqBtnClose.on('click',function(event){
                callback.call();
            })


        }

    };


    module.exports = new Dialog();
});