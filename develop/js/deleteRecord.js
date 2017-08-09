define( function( require, exports, module ) {
    var CONST = require('const'),
        Pop = require( 'pop' ),
        pop = new Pop( $( '#popModal' ) ),
        $modal,
        successCb;

    //删除异常报警
    function deleteAbnormal(num) {
        num = +num;

        if(typeof num !== 'number' && isNaN(num)) {
            return false;
        }

        $.ajax({
            url: url + '?num=' + num,
            type: 'GET',
            dataType: 'JSON'
        }).then(function(json) {
            if(json.bizNo > 0) {
                $modal.modal('hide');
                pop.success(CONST.DELETE_SUCCESS);
                successCb && successCb();
            } else {
                pop.error( json.bizMsg || CONST.DELETE_ERROR);
            }
        }, function() {
            pop.error(CONST.AJAX_ERROR);
        })
    }

    function init(_url, _$modal, cb) {
        var $num = _$modal.find('input[name=num]'),
            $form =  _$modal.find('form');

        url = _url;
        $modal = _$modal;

        //表单验证
        $form.validate( {
            rules: {
                num: {
                    required: true,
                    number:true
                }
            },
            ignore: '.ignore'
        } );

        $('.J-delete').click(function() {
            $modal.modal('show');
        });

        $modal.find('.ok').click(function() {
            if($form.valid()) {
                deleteAbnormal($num.val());
            }
        });

        successCb = cb;
    }
    
    exports.init = init;
} );