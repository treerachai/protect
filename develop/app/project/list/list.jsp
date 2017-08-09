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
<title>项目列表</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta content="" name="description"/>
<meta content="" name="author"/>
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="<c:url value="/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/lib/metronic/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/lib/metronic/assets/global/plugins/bootstrap/css/bootstrap.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/lib/metronic/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" />" rel="stylesheet" type="text/css" />
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL STYLES -->
<link href="<c:url value="/lib/metronic/assets/global/css/components.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/lib/metronic/assets/global/css/plugins.min.css" />" rel="stylesheet" type="text/css" />
<!-- END THEME GLOBAL STYLES -->
<!-- BEGIN THEME LAYOUT STYLES -->
<link href="<c:url value="/lib/metronic/assets/layouts/layout/css/layout.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/lib/metronic/assets/layouts/layout/css/themes/darkblue.min.css" />" rel="stylesheet" type="text/css" id="style_color" />
<link href="<c:url value="/lib/metronic/assets/layouts/layout/css/custom.min.css" />" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<c:url value="/lib/sweet-alert/sweet-alert.css" />" type="text/css">

<link rel="stylesheet" href="<c:url value="/css/common.css" />" type="text/css">
<!-- END THEME STYLES -->
<link rel="shortcut icon" href="favicon.ico"/>

<style>
	.modal-body{ overflow: auto; }
	
	.form .title{ margin-top: 18px; margin-bottom: 6px; font-size: 20px; }
	.form .title:first-child{ margin-top: 0; }
	.form .form-body{ padding-top: 0; }
	.c-list{ margin-bottom: 8px; }
	.c-list:hover{ background: #ddd; }
	.c-list .control-label{ text-align: left !important; }
	.c-list .c-content{ padding-top: 7px; }
	
	table.list th,
	table.list td{ padding: 2px !important; text-align: center; vertical-align: middle !important; }
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
<body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
<!-- BEGIN HEADER -->
<%@include file="/cp/public/head.jsp" %>
<!-- END HEADER -->
<div class="clearfix"></div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
	<!-- BEGIN SIDEBAR -->
	<%@include file="/cp/public/sidebar.jsp" %>
	<!-- END SIDEBAR -->
	<!-- BEGIN CONTENT -->
	<div class="page-content-wrapper">
		<div class="page-content relative">
			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- /.modal -->
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- BEGIN STYLE CUSTOMIZER -->
			<!-- BEGIN PAGE HEADER-->
			<div class="row">
				<div class="col-md-12">
					<!-- BEGIN PAGE TITLE & BREADCRUMB-->
					<div class="page-bar" style="border-bottom:none;">
                        <ul class="page-breadcrumb">
                        	<li>
                        		<i class="fa fa-user-md"></i>
                                <a href="javascript:;">项目管理</a>
                                <i class="fa fa-angle-right"></i>
                            </li>
                            <li>
                            	<a href="javascript:;">项目列表</a>
                            </li>
                        </ul>
                    </div>
					<!-- END PAGE TITLE & BREADCRUMB-->
				</div>
			</div>
			<!-- END PAGE HEADER-->
			<div class="table-responsive">
				<!--任务列表弹出框开始-->
				<div class="bootbox modal fade bootbox-alert in" id="config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
								<h4 class="modal-title">项目配置</h4>
							</div>
							<div class="modal-body">
								<!--配置详情开始-->
								<div class="detail">
									<!--表单开始-->
									<div class="form">
										<div id="config" class="form-horizontal">
											<div class="form-body">
												<h2 class="title">1. 主机发现参数配置</h2>
												<div class="form-group c-list name">
													<label class="control-label col-md-5 col-xs-6">项目名称 </label>
													<div class="col-md-6 col-xs-6 c-content">
													</div>
												</div>
												<div class="form-group c-list describe">
													<label class="control-label col-md-5 col-xs-6">项目描述 </label>
													<div class="col-md-6 col-xs-6 c-content">
													</div>
												</div>
												<div class="form-group c-list target">
													<label class="control-label col-md-5 col-xs-6">扫描范围</label>
													<div class="col-md-6 col-xs-6 c-content">
													</div>
												</div>
												<div class="form-group c-list intensity">
													<label class="control-label col-md-5 col-xs-6">探测强度等级</label>
													<div class="col-md-6 col-xs-6 c-content">
														1级
													</div>
												</div>
												<div class="form-group c-list protocol">
													<label class="control-label col-md-5 col-xs-6">探测协议</label>
													<div class="col-md-6 col-xs-6 c-content">
														tcp与udp
													</div>
												</div>
												<div class="form-group c-list enable_topo_probe">
													<label class="control-label col-md-5 col-xs-6">开启拓扑发现</label>
													<div class="col-md-6 col-xs-6 c-content">
														是
													</div>
												</div>
												<div class="form-group c-list addition_port_tcp">
													<label class="control-label col-md-5 col-xs-6">主机发现额外TCP端口</label>
													<div class="col-md-6 col-xs-6 c-content">
														89 90 80
													</div>
												</div>
												<div class="form-group c-list addition_port_udp">
													<label class="control-label col-md-5 col-xs-6">主机发现额外UDP端口</label>
													<div class="col-md-6 col-xs-6 c-content">
														89 90 80
													</div>
												</div>
												<h2 class="title">2. 服务探测参数配置</h2>
												<div class="form-group c-list scan_type">
													<label class="control-label col-md-5 col-xs-6">扫描类型</label>
													<div class="col-md-6 col-xs-6 c-content">
														TCP:sS UDP:sU
													</div>
												</div>
												<div class="form-group c-list top_ports">
													<label class="control-label col-md-5 col-xs-6">热门端口</label>
													<div class="col-md-6 col-xs-6 c-content">
														800
													</div>
												</div>
												<div class="form-group c-list enable_os_detec">
													<label class="control-label col-md-5 col-xs-6">开启操作系统探测</label>
													<div class="col-md-6 col-xs-6 c-content">
														是
													</div>
												</div>
												<div class="form-group c-list enable_version_detec">
													<label class="control-label col-md-5 col-xs-6">开启服务版本探测</label>
													<div class="col-md-6 col-xs-6 c-content">
														是
													</div>
												</div>
												<div class="form-group c-list version_intensity">
													<label class="control-label col-md-5 col-xs-6">服务版本探测强度</label>
													<div class="col-md-6 col-xs-6 c-content">
														6
													</div>
												</div>
												<div class="form-group c-list addition_port">
													<label class="control-label col-md-5 col-xs-6">额外端口</label>
													<div class="col-md-6 col-xs-6 c-content">
														TCP:89 90, UDP:52 63
													</div>
												</div>
												<div class="form-group c-list exclude_ports">
													<label class="control-label col-md-5 col-xs-6">禁止扫描端口</label>
													<div class="col-md-6 col-xs-6 c-content">
														63 96 58
													</div>
												</div>
												<h2 class="title">3. 其他参数配置</h2>
												<div class="form-group c-list probe_module">
													<label class="control-label col-md-5 col-xs-6">弱口令探测协议</label>
													<div class="col-md-6 col-xs-6 c-content">
														ssh ftp
													</div>
												</div>
												<div class="form-group c-list enable_reboot">
													<label class="control-label col-md-5 col-xs-6">检测设备重启漏洞</label>
													<div class="col-md-6 col-xs-6 c-content">
														否
													</div>
												</div>
												<div class="form-group c-list enable_change">
													<label class="control-label col-md-5 col-xs-6">检测更改配置文件漏洞</label>
													<div class="col-md-6 col-xs-6 c-content">
														
													</div>
												</div>
												<div class="form-group c-list projectFlag">
													<label class="control-label col-md-5 col-xs-6">任务类型</label>
													<div class="col-md-6 col-xs-6 c-content">
														周期
													</div>
												</div>
												<div class="form-group c-list interval">
													<label class="control-label col-md-5 col-xs-6">周期</label>
													<div class="col-md-6 col-xs-6 c-content">
														5天
													</div>
												</div>
											</div>
										</div>
									</div>
									<!--表单结束-->
								</div>
								<!--配置详情结束-->
							</div>
							<div class="modal-footer">
								<div class="loading"><img src="../img/running.gif" style="height:40px"></div>
				                <div class="form-group" style="text-align:center;">
									<button type="button" class="btn blue" data-dismiss="modal">关闭</button>
								</div>
				            </div>
						</div>
						<!-- /.modal-content -->
					</div>
					<!-- /.modal-dialog -->
				</div>
				<!--任务列表弹出框结束-->
				<table class="table table-bordered table-hover list">
					<thead>
						<tr>
							<th rowspan=2>项目名称</th>
							<th rowspan=2>项目描述</th>
							<th colspan=3>最近一次任务</th>
							<th rowspan=2>状态</th>
							<th rowspan=2>操作</th>
						</tr>
						<tr>
							<th>进度</th>
							<th>资产数</th>
							<th>漏洞数</th>
						</tr>
					</thead>
					<tbody class="content">
					</tbody>
				</table>
			</div>
			<div class="loading"><img src="../img/running.gif" style="height:50px"></div>
			<div class="page relative center">
				<ul id="project-page" style="cursor:pointer;"></ul>
				<div class="page-mask"></div>
			</div>			
		</div>
	</div>
	<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<%@include file="/cp/public/footer.jsp" %>
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="<c:url value="/lib/metronic/assets/global/plugins/respond.min.js" />"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/excanvas.min.js" />"></script> 
<![endif]-->
<script src="<c:url value="/lib/metronic/assets/global/plugins/jquery.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/bootstrap/js/bootstrap.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/js.cookie.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/jquery.blockui.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" />" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="<c:url value="/lib/metronic/assets/global/plugins/jquery-ui/jquery-ui.min.js" />" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL SCRIPTS -->
<script src="<c:url value="/lib/metronic/assets/global/scripts/app.min.js" />" type="text/javascript"></script>
<!-- END THEME GLOBAL SCRIPTS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<c:url value="/lib/metronic/assets/pages/scripts/ui-modals.min.js" />" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN THEME LAYOUT SCRIPTS -->
<script src="<c:url value="/lib/metronic/assets/layouts/layout/scripts/layout.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/layouts/layout/scripts/demo.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/layouts/global/scripts/quick-sidebar.min.js" />" type="text/javascript"></script>

<script src="<c:url value="/lib/bootstrap-paginator.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/sweet-alert/sweet-alert.min.js" />" type="text/javascript"></script>

<script src="<c:url value="/js/common.js" />" type="text/javascript"></script>
<script src="<c:url value="/cp/project/list/list.js" />" type="text/javascript"></script>

<script>
	$( '.page-sidebar-menu li.project' ).addClass( 'active open' );
	$( '.page-sidebar-menu li.project' ).find( '.arrow' ).addClass( 'open' );
	$( '.page-sidebar-menu li.project li.list' ).addClass( 'active' );
	
</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>