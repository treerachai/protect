<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<!-- 
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.1.1
Version: 3.0.1
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8"/>
<title>登录</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta content="" name="description"/>
<meta content="" name="author"/>
 <!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/css/bootstrap.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" />" rel="stylesheet" type="text/css" />
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN THEME GLOBAL STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/global/css/components.min.css" />" rel="stylesheet" id="style_components" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/css/plugins.min.css" />" rel="stylesheet" type="text/css" />
<!-- END THEME GLOBAL STYLES -->
<!-- BEGIN PAGE LEVEL STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/pages/css/lock.min.css" />" rel="stylesheet" type="text/css" />
<!-- END PAGE LEVEL STYLES -->
<!-- BEGIN THEME LAYOUT STYLES -->
<!-- END THEME LAYOUT STYLES -->
<link href="<c:url value="/public/css/common-3fed2d36ec.css" />" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<c:url value="/public/css/component-b66d4a443b.css" />" type="text/css">
<link href="<c:url value="/public/css/login-1fdfe0744e.css" />" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" href="<c:url value="/public/img/favicon.ico" />" type="image/x-icon" />
</head>
<body class="login">
	<div class="page-lock">
        <div class="page-body">
            <div class="lock-head hidden"></div>
            <div class="lock-body">
				<div class="logo">
					<img src="./public/img/logo.png" />
					<div class="title">
						<div class="big">
							万视盾 - 服务器
						</div>
						<div class="small">
							视频监控系统实时安全防护
						</div>
					</div>
				</div>
                <form class="lock-form pull-left relative" action="login_check" method="POST">
	                <div class="errorMsg text-center">
		            	<c:if test="${bizNo lt 0}"> 
					    	${bizMsg}
					    </c:if>
					</div>
                    <div class="form-group">
                        <input class="form-control placeholder-no-fix username" type="text" autocomplete="off" autofocus placeholder="请输入用户名" name="username" value="operator" />
                    </div>
                    <div class="form-group">
                        <input class="form-control placeholder-no-fix password" type="password" value="operator" autocomplete="off" placeholder="请输入密码" name="password" />
                    </div>
                    <div class="form-actions text-center">
                        <button type="submit" class="submit">登&nbsp;&nbsp;录</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- 
        <div class="page-footer-custom"> ©2016 中国科学院信息工程研究所 版权所有 </div>
         -->
    </div>
    <div class="modal fade in" id="popModal" tabindex="-1" data-backdrop="static" role="basic" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <h4 class="modal-title"></h4>
	            </div>
	            <div class="modal-body">
	                
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn ok">确 定</button>
	                <button type="button" class="btn cancel"
	                    data-dismiss="modal">取 消</button>
	            </div>
	        </div>
	        <!-- /.modal-content -->
	    </div>
	    <!-- /.modal-dialog -->
	</div>
	<script>
		window.kickout = '${kickout}';
		window.rootPath = '/';
	</script>
	<script src="<c:url value="/public/js/sea.js" />" type="text/javascript"></script>
	<script src="<c:url value="/public/js/sea_config.js" />" type="text/javascript"></script>

	<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />" type="text/javascript"></script>

	<script src="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/js/bootstrap.min.js" />" type="text/javascript"></script>


	<script src="<c:url value="/public/lib/jquery.validate.min.js" />" type="text/javascript"></script>
	<script src="<c:url value="/public/lib/md5.js" />" type="text/javascript"></script>

	<script>
		seajs.use('login');
	</script>
</body>
</html>