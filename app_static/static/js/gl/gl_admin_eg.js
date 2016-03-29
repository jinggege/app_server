/**
 * Created by dell on 2016/3/25.
 */
define(function(require,exports,module){

    var $ = require('JQ');

    var GL_Admin_EG = function(){};

    GL_Admin_EG.prototype = {

        init:function(){
            this.delGoods();
            this.recommend();
        },

        delGoods:function(){
            $('.goods-btn-del').on('click',function(event){
                var target = $(event.target);
                var gId = target.attr('gid');

                var url = '/gl_admin?ac=gdel&'+'gid='+gId;

                $.get(url,function(data,status){
                    if(status=='success'){
                        var respObj = $.parseJSON(data);
                        location.href = '/gl_admin?ac=allg';
                    }else{
                        alert('--------ERROR!---------');
                    }

                });
            })
        },

        recommend:function(){
            $('.g-edit-rec').on('click',function(event){
               var target = $(event.target);
                var rec = target.attr('rec');
                var gId = target.attr('gid');

                var flag = String(rec)=='1'? '0':'1';
                target.removeClass('g-rec-'+rec);
                target.addClass('g-rec-'+flag);
                target.attr('rec',flag);

                var url = '/gl_admin?ac=recg&'+'gid='+gId+'&rec='+flag;

                $.get(url,function(data,status){
                    if(status=='success'){
                        var respObj = $.parseJSON(data);
                        location.href = '/gl_admin?ac=allg';
                    }else{
                        alert('--------ERROR!---------');
                    }

                });

            })
        }



    };

    module.exports = new GL_Admin_EG();

});