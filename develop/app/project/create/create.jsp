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
<meta charset="utf-8" />
<title>新建项目</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<meta content="" name="description" />
<meta content="" name="author" />
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link
	href="<c:url value="/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/lib/metronic/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/lib/metronic/assets/global/plugins/bootstrap/css/bootstrap.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/lib/metronic/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" />"
	rel="stylesheet" type="text/css" />
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL STYLES -->
<link
	href="<c:url value="/lib/metronic/assets/global/css/components.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/lib/metronic/assets/global/css/plugins.min.css" />"
	rel="stylesheet" type="text/css" />
<!-- END THEME GLOBAL STYLES -->
<!-- BEGIN THEME LAYOUT STYLES -->
<link
	href="<c:url value="/lib/metronic/assets/layouts/layout/css/layout.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/lib/metronic/assets/layouts/layout/css/themes/darkblue.min.css" />"
	rel="stylesheet" type="text/css" id="style_color" />
<link
	href="<c:url value="/lib/metronic/assets/layouts/layout/css/custom.min.css" />"
	rel="stylesheet" type="text/css" />
<link rel="stylesheet"
	href="<c:url value="/lib/sweet-alert/sweet-alert.css" />"
	type="text/css">

<link rel="stylesheet" href="<c:url value="/css/common.css" />"
	type="text/css">
<link rel="shortcut icon" href="favicon.ico" />

<style>
#days-error {
	float: left;
	width: 100%;
}

.page-wrap {
	margin: 0 auto 20px;
	width: 100%;
	max-width: 1000px;
	border: 10px solid #eef1f5;
}

.page-wrap .page {
	background-color: #fff;
	padding: 10px;
	border: 1px solid #eef1f5;
}

textarea {
	resize: none;
}

.form-group select {
	width: 116px;
}

.page .title {
	margin-bottom: 20px;
	font-size: 20px;
}

.btn.pre,.btn.next {
	margin-left: 20px;
	margin-right: 20px;
}

.step {
	color: #aaa;
}

.scan-type {
	padding-top: 0 !important;
}

.scan-type label.mt-checkbox:first-child {
	margin-right: 0;
}

.scan-type label.mt-checkbox {
	margin-right: 40px;
}

.scan-type select {
	display: inline;
	margin-right: 40px;
}

.page-wrap {
	overflow: hidden;
}

.page-wrap .content {
	position: relative;
	left: 0;
	transition: left 1s;
}

.page-wrap .page {
	float: left;
}

.service-more,.host-more {
	display: none;
}

#interval-error {
	float: left;
}
</style>
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
<body
	class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
	<!-- BEGIN HEADER -->
	<%@include file="/cp/public/head.jsp"%>
	<!-- END HEADER -->
	<div class="clearfix"></div>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<%@include file="/cp/public/sidebar.jsp"%>
		<!-- END SIDEBAR -->
		<!-- BEGIN CONTENT -->
		<div class="page-content-wrapper">
			<div class="page-content">
				<!-- BEGIN PAGE HEADER-->
				<div class="row">
					<div class="col-md-12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<div class="page-bar" style="border-bottom:none;">
							<ul class="page-breadcrumb">
								<li><i class="fa fa-home"></i> <a href="javascript:;">项目管理</a>
									<i class="fa fa-angle-right"></i></li>
								<li><a href="javascript:;">新建项目</a></li>
							</ul>
						</div>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<!--表单开始-->
				<div class="tabbable tabbable-tabdrop">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#page1" data-toggle="tab"
							aria-expanded="true">基本信息</a></li>
						<li class=""><a href="#page2" data-toggle="tab"
							aria-expanded="false">主机发现</a></li>
						<li class=""><a href="#page3" data-toggle="tab"
							aria-expanded="false">服务探测</a></li>
						<li class=""><a href="#page4" data-toggle="tab"
							aria-expanded="false">漏洞挖掘</a></li>
					</ul>
					<div class="form center col-lg-8 col-md-12 col-sm-12 col-xs-12">
						<form action="create" id="config" method="POST"
							class="form-horizontal" enctype="multipart/form-data" role="form">
							<!-- begain form-body -->
							<div class="form-body text-left">
								<div class="tab-content">
									<div class="tab-pane active" id="page1">
										<div class="page page1">
											<div class="form-group">
												<label class="control-label col-md-3">项目名称 <span
													class="required" aria-required="true"> * </span> </label>
												<div class="col-md-7">
													<input name="name" type="text" class="form-control">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">项目描述&nbsp;&nbsp;&nbsp;</label>
												<div class="col-md-7">
													<textarea name="describe" class="form-control" rows="2"></textarea>
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">扫描范围 <span
													class="required" aria-required="true">* </span> </label>
												<div class="col-md-7">
													<textarea name="target" class="form-control" rows="3"></textarea>
													<span class="help-block">
														<p>支持格式：单个IP——10.0.0.1，IP段——10.0.0.1-127
															，CIDR——10.0.0.1/16
													</span>
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">黑名单 </label>
												<div class="col-md-7">
													<input name="blacklistfile" type="file" accept=".txt">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">任务类型 <span
													class="required" aria-required="true"> * </span> </label>
												<div class="col-md-2">
													<select class="form-control cycle-trl" name="projectFlag">
														<option value="0">一次</option>
														<option value="1" selected>周期</option>
													</select>
												</div>
											</div>
											<div class="form-group cycle">
												<label class="control-label col-md-3">周期间隔 <span
													class="required" aria-required="true"> * </span> </label>
												<div class="col-md-3">
													<input name="interval" type="text" size="5" value="0">
													天
												</div>
											</div>
										</div>
									</div>
									<div class="tab-pane" id="page2">
										<div class="page page2">
											<div class="form-group">
												<label class="control-label col-md-3">探测强度等级 <span
													class="required" aria-required="true">* </span> </label>
												<div class="col-md-7">
													<select name="intensity" class="form-control">
														<option value="1" selected>1级(15)</option>
														<option value="2">2级(50)</option>
														<option value="3">3级(100)</option>
														<option value="4">4级(500)</option>
														<option value="5">5级(1000)</option>
													</select> <span class="help-block"> 括号中为该等级使用的热门端口数量 </span>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label">探测协议 <span
													class="required" aria-required="true">* </span> </label>
												<div class="col-md-7">
													<select name="protocol" class="form-control">
														<option value="tcp" selected>TCP</option>
														<option value="udp">UDP</option>
														<option value="promis">TCP和UDP</option>
													</select>
												</div>
											</div>
											<!--
											<div class="form-group">
												<label class="control-label col-md-3">开启拓扑发现 <span
													class="required" aria-required="true">* </span> </label>
												<div class="col-md-7">
													<div class="mt-checkbox-inline">
														<label class="mt-radio mt-radio-outline">否 <input
															type="radio" value="0" name="enable_topo_probe" checked>
															<span></span> </label> <label class="mt-radio mt-radio-outline">是
															<input type="radio" value="1" name="enable_topo_probe">
															<span></span>
														</label>
													</div>
												</div>
											</div>
											-->
											<div class="form-group">
												<div class="control-label col-md-3">
													<a class="show" data-for=".host-more">更多配置&gt;&gt;</a>
												</div>
											</div>
											<div class="host-more">
												<div class="form-group">
													<label class="control-label col-md-3">额外TCP端口 </label>
													<div class="col-md-7">
														<input name="hd_addition_port_tcp" type="text"
															class="form-control"> <span class="help-block">
															需要额外扫描的TCP端口，如有多个用空格隔开 </span>
													</div>
												</div>
												<div class="form-group">
													<label class="control-label col-md-3">额外UDP端口 </label>
													<div class="col-md-7">
														<input name="hd_addition_port_udp" type="text"
															class="form-control"> <span class="help-block">
															需要额外扫描的udp端口，如有多个用空格隔开 </span>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div class="tab-pane" id="page3">
										<div class="page page3">
											<div class="form-group">
												<label class="control-label col-md-3">扫描类型 <span
													class="required" aria-required="true">* </span> </label>
												<div class="col-md-7">
													<div class="mt-checkbox-inline scan-type">
														<label class="mt-checkbox mt-checkbox-outline"> <input
															name="tcpTmp" type="checkbox" checked>TCP: <span></span>
														</label> <select name="tcpList" class="form-control">
															<option value="sS" selected>sS</option>
															<option value="sA">sA</option>
															<option value="sT">sT</option>
															<option value="sF">sF</option>
															<option value="sI">sI</option>
															<option value="sM">sM</option>
															<option value="sN">sN</option>
															<option value="sW">sW</option>
															<option value="sX">sX</option>
														</select> <label class="mt-checkbox mt-checkbox-outline"> <input
															name="udpTmp" type="checkbox" value="sU">UDP:sU <span></span>
														</label> <label class="mt-checkbox mt-checkbox-outline"> <input
															name="sctpTmp" type="checkbox" value="sY">SCTP:sY
															<span></span> </label> <input name="scan_type" type="text"
															value="sS">
													</div>
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">热门端口 <span
													class="required" aria-required="true">* </span> </label>
												<div class="col-md-7">
													<input name="top_ports" type="number" min="1" max="1000"
														value="50" size=10> <span class="help-block">
														热门端口数范围1~1000 </span>
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">开启操作系统探测 <span
													class="required" aria-required="true">* </span> </label>
												<div class="col-md-7">
													<div class="mt-checkbox-inline">
														<label class="mt-radio mt-radio-outline">否 <input
															type="radio" value="0" name="enable_os_detec" checked>
															<span></span> </label> <label class="mt-radio mt-radio-outline">是
															<input type="radio" value="1" name="enable_os_detec">
															<span></span>
														</label>
													</div>
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">开启服务版本探测 <span
													class="required" aria-required="true">* </span> </label>
												<div class="col-md-7">
													<div class="mt-checkbox-inline">
														<label class="mt-radio mt-radio-outline">否 <input
															type="radio" value="0" name="enable_version_detec"
															checked> <span></span> </label> <label
															class="mt-radio mt-radio-outline">是 <input
															type="radio" value="1" name="enable_version_detec">
															<span></span>
														</label>
													</div>
												</div>
											</div>

											<div class="form-group">
												<div class="control-label col-md-3">
													<a class="show" data-for=".service-more">更多配置&gt;&gt;</a>
												</div>
											</div>
											<div class="service-more">
												<div class="form-group">
													<label class="control-label col-md-3">服务版本探测强度 </label>
													<div class="col-md-7">
														<select name="version_intensity" class="form-control">
															<option value="1" selected>1</option>
															<option value="2">2</option>
															<option value="3">3</option>
															<option value="4">4</option>
															<option value="5">5</option>
															<option value="6">6</option>
															<option value="7" selected>7</option>
															<option value="8">8</option>
															<option value="9">9</option>
														</select> <span class="help-block"> 1. 此功能需要开启服务版本探测。<br>
															2. 强度等级越高，探测结果越准确，同时消耗时间越多。 </span>
													</div>
												</div>
												<div class="form-group">
													<label class="control-label col-md-3">额外TCP端口 </label>
													<div class="col-md-7">
														<input name="sd_addition_port_tcp" type="text"
															class="form-control"> <span class="help-block">
															需要额外扫描的tcp端口，如有多个用空格隔开 </span>
													</div>
												</div>
												<div class="form-group">
													<label class="control-label col-md-3">额外UDP端口 </label>
													<div class="col-md-7">
														<input name="sd_addition_port_udp" type="text"
															class="form-control"> <span class="help-block">
															需要额外扫描的udp端口，如有多个用空格隔开 </span>
													</div>
												</div>
												<div class="form-group">
													<label class="control-label col-md-3">禁止扫描端口 </label>
													<div class="col-md-7">
														<input name="exclude_ports" type="text"
															class="form-control"> <span class="help-block">
															指定无需扫描的具体端口或端口范围 </span>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="tab-pane" id="page4">
										<div class="page page4">
											<div class="form-group">
												<label class="control-label col-md-3">弱口令探测协议 </label>
												<div class="col-md-7">
													<div class="mt-checkbox-inline">
														<label class="mt-checkbox mt-checkbox-outline"> <input
															name="probe_module" type="checkbox" value="ssh">ssh
															<span></span> </label> <label
															class="mt-checkbox mt-checkbox-outline"> <input
															name="probe_module" type="checkbox" value="ftp">ftp
															<span></span> </label> <label
															class="mt-checkbox mt-checkbox-outline"> <input
															name="probe_module" type="checkbox" value="rtsp">rtsp
															<span></span> </label> <label
															class="mt-checkbox mt-checkbox-outline"> <input
															name="probe_module" type="checkbox" value="telnet">telnet
															<span></span>
														</label>
													</div>
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">检测设备重启漏洞 <span
													class="required" aria-required="true">* </span> </label>
												<div class="col-md-7">
													<div class="mt-checkbox-inline">
														<label class="mt-radio mt-radio-outline">否 <input
															type="radio" value="0" name="enable_reboot" checked>
															<span></span> </label> <label class="mt-radio mt-radio-outline">是
															<input type="radio" value="1" name="enable_reboot">
															<span></span>
														</label>
													</div>
													<span class="help-block"> 是否检测会导致设备重启的漏洞？ </span>
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">检测更改配置文件漏洞 <span
													class="required" aria-required="true">* </span> </label>
												<div class="col-md-7">
													<div class="mt-checkbox-inline">
														<label class="mt-radio mt-radio-outline">否 <input
															type="radio" value="0" name="enable_change" checked>
															<span></span> </label> <label class="mt-radio mt-radio-outline">是
															<input type="radio" value="1" name="enable_change">
															<span></span>
														</label>
													</div>
													<span class="help-block"> 是否检测会导致修改设备配置文件的漏洞？ </span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<button type="submit" class="btn blue submit">提交</button>
						</form>
					</div>
				</div>
			</div>
			<!--表单结束-->
		</div>
	</div>
	<!-- END CONTENT -->
	<!-- END CONTAINER -->
	<%@include file="/cp/public/footer.jsp" %>
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN CORE PLUGINS -->
	<!--[if lt IE 9]>
<script src="<c:url value="/lib/metronic/assets/global/plugins/respond.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/excanvas.min.js" />" type="text/javascript"></script> 
<![endif]-->
	<script
		src="<c:url value="/lib/metronic/assets/global/plugins/jquery.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/lib/metronic/assets/global/plugins/bootstrap/js/bootstrap.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/lib/metronic/assets/global/plugins/js.cookie.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/lib/metronic/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/lib/metronic/assets/global/plugins/jquery.blockui.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/lib/metronic/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" />"
		type="text/javascript"></script>
	<!-- END CORE PLUGINS -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script
		src="<c:url value="/lib/metronic/assets/global/plugins/jquery-ui/jquery-ui.min.js" />"
		type="text/javascript"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN THEME GLOBAL SCRIPTS -->
	<script
		src="<c:url value="/lib/metronic/assets/global/scripts/app.min.js" />"
		type="text/javascript"></script>
	<!-- END THEME GLOBAL SCRIPTS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script
		src="<c:url value="/lib/metronic/assets/pages/scripts/ui-modals.min.js" />"
		type="text/javascript"></script>
	<!-- END PAGE LEVEL SCRIPTS -->
	<!-- BEGIN THEME LAYOUT SCRIPTS -->
	<script
		src="<c:url value="/lib/metronic/assets/layouts/layout/scripts/layout.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/lib/metronic/assets/layouts/layout/scripts/demo.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/lib/metronic/assets/layouts/global/scripts/quick-sidebar.min.js" />"
		type="text/javascript"></script>

	<script src="<c:url value="/lib/bootstrap-paginator.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/lib/echarts.min.js" />"
		type="text/javascript"></script>

	<script src="<c:url value="/lib/bootstrap-paginator.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/lib/echarts.min.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/lib/masonry.pkgd.min.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/lib/sweet-alert/sweet-alert.min.js" />"
		type="text/javascript"></script>


	<script src="<c:url value="/js/common.js" />" type="text/javascript"></script>
	<script src="<c:url value="/js/waterfall.js" />" type="text/javascript"></script>
	<script src="<c:url value="/js/artTemplate.js" />"
		type="text/javascript"></script>

	<script src="<c:url value="/lib/jquery.validate.min.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/js/validate-config.js" />"
		type="text/javascript"></script>

	<script src="<c:url value="/cp/project/create/create.js" />"
		type="text/javascript"></script>

	<script>
		$('.page-sidebar-menu li.project').addClass('active open');
		$('.page-sidebar-menu li.project').find('.arrow').addClass('open');
		$('.page-sidebar-menu li.project li.create').addClass('active');
	</script>
	<script>
		
	</script>
	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>