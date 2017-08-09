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
<title>通信监测</title>
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
 
<link rel="stylesheet" href="<c:url value="/public/lib/timepicker/css/jquery-ui-1.11.4.css" />" type="text/css">
<link rel="stylesheet" href="<c:url value="/public/lib/timepicker/css/jquery-ui-timepicker-addon.css" />" type="text/css">

<link rel="stylesheet" href="<c:url value="/public/css/common.css" />" type="text/css">
<link rel="stylesheet" href="<c:url value="/public/css/component.css" />" type="text/css">
<link rel="stylesheet" href="<c:url value="/public/css/communication.css" />" type="text/css">

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
		$( '.page-sidebar-menu li.communication' ).addClass( 'active open' );
	</script>
	<!-- END SIDEBAR -->
	<!-- BEGIN CONTENT -->
	<div class="page-content-wrapper">
		<div class="page-content relative">
			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- /.modal -->
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- BEGIN STYLE CUSTOMIZER -->
			<!-- BEGIN PAGE HEADER-->
			<!-- END PAGE HEADER-->
			<div class="row">
				<div class="col-xs-12">
                    <div class="portlet light">
                        <div class="portlet-title">
                            <div class="caption">
                                <span class="caption-subject bold uppercase font-dark">通信监测</span>
                                <span class="caption-helper"></span>
                            </div>
                            <div class="tools">
                                每页显示数目：
                                <select class="sele-perpage">
                                  <option value="10">10</option>
                                  <option value="15" selected="">15</option>
                                  <option value="20">20</option>
                                  <option value="30">30</option>
                                </select>
                            </div>
                    	</div>
                        <div class="portlet-body">
                            <div class="filt-wrapper">
                                <form action="" class="J-filter">
                                    <div class="item">
                                         <ul class="input-filt clear">
                                            <li class="sub-item">
                                                <label>起始时间: <input class="timepicker" type="text" name="startTime"></label>
                                            </li>
                                            <li class="sub-item">
                                                <label>终止时间: <input class="timepicker" type="text" name="endTime"></label>
                                            </li>
                                            <li class="sub-item">
                                                <label>源IP: <input type="text" name="sourceIp"></label>
                                            </li>
                                            <li class="sub-item">
                                                <label>目的IP: <input type="text" name="targetIp"></label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="item check-filt">
                                        类型:
                                        <label><input type="checkbox" name="type" value="http" checked>HTTP</label>
                                        <label><input type="checkbox" name="type" value="ftp"
                                        checked>FTP</label>
                                        <label><input type="checkbox" name="type" value="telnet" checked>TELNET</label>
                                        <label><input type="checkbox" name="type" value="ssh" checked>SSH</label>
                                        <label><input type="checkbox" name="type" value="rtsp" checked>RTSP</label>
                                        <label><input type="checkbox" name="type" value="onvif" checked>ONVIF</label>
                                        <label><input type="checkbox" name="type" value="sip" checked>SIP(GBT218181)</label>
                                        <label><input type="checkbox" name="type" value="rtp/rtcp" checked>RTP/RTCP</label>
                                        <label><input type="checkbox" name="type" value="dns" checked>DNS</label>
                                    </div>
                                </form>
                            </div>
                            <div class="operate clear">
                                <div class="m-label float-left">
                                    <button class="u-btn_success u-radius J-query">&nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont">&#xe609;</i>查询&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                    <span class="u-info"><em class="J-all_num">0</em>条记录</span>
                                </div>
                                <div class="m-label float-right">
                                    <span class="u-info">剩余空间<em id="J-space"></em></span>
                                    <button class="u-btn u-radius J-delete"><i class="iconfont">&#xe61b;</i> 手动删除</button>
                                </div>
                            </div>
                            <!--
                            <div class="relative">
                                <div id="page-list"></div>
                                <div class="loading">
                                    <img src="<c:url value="/public/img/running.gif" />">
                                </div>
                                <div class="page relative center">
                                    <ul id="page-number"></ul>
                                    <div class="page-mask"></div>
                                </div>
                            </div>
                            -->
                            <div class="relative J-page-wrap">
                                <div class="page-list"></div>
                                <div class="loading">
                                    <img src="<c:url value="/public/img/running.gif" />">
                                </div>
                                <div class="page relative center">
                                    <ul class="page-number"></ul>
                                    <ul class="jump pagination" style="display: none;">
                                    </ul>
                                    <div class="page-mask"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	</div>
	<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->
<div class="bootbox modal fade bootbox-alert" id="deleteCommunication" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">删除通信记录</h4>
            </div>
            <div class="modal-body">
                <!--配置详情开始-->
                <div class="detail">
                    <!--表单开始-->
                    <div class="form">
                        <form class="form-horizontal">
                            <div class="form-body">
                                <div class="form-group">
                                    <label class="control-label col-md-3">删除条数 <span class="required" aria-required="true"> * </span> </label>
                                    <div class="col-md-7">
                                        <input name="num" type="text" class="form-control">
                                        <span class="help-block"> 删除时间最早的记录 </span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--表单结束-->
                </div>
                <!--配置详情结束-->
            </div>
            <div class="modal-footer">
                <div class="loading" style="display: none;"><img src="<c:url value="/public/img/running.gif"/>"></div>
                <div class="form-group center">
                    <button type="button" class="u-btn ok">确定</button>
                    <button type="button" class="u-btn_cancel" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
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
<!-- BEGIN FOOTER -->
<%@include file="../public/footer.jsp" %>
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="<c:url value="/lib/metronic/assets/global/plugins/respond.min.js" />"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/excanvas.min.js" />"></script> 
<![endif]-->
<script src="<c:url value="/public/js/sea.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js/sea_config.js" />" type="text/javascript"></script>

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
<script src="<c:url value="/public/lib/metronic/assets/layouts/layout2/scripts/layout.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/layouts/layout2/scripts/demo.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/layouts/global/scripts/quick-sidebar.min.js" />" type="text/javascript"></script>

<script src="<c:url value="/public/lib/bootstrap-paginator.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/react-15.3.0/build/react.js" />"
	type="text/javascript"></script>
<script src="<c:url value="/public/lib/react-15.3.0/build/react-dom.js" />"
	type="text/javascript"></script>
<script src="<c:url value="/public/lib/timepicker/js/jquery-ui-timepicker-addon.js" />"
    type="text/javascript"></script>
<script src="<c:url value="/public/lib/timepicker/js/jquery-ui-timepicker-zh-CN.js" />"
    type="text/javascript"></script>

<script src="<c:url value="/public/lib/jquery.validate.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js/validate-config.js" />" type="text/javascript"></script>

<script src="<c:url value="/public/js/common.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js/subscribe.js" />" type="text/javascript"></script>

<script>
    seajs.use( 'communication' );
</script>

<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>