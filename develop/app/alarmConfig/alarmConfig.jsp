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
<title>威胁报警</title>
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
<link rel="stylesheet" href="<c:url value="/public/css/alarmConfig.css" />" type="text/css">

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
      $( '.page-sidebar-menu li.instruction' ).addClass( 'active open' );
      $( '.page-sidebar-menu li.instruction li.abnormal' ).addClass( 'active open' );
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
                              <span class="caption-subject bold uppercase font-dark">报警配置</span>
                            <span class="caption-helper"></span>
                          </div>
                          <button type="button" class="u-btn reset">默认配置</button>
                      </div>
                      <div class="portlet-body page-wrapper">
                        <form action="javascript:;" id="netConfig" method="POST" class="form-horizontal" enctype="multipart/form-data" role="form" novalidate="novalidate">
                            <div class="text-left">
                                <div class="form-group" style="margin-top: 15px;">
                                    <label class="control-label col-xs-2">接入异常:</label>
                                    <div class="col-xs-10 label-cont">
                                        <label for="closeNet"><input disabled id="closeNet" name="joinConfList" class="" value="设备断开网络连接" type="checkbox">设备断开网络连接</label>
                                        <label for="openNet"><input disabled id="openNet" name="joinConfList" class="" value="设备恢复网络连接" type="checkbox">设备恢复网络连接</label>
                                        <label for="ipChange"><input disabled id="ipChange" name="joinConfList" class="" value="设备IP地址变化" type="checkbox">设备IP地址变化</label>
                                        <label for="newSet"><input disabled id="newSet" name="joinConfList" class="" value="新设备接入网络" type="checkbox">新设备接入网络</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-xs-2">通信异常:</label>
                                    <div class="col-xs-8 label-cont">
                                        <label for="camera"><input disabled id="camera" name="comConfList" class="" value="摄像头" type="checkbox">摄像头</label>
                                        <label for="NVRDVR"><input disabled id="NVRDVR" name="comConfList" class="" value="NVR/DVR" type="checkbox">NVR/DVR</label>
                                        <label for="PC"><input disabled id="PC" name="comConfList" class="" value="PC电脑" type="checkbox">PC电脑</label>
                                        <label for="other-device"><input disabled id="other-device" name="comConfList" class="" value="其他设备" type="checkbox">其他设备</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-xs-2">视频异常:</label>
                                    <div class="col-xs-8 label-cont">
                                        <label for="create-video"><input disabled id="create-video" name="videoConfList" class="" value="新增视频流" type="checkbox">新增视频流</label>
                                        <label for="close-video"><input disabled id="close-video" name="videoConfList" class="" value="关闭视频流" type="checkbox">关闭视频流</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-xs-2">网络攻击:</label>
                                    <div class="col-xs-8 label-cont">
                                        <label for="net-scan"><input disabled id="net-scan" name="netConfList" class="" value="网络扫描" type="checkbox">网络扫描</label>
                                        <label for="password-detection"><input disabled id="password-detection" name="netConfList" class="" value="口令探测" type="checkbox">口令探测</label>
                                        <label for="ARP-cheat"><input disabled id="ARP-cheat" name="netConfList" class="" value="ARP欺骗" type="checkbox">ARP欺骗</label>
                                        <label for="DDoS-attack"><input disabled id="DDoS-attack" name="netConfList" class="" value="DDoS攻击" type="checkbox">DDoS攻击</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-xs-2">漏洞探测:</label>
                                    <div class="col-xs-8 label-cont">
                                        <label for="RTSP"><input disabled id="RTSP" name="vulConfList" class="" value="RTSP缓冲区溢出漏洞探测" type="checkbox">RTSP缓冲区溢出漏洞探测</label>
                                        <label for="leak-detection"><input disabled id="leak-detection" name="vulConfList" class="" value="特种漏洞探测" type="checkbox">特种漏洞探测</label>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="u-btn edit">编 辑</button><button type="button" class="u-btn edit-ok">确定</button>
                            <button type="button" class="u-btn_cancel edit-cancel">取消</button>
                            <div class="loading"><img src="<c:url value="/public/img/running.gif"/>"></div>
                        </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <!-- END CONTENT -->
</div>
<div class="modal fade in" id="popModal" tabindex="-1" data-backdrop="static" role="basic" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h4 class="modal-title">提示</h4>
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

<div class="modal fade in" id="confirmModal" tabindex="-1" data-backdrop="static" role="basic" aria-hidden="true">
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

<!-- END CONTAINER -->
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

<script src="<c:url value="/public/lib/jquery.validate.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js/validate-config.js" />" type="text/javascript"></script>

<script src="<c:url value="/public/lib/react-15.3.0/build/react.js" />"
  type="text/javascript"></script>
<script src="<c:url value="/public/lib/react-15.3.0/build/react-dom.js" />"
  type="text/javascript"></script>

<script>
    seajs.use( 'alarmConfig' );
</script>

<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>