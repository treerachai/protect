$.extend($.validator.messages, {
    required: "这是必填字段",
    ip: "输入格式不正确",
    number: '请输入数字',
    max: "输入超过了最大值",
	min: "输入小于最小值",
    minlength: $.validator.format( "输入字符不能少于 {0} 个." ),
    maxlength: $.validator.format( "输入字符不能多于 {0} 个." ),
    mask: "网关不可达",
    remote: "该名称已存在",
    equalTo: "两次输入密码不匹配",
    notEqualTo: "新密码不能与原始密码相同",
    pw  : "必须包含数字、英文字母、特殊字符, 并且大于等于8位"
});

$.validator.addMethod("ip",function(value,element,params){
    var ipReg = /^(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

    if( value === '' ) {
        return true;
    }

    return ipReg.test( value );

},"输入格式不正确");

$.validator.addMethod("cird",function(value,element,params){
    var ipReg = /^(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\/(?:30|31|[1-2]?\d)$/;

    if( value === '' ) {
        return true;
    }

    return ipReg.test( value );

},"输入格式不正确");

//两个字段不相等
$.validator.addMethod( 'notEqualTo', function(value, element, param) {
    if( value !== $( param ).val() ) {
        return true;
    }
    return false;
} )

//password格式
$.validator.addMethod( 'pw', function(value, element, param) {
    if( typeof value != 'string' || !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_])[\da-zA-Z~!@#$%^&*]{8,}$/.test( value ) ) {
        return false;
    }
    return true;
} )

$.validator.addMethod("mask",function(value,element,params){
    var ipArr = $( '#config input[name="IP"]' ).val().split( '.' ),
        gatewayArr = $( '#config input[name="gateway"]' ).val().split( '.' ),
        netmaskArr = value.split( '.' ),
        len = 4,
        i = 0;

    
    if( ipArr.length !== len || gatewayArr.length !== len || netmaskArr.length !== len ) {
        return false;
    }

    for( ; i < len; i++ ) {
        if( ( ipArr[ i ] & netmaskArr[ i ] ) !== ( gatewayArr[ i ] & netmaskArr[ i ] ) ) {
            return false;
        }
    }

    return true;

},"网关不可达");