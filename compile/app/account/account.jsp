<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" import="com.iie.cameraguard.entity.po.User" %>
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
<title>账户管理</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta content="" name="description"/>
<meta content="" name="author"/>

<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link
	href="<c:url value="/public/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />"
	rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" />" rel="stylesheet" type="text/css">
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/css/bootstrap.min.css" />" rel="stylesheet" type="text/css">
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" />" rel="stylesheet" type="text/css">
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css" />" rel="stylesheet" type="text/css">
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/morris/morris.css" />" rel="stylesheet" type="text/css">
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/fullcalendar/fullcalendar.min.css" />" rel="stylesheet" type="text/css">
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/jqvmap/jqvmap/jqvmap.css" />" rel="stylesheet" type="text/css">
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/global/css/components.min.css" />" rel="stylesheet" id="style_components" type="text/css">
<link href="<c:url value="/public/lib/metronic/assets/global/css/plugins.min.css" />" rel="stylesheet" type="text/css">
<!-- END THEME GLOBAL STYLES -->
<!-- BEGIN THEME LAYOUT STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/layouts/layout2/css/layout.min.css" />" rel="stylesheet" type="text/css">
<link href="<c:url value="/public/lib/metronic/assets/layouts/layout2/css/themes/blue.min.css" />" rel="stylesheet" type="text/css" id="style_color">
<link href="<c:url value="/public/lib/metronic/assets/layouts/layout2/css/custom.min.css" />" rel="stylesheet" type="text/css">
 
<link rel="stylesheet" href="<c:url value="/public/lib/sweet-alert/sweet-alert.css" />" type="text/css">
<link rel="stylesheet" href="<c:url value="/public/css/common-3fed2d36ec.css" />" type="text/css">
<link rel="stylesheet" href="<c:url value="/public/css/component-b66d4a443b.css" />" type="text/css">
<link rel="stylesheet" href="<c:url value="/public/css/account-aca5974dbe.css" />" type="text/css">

<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />" type="text/javascript"></script>

</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<!-- DOC: Apply "page-header-fixed-mobile" and "page-footer-fixed-mobile" class to body element to force fixed header or footer in mobile devices -->
<!-- DOC: Apply "page-sidebar-closed" class to the body and "page-sidebar-menu-closed" class to the sidebar menu element to hide the sidebar by default -->
<!-- DOC: Apply "page-sidebar-hide" class to the body to make the sidebar completely hidden on toggle -->
<!-- DOC: Apply "page-sidebar-closed-hide-logo" class to the body element to make the logo hidden on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-hide" class to body element to completely hide the sidebar on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-fixed" class to have fixed sidebar -->
<!-- DOC: Apply "page-footer-fixed" class to the body element to have fixed footer -->
<!-- DOC: Apply "page-sidebar-reversed" class to put the sidebar on the right side -->
<!-- DOC: Apply "page-full-width" class to the body element to have full width page without the sidebar menu -->
<body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
<!-- BEGIN HEADER -->
<%@include file="../public/head.jsp" %>
<!-- END HEADER -->
<div class="clearfix"></div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
	<!-- BEGIN SIDEBAR -->
	<%@include file="../public/sidebar.jsp" %>
	<script>
        $( '.page-sidebar-menu li.config' ).addClass( 'active open' );
		$( '.page-sidebar-menu li.config li.account' ).addClass( 'active' );
	</script>
	<!-- END SIDEBAR -->
	<!-- BEGIN CONTENT -->
	<div class="page-content-wrapper">
		<div class="page-content relative clear">
			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- /.modal -->
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- BEGIN STYLE CUSTOMIZER -->
			<!-- BEGIN PAGE HEADER-->
			<!-- END PAGE HEADER-->
			<div class="row">
                <div class="col-xs-12">
                    <div class="portlet light ">
        	            <div class="portlet-title">
                        <div class="caption">
        	                <span class="caption-subject bold uppercase font-dark">修改密码</span>
        	                <span class="caption-helper">账户信息</span>
                        </div>
                        <div class="tools">
                          <i class="iconfont">&#xe608;</i>
                        </div>
        	        	</div>
        	            <div class="portlet-body">
                         <form action="" id="accountConfig" method="POST"
                            class="form-horizontal" enctype="multipart/form-data" role="form">
                                <div class="text-left">
                                    <div class="form-group">
                                        <label class="control-label col-xs-4">用户名:</label>
                                        <div class="col-xs-8">
                                            <%
                                                String userName = ((User)request.getSession().getAttribute("USER_CONTEXT")).getUsername();
                                            %>
                                            <input name="" type="text" class="form-control" value="<%
                                                        out.print( userName );
                                                   %>" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-xs-4">原密码:</label>
                                        <div class="col-xs-8">
                                            <input id="pw" name="pw" type="password" class="form-control" value="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-xs-4">新密码:</label>
                                        <div class="col-xs-8">
                                            <input id="newPw" name="newPw" type="password" class="form-control" value="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-xs-4">确认密码:</label>
                                        <div class="col-xs-8">
                                            <input id="confirmNewPw" name="confirmNewPw" type="password" class="form-control" value="">
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="u-btn submit">确 定</button>
                                <div class="loading"><img src="./public/img/running.gif"></div>
                            </form>
                      </div>
                    </div>
                </div>
			</div>
		</div>
	</div>
	<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->
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
<!-- BEGIN FOOTER -->
<%@include file="../public/footer.jsp" %>
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="<c:url value="/lib/metronic/assets/global/plugins/respond.min.js" />"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/excanvas.min.js" />"></script> 
<![endif]-->

<script src="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/js/bootstrap.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/js.cookie.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.blockui.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" />" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery-ui/jquery-ui.min.js" />" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL SCRIPTS -->
<script src="<c:url value="/public/lib/metronic/assets/global/scripts/app.min.js" />" type="text/javascript"></script>
<!-- END THEME GLOBAL SCRIPTS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<c:url value="/public/lib/metronic/assets/pages/scripts/ui-modals.min.js" />" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN THEME LAYOUT SCRIPTS -->
<script src="<c:url value="/public/lib/metronic/assets/layouts/layout2/scripts/layout.min.js" />" type="text/javascript"><
/script>
<script src="<c:url value="/public/lib/metronic/assets/layouts/layout2/scripts/demo.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/layouts/global/scripts/quick-sidebar.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/jquery.validate.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js/validate-config.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/react-15.3.0/build/react.js" />"
    type="text/javascript"></script>
<script src="<c:url value="/public/lib/react-15.3.0/build/react-dom.js" />"
    type="text/javascript"></script>

<script src="<c:url value="/public/js/sea.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js/sea_config.js" />" type="text/javascript"></script>
<script>
    seajs.use( 'account' );
</script>



<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>