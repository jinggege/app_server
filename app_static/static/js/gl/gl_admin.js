/**
 * Created by dell on 2016/3/25.
 */
define(function(require,exports,module){

    var $ = require('JQ');

    var GL_Admin = function(){};

    GL_Admin.prototype = {

        init:function(){
            this.delGoods();
        },

        delGoods:function(){
            $('.goods-btn-del').on('click',function(event){
                var target = $(event.target);
                var gId = target.attr('gid');

                var url = '/gl_admin?ac=gdel&'+'gid='+gId;

                $.get(url,function(data,status){
                    if(status=='success'){
                        var respObj = $.parseJSON(data);
                        location.href = '/gl_admin';
                    }else{
                        alert('--------ERROR!---------');
                    }

                });
            })
        }



    };

    module.exports = new GL_Admin();

});