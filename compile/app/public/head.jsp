<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" import="com.iie.cameraguard.entity.po.User" %>
<script type="text/javascript">
	window.rootPath = '<c:url value="/"/>';
</script>
<div class="page-header navbar navbar-fixed-top">
	<!-- BEGIN HEADER INNER -->
	<div class="page-header-inner">
		<!-- BEGIN LOGO -->
		<!-- END LOGO -->
		<!-- BEGIN RESPONSIVE MENU TOGGLER -->
		<!--  
		-->
		<!--
		<div class="menu-toggler sidebar-toggler">
        </div>
        -->
		<!-- END RESPONSIVE MENU TOGGLER -->
		<!-- BEGIN TOP NAVIGATION MENU -->
		<%
			String userType = ((User)request.getSession().getAttribute("USER_CONTEXT")).getUserType();
		%>
		<div class="page-top">
			<div class="content clear">
				<div class="logo">
					<img src="<c:url value="/public/img/logo-transparent.png" />">
					<div class="title">万视盾 - 服务器</div>
					<div class="sub-title">视频监控系统实时安全防护</div>
				</div>
				<div class="top-menu">
					<div id="stateAndTime">
					</div>
					<ul class="nav navbar-nav pull-right">
						<!-- BEGIN NOTIFICATION DROPDOWN -->
						<li class="user">
							<i class="fa fa-user"></i><span class="username">
								<%
									out.print( userType );
								%>
							</span>
						</li>
						<li class="sign-out">
							<a href="<%=request.getContextPath()%>/logout">
								<i class="fa fa-sign-out"></i><span class="username">退出</span>
							</a>
						</li>
						
						<!-- END USER LOGIN DROPDOWN -->
						<!-- END USER LOGIN DROPDOWN -->
					</ul>
				</div>
			</div>
			
		</div>
		<!-- END TOP NAVIGATION MENU -->
	</div>
	<!-- END HEADER INNER -->
	<!-- END CONTAINER -->

</div>