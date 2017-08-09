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
<title>任务详情页</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta content="" name="description"/>
<meta content="" name="author"/>
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="<c:url value="/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />" rel="stylesheet" type="text/css" />
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

<link rel="stylesheet" href="<c:url value="/css/common-3fed2d36ec.css" />" type="text/css">

<link rel="stylesheet" href="<c:url value="/cp/project/detail/detail.css" />" type="text/css">
<!-- END THEME STYLES -->
<style>

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
		<div class="page-content">
			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			
			<!-- /.modal -->
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- BEGIN STYLE CUSTOMIZER -->
			
			<!-- BEGIN PAGE HEADER-->
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
                            	<a href="javascript:;">项目详情</a>
                            </li>
                        </ul>
                    </div>
					<!-- END PAGE TITLE & BREADCRUMB-->
				</div>
			</div>
			<!-- END PAGE HEADER-->
			<!-- END PAGE HEADER-->
			<div class="clearfix"></div>
			<!--项目风险趋势开始-->
			<div class="row">
				<div class="col-md-12">
					<div class="portlet box green">
	                    <div class="portlet-title">
	                        <div class="caption">
	                            <i class="fa fa-gift"></i>任务结果概览 </div>
	                        <div class="tools">
	                            <a href="javascript:;" class="collapse" data-original-title="" title=""> </a>
	                        </div>
	                    </div>
	                    <div class="portlet-body" style="display: block;">
	                    	<div id="time-line" style="height: 250px">
	                    	</div>
	                    </div>
	                </div>
				</div>
			</div>
			<!--项目风险趋势结束-->

			<!--扫描结果展示开始-->
			<div class="row" style="border-top:1px solid #ddd;margin-top: -12px;padding-top: 5px;">
				<!--任务列表弹出框开始-->
				<div class="bootbox modal fade bootbox-alert in" id="task-list" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
								<h4 class="modal-title">任务列表</h4>
							</div>
							<div class="modal-body">
								<!--任务列表开始-->
								<div class="list-wrap">
									<table class="table table-bordered list">
										<thead>
										<tr>
											<th>编号</th>
											<th>进度(%)</th>
											<th>时间</th>
											<th>耗时(分)</th>
											<th>资产</th>
											<th>漏洞</th>
											<th>操作</th>
										</tr>
										</thead>
										<tbody>
										</tbody>
									</table>
								</div>
								<!--任务列表结束-->
								<div class="loading"><img src="../../img/running.gif" style="height:40px"></div>
							</div>
							<div class="modal-footer relative">
								<ul id="task-page"></ul>
								<div class="page-mask"></div>
							</div>
						</div>
						<!-- /.modal-content -->
					</div>
					<!-- /.modal-dialog -->
				</div>
				<!--任务列表弹出框结束-->
				<!--任务列表、报表导出开始-->
				<div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
					<a href="#task-list" data-toggle="modal" class="btn blue" style="font-size:14px">任务列表</a>
					<ul class="list-inline" style="display:inline;vertical-align:-10px;">
						<li>进度：<span class="progress" style="color:red;"></span></li>
						<li>状态：<span class="state" style="color:red;"></span></li>
						<li>开始时间：<span class="start-time"></span></li>
						<li>耗时：<span class="taking-time"></span></li>
						<li>执行次数：<span class="times"></span></li>
					</ul>
				</div>
				<div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 text-right">
					<div class="btn-group">
						<button id="import-report" type="button" class="btn blue dropdown-toggle" data-toggle="dropdown">
						报表导出 <i class="fa fa-angle-down"></i>
						</button>
						<ul class="dropdown-menu" role="menu" aria-labelledby="btnGroupVerticalDrop7" style="min-width:98px">
							<li>
								<a href="#">概览报表 </a>
							</li>
							<li>
								<a href="#">详细报表 </a>
							</li>
						</ul>
					</div>
				</div>
					
				
				<!--任务列表、报表导出结束-->
				<!--搜索和条件过滤开始-->
				<div class="col-lg-12 col-xs-12 filter-wrap">
					<div class="input-group" style="width:600px;margin-top:10px;">
						<input type="text" class="form-control search">
						<span class="input-group-addon btn-search">
							<i class="fa fa-search"></i>
						</span>
					</div>
					<div class="filter">
						<div class="filter-line type">
							<div class="key"><strong>设备类型：</strong></div>
							<ul class="list-inline filter-list">
								<li class="init f active" data-f="devicetype=*">全部</li>
								<li class="f" data-f="devicetype=视频监控">视频监控</li>
								<li class="f" data-f="devicetype=工业控制">工业控制</li>
								<li class="f" data-f="devicetype=网络设备">网络设备</li>
								<li class="f" data-f="devicetype=办公设备">办公设备</li>
								<li class="f" data-f="devicetype=未知">未知</li>
							</ul>
							
						</div>
						<div class="filter-line service">
							<div class="key"><strong>服务：</strong></div>
							<ul class="list-inline filter-list">
								<li class="init f active" data-f="service=*">全部</li>
								<li class="f" data-f="service=http">http</li>
								<li class="f" data-f="service=ftp">ftp</li>
								<li class="f" data-f="service=未知">未知</li>
							</ul>
						</div>
					</div>
					<div class="result">
						<div class="sort">
							<div class="btn-group btn-group-solid sort-list">
								<button type="button" class="btn btn-default active" data-sort="vul">漏洞</button>
								<button type="button" class="btn btn-default" data-sort="port">端口</button>
								<button type="button" class="btn btn-default" data-sort="service">服务</button>
							</div>
							<div class="result-sum">共 <span class="num"></span> 个结果</div>
						</div>
						<div class="col-lg-9 col-md-8 col-sm-8 col-xs-12 text-center relative">
							<div class="device-list-wrap text-left">
								<div class="device-list">
									
								</div>
								<div class="temp" style="position:absolute;visibility: hidden;bottom:0;z-index:-1;">
									<!--每个设备详情开始-->
									<div class="each-device" style="top:0;left: 0;">
										<div class="ip-wrap">
											<p class="ip">192.168.123.111</p>
											<div class="os"><i class="fa fa-plus"></i></div>
											<div class="net"><i class="fa fa-plus"></i></div>
										</div>
										<div class="clearfix"></div>
										<div class="device-info">
											<span class="style">摄像机</span>
											<span class="brand">海康</span>
										</div>
										<div class="port">
											<ul class="port-info">
												<li >
													<ul class="list-inline">
														<li>80</li>
														<li>http</li>
														<li>DVR</li>
														<li>tomcat-2.0.3</li>
													</ul>
													<ul class="vul-list">
														<li>缓冲区溢出</li>
														<li>权限提升</li>
													</ul>
												</li>
											</ul>
										</div>
									</div>
									<div class="each-device" style="top:0;left: 290px;">
										<div class="ip-wrap">
											<p class="ip">192.168.123.111</p>
											<div class="os"><i class="fa fa-plus"></i></div>
											<div class="net"><i class="fa fa-plus"></i></div>
										</div>
										<div class="clearfix"></div>
										<div class="device-info">
											<span class="style">摄像机</span>
											<span class="brand">海康</span>
										</div>
										<div class="port">
											<ul class="port-info">
												
											</ul>
										</div>
									</div>
									<div class="each-device" style="top:0;left: 580px;">
										<div class="ip-wrap">
											<p class="ip">192.168.123.111</p>
											<div class="os"><i class="fa fa-plus"></i></div>
											<div class="net"><i class="fa fa-plus"></i></div>
										</div>
										<div class="clearfix"></div>
										<div class="device-info">
											<span class="style">摄像机</span>
											<span class="brand">海康</span>
										</div>
										<div class="port">
											<ul class="port-info">
												<li >
													<ul class="list-inline">
														<li>80</li>
														<li>http</li>
														<li>DVR</li>
														<li>tomcat-2.0.3</li>
													</ul>
													<ul class="vul-list">
														<li>缓冲区溢出</li>
														<li>权限提升</li>
													</ul>
												</li>
												<li>
													<ul class="list-inline">
														<li>80</li>
														<li>http</li>
														<li>DVR</li>
														<li>tomcat-2.0.3</li>
													</ul>
													<ul class="vul-list">
														<li>缓冲区溢出</li>
														<li>权限提升</li>
													</ul>
												</li>
											</ul>
										</div>
									</div>
									<div class="each-device" style="top: 140px;left: 0px;">
										<div class="ip-wrap">
											<p class="ip">192.168.123.111</p>
											<div class="os"><i class="fa fa-plus"></i></div>
											<div class="net"><i class="fa fa-plus"></i></div>
										</div>
										<div class="clearfix"></div>
										<div class="device-info">
											<span class="style">摄像机</span>
											<span class="brand">海康</span>
										</div>
										<div class="port">
											<ul class="port-info">
												<li >
													<ul class="list-inline">
														<li>80</li>
														<li>http</li>
														<li>DVR</li>
														<li>tomcat-2.0.3</li>
													</ul>
													<ul class="vul-list">
														<li>缓冲区溢出</li>
														<li>权限提升</li>
													</ul>
												</li>
												<li>
													<ul class="list-inline">
														<li>80</li>
														<li>http</li>
														<li>DVR</li>
														<li>tomcat-2.0.3</li>
													</ul>
													<ul class="vul-list">
														<li>缓冲区溢出</li>
														<li>权限提升</li>
													</ul>
												</li>
											</ul>
										</div>
									</div>
									<!--每个设备详情结束-->
								</div>
							</div>
							<div class="loading"><img src="../../img/running.gif" style="height:50px"></div>
							<div class="dev-page relative">
								<ul id="dev-page"></ul>
								<div class="page-mask"></div>
							</div>
						</div>
						<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
							<div class="statistics">
								<div class="unit">
									<div class="name">风险评估</div>
									<div class="content" id="risk" style="height:150px;"></div>
								</div>
								<div class="unit">
									<div class="name">设备类型</div>
									<div class="content" id="style" style="height:100px;"></div>
								</div>
								<div class="unit">
									<div class="name">漏洞</div>
									<div class="content" id="vul" style="height:100px;"></div>
								</div>
								<div class="unit">
									<div class="name">服务
										<a class="more" href="javascript:void(0);">更多&gt;&gt;</a>
									</div>
									<div class="content" id="service" style="height:110px;padding:0 5%;min-height:110px;overflow: hidden;">
										<div style="background: black;height:200px;"></div>
									</div>
								</div>
								<div class="unit">
									<div class="name">操作系统</div>
									<div class="content" id="os" style="height:100px;"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--搜索和条件过滤结束-->
			</div>
			<!--扫描结果展示结束-->

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
<script>
	var X = {
		taskId: '${taskid}',
		projectId: '${projectid}',
		tplDevice: '',
		root: '<%=request.getContextPath()%>'
	};
</script>
<!--[if lt IE 9]>
<script src="<c:url value="/lib/metronic/assets/global/plugins/respond.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/excanvas.min.js" />" type="text/javascript"></script> 
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
<script src="<c:url value="/lib/echarts.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/masonry.pkgd.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/sweet-alert/sweet-alert.min.js" />" type="text/javascript"></script>

<script src="<c:url value="/js/common.js" />" type="text/javascript"></script>
<script src="<c:url value="/js/waterfall.js" />" type="text/javascript"></script>
<script src="<c:url value="/js/artTemplate.js" />" type="text/javascript"></script>

<script src="<c:url value="/cp/project/detail/tpl.js" />" type="text/javascript"></script>
<script src="<c:url value="/cp/project/detail/chart.js" />" type="text/javascript"></script>
<script src="<c:url value="/cp/project/detail/detail.js" />" type="text/javascript"></script>


<script>
	$( '.page-sidebar-menu li' ).eq( 0 ).addClass( 'active' );
</script>

</body>
<!-- END BODY -->
</html>