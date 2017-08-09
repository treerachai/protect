<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="page-sidebar-wrapper">
		<!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
		<!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
		<div class="page-sidebar">
			<!-- BEGIN SIDEBAR MENU -->
			 <ul class="page-sidebar-menu  page-header-fixed page-sidebar-menu-hover-submenu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                <%
                    //获取上下文路径
                    String contextPath = request.getContextPath();
                    //获取真实姓名

                    Boolean isAdmin = false;
                    Boolean isOperator = false;
                    Boolean isAuditor = false;

                    String admin = "管理员";
                    String operator = "操作员";
                    String auditor = "日志审计员";

                    if( userType.equals( admin ) ) {
                        isAdmin = true;
                    } else if( userType.equals( operator ) ) {
                        isOperator = true;
                    } else if( userType.equals( auditor ) ) {
                        isAuditor = true;
                    }
                    // Boolean isSuperAdmin = false;
                    // int enableManageVulLib = ((User)request.getSession().getAttribute("USER_CONTEXT")).getEnableManageVulLib();

                    // if( userType.equals( "admin" ) ) {
                    //   isAdmin = true;
                    // } else if( userType.equals( "superAdmin" ) ) {
                    //   isAdmin = true;
                    //   isSuperAdmin = true;
                    // }
                %>
                <%
                    if( isAdmin == true ) {
                      String sidebar;
                      sidebar = "<li class=\"nav-item start userManage\">"+
                                    "<a href=\""+contextPath+"/admin/userManage\" class=\"nav-link\">"+
                                        "<i class=\"iconfont\">&#xe62a;</i> "+
                                        "<span class=\"title\">用户管理</span>"+
                                    "</a>" +
                                "</li>"+
                                "<li class=\"nav-item start netSegment\">"+
                                    "<a href=\""+contextPath+"/admin/netSegment\" class=\"nav-link\">"+
                                        "<i class=\"iconfont\">&#xe77e;</i> "+
                                        "<span class=\"title\">网段管理</span>"+
                                    "</a>" +
                                "</li>"+
                                "<li class=\"nav-item start config\">"+
                                    "<a href=\"javascript:;\" class=\"nav-link\" target=\"_self\">"+
                                        "<i class=\"iconfont\">&#xe63f;</i>"+
                                        "<span class=\"title\">设置</span>"+
                                    "</a>"+
                                    "<ul class=\"sub-menu\">"+
                                        "<li class=\"nav-item start account\">"+
                                            "<a href=\""+contextPath+"/account\" class=\"nav-link\">"+
                                                "<i class=\"iconfont\">&#xe608;</i>"+
                                                "<span class=\"title\">修改密码</span>"+
                                                "<span class=\"selected\"></span>"+
                                            "</a>"+
                                        "</li>"+
                                        "<li class=\"nav-item start timeConfig\">"+
                                            "<a href=\""+contextPath+"/admin/timeConfig\" class=\"nav-link\">"+
                                                "<i class=\"iconfont\">&#xe612;</i>"+
                                                "<span class=\"title\">时间同步</span>"+
                                            "</a>"+
                                        "</li>"+
                                        "<li class=\"nav-item start netConfig\">"+
                                            "<a href=\""+contextPath+"/admin/netConfig\" class=\"nav-link\">"+
                                                "<i class=\"iconfont\">&#xe603;</i>"+
                                                "<span class=\"title\">网络配置</span>"+
                                            "</a>"+
                                        "</li>"+
                                        "<li class=\"nav-item start systemset\">"+
                                            "<a href=\""+contextPath+"/admin/systemset\" class=\"nav-link\">"+
                                                "<i class=\"iconfont\">&#xe63f;</i>"+
                                                "<span class=\"title\">系统设置</span>"+
                                            "</a>"+
                                        "</li>"+
                                    "</ul>"+
                                "</li>"+
                                "<li class=\"nav-item start about\">"+
                                    "<a href=\""+contextPath+"/about\" class=\"nav-link\">"+
                                        "<i class=\"iconfont\">&#xe698;</i> "+
                                        "<span class=\"title\">关于</span>"+
                                    "</a>" +
                                "</li>";

                        out.print(sidebar);
                    }
                %>
                <%
                    if( isAuditor == true ) {
                      String sidebar;
                      sidebar = "<li class=\"nav-item start logManage\">"+
                                    "<a href=\""+contextPath+"/auditor/logManage\" class=\"nav-link\">"+
                                        "<i class=\"iconfont\">&#xe6a0;</i> "+
                                        "<span class=\"title\">日志管理</span>"+
                                    "</a>" +
                                "</li>"+
                                "<li class=\"nav-item start config\">"+
                                    "<a href=\"javascript:;\" class=\"nav-link\" target=\"_self\">"+
                                        "<i class=\"iconfont\">&#xe63f;</i>"+
                                        "<span class=\"title\">设置</span>"+
                                    "</a>"+
                                    "<ul class=\"sub-menu\">"+
                                        "<li class=\"nav-item start account\">"+
                                            "<a href=\""+contextPath+"/account\" class=\"nav-link\">"+
                                                "<i class=\"iconfont\">&#xe608;</i>"+
                                                "<span class=\"title\">修改密码</span>"+
                                                "<span class=\"selected\"></span>"+
                                            "</a>"+
                                        "</li>"+
                                    "</ul>"+
                                "</li>" +
                                "<li class=\"nav-item start about\">"+
                                    "<a href=\""+contextPath+"/about\" class=\"nav-link\">"+
                                        "<i class=\"iconfont\">&#xe698;</i> "+
                                        "<span class=\"title\">关于</span>"+
                                    "</a>" +
                                "</li>";

                     out.print(sidebar);
                    }
                %>
                <%
                    if( isOperator == true ) {
                      String sidebar;
                      sidebar = "<li class=\"nav-item start index\">"+
                                    "<a href=\""+contextPath+"/operator/index\" class=\"nav-link\">"+
                                        "<i class=\"iconfont\">&#xe600;</i> "+
                                        "<span class=\"title\">首页</span>"+
                                    "</a>" +
                                "</li>"+
                                "<li class=\"nav-item start terminal\">"+
                                    "<a href=\""+contextPath+"/operator/terminal\" class=\"nav-link\">"+
                                        "<i class=\"iconfont\">&#xe63a;</i> "+
                                        "<span class=\"title\">防护终端</span>"+
                                    "</a>" +
                                "</li>"+
                                "<li class=\"nav-item start instruction\">"+
                                    "<a href=\"javascript:;\" class=\"nav-link\" target=\"_self\">"+
                                        "<i class=\"iconfont\">&#xe63c;</i>"+
                                        "<span class=\"title\">威胁报警</span>"+
                                    "</a>"+
                                    "<ul class=\"sub-menu\">"+
                                        "<li class=\"nav-item start device\">"+
                                            "<a href=\""+contextPath+"/operator/abnormal\" class=\"nav-link\">"+
                                                "<i class=\"iconfont\">&#xe60f;</i>"+
                                                "<span class=\"title\">实时报警</span>"+
                                                "<span class=\"selected\"></span>"+
                                            "</a>"+
                                        "</li>"+
                                        "<li class=\"nav-item start netService\">"+
                                            "<a href=\""+contextPath+"/operator/abnormal\" class=\"nav-link\">"+
                                                "<i class=\"iconfont\">&#xe60f;</i>"+
                                                "<span class=\"title\">报警配置</span>"+
                                                "<span class=\"selected\"></span>"+
                                            "</a>"+
                                        "</li>"+
                                    "</ul>"+
                                "</li>" +
                                "<li class=\"nav-item start deviceInfo\">"+
                                    "<a href=\"javascript:;\" class=\"nav-link\">"+
                                        "<i class=\"iconfont\">&#xe614;</i> "+
                                        "<span class=\"title\">资产详情</span>"+
                                    "</a>" +
                                    "<ul class=\"sub-menu\">"+
                                        "<li class=\"nav-item start device\">"+
                                            "<a href=\""+contextPath+"/operator/device\" class=\"nav-link\">"+
                                                "<i class=\"iconfont\">&#xe60f;</i>"+
                                                "<span class=\"title\">设备资产</span>"+
                                                "<span class=\"selected\"></span>"+
                                            "</a>"+
                                        "</li>"+
                                        "<li class=\"nav-item start netService\">"+
                                            "<a href=\""+contextPath+"/operator/netService\" class=\"nav-link\">"+
                                                "<i class=\"iconfont\">&#xe60f;</i>"+
                                                "<span class=\"title\">网络服务</span>"+
                                                "<span class=\"selected\"></span>"+
                                            "</a>"+
                                        "</li>"+
                                    "</ul>"+
                                "</li>"+
                                "<li class=\"nav-item start communication\">"+
                                    "<a href=\""+contextPath+"/operator/communication\" class=\"nav-link\">"+
                                        "<i class=\"iconfont\">&#xe69a;</i> "+
                                        "<span class=\"title\">通信监测</span>"+
                                    "</a>" +
                                "</li>"+
                                "<li class=\"nav-item start config\">"+
                                    "<a href=\"javascript:;\" class=\"nav-link\" target=\"_self\">"+
                                        "<i class=\"iconfont\">&#xe63f;</i>"+
                                        "<span class=\"title\">设置</span>"+
                                    "</a>"+
                                    "<ul class=\"sub-menu\">"+
                                        "<li class=\"nav-item start account\">"+
                                            "<a href=\""+contextPath+"/account\" class=\"nav-link\">"+
                                                "<i class=\"iconfont\">&#xe608;</i>"+
                                                "<span class=\"title\">修改密码</span>"+
                                                "<span class=\"selected\"></span>"+
                                            "</a>"+
                                        "</li>"+
                                    "</ul>"+
                                "</li>" +
                                "<li class=\"nav-item start about\">"+
                                    "<a href=\""+contextPath+"/about\" class=\"nav-link\">"+
                                        "<i class=\"iconfont\">&#xe698;</i> "+
                                        "<span class=\"title\">关于</span>"+
                                    "</a>" +
                                "</li>";

                     out.print(sidebar);
                    }
                %>
                <%
                /*<li class="nav-item start user">
                    <a href="=request.getContextPath()/user" class="nav-link">
                        <i class="i i-exchange"></i>
                        <span class="title">用户管理</span>
                    </a>
                </li>
                <li class="nav-item start index">
                    <a href="\<\%=request.getContextPath()/index" class="nav-link">
                        <i class="i i-exchange"></i>
                        <span class="title">首页</span>
                    </a>
                </li>
                <li class="nav-item start termimal">
                    <a href="\<\%=request.getContextPath()/termimal" class="nav-link" target="_self">
                        <i class="i i-config"></i>
                        <span class="title">防护终端</span>
                    </a>
                </li>
                <li class="nav-item start device">
                    <a href="\<\%=request.getContextPath()/device" class="nav-link" target="_self">
                        <i class="i i-config"></i>
                        <span class="title">设备资产</span>
                    </a>
                </li>
                <li class="nav-item start intrusion">
                    <a href="\<\%=request.getContextPath()/intrusion" class="nav-link" target="_self">
                        <i class="i i-account"></i>
                        <span class="title">入侵防护</span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start config">
                            <a href="index.html" class="nav-link ">
                                <i class="icon-bar-chart"></i>
                                <span class="title">防护策略</span>
                                <span class="selected"></span>
                            </a>
                        </li>
                        <li class="nav-item start real_time_info">
                            <a href="dashboard_2.html" class="nav-link ">
                                <i class="icon-bulb"></i>
                                <span class="title">实时检测</span>
                                <span class="badge badge-success">1</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item start about">
                    <a href="\<\%=request.getContextPath()/about" class="nav-link" target="_self">
                        <i class="i i-about"></i>
                        <span class="title">漏洞检查</span>
                    </a>
                </li>
                <li class="nav-item start config">
                    <a href="\<\%=request.getContextPath()/intrusion" class="nav-link" target="_self">
                        <i class="i i-account"></i>
                        <span class="title">设置</span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start account">
                            <a href="index.html" class="nav-link ">
                                <i class="icon-bar-chart"></i>
                                <span class="title">修改密码</span>
                                <span class="selected"></span>
                            </a>
                        </li>
                        <li class="nav-item start network">
                            <a href="dashboard_2.html" class="nav-link ">
                                <i class="icon-bulb"></i>
                                <span class="title">网络配置</span>
                                <span class="badge badge-success">1</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item start about">
                    <a href="\<\%=request.getContextPath()/about" class="nav-link" target="_self">
                        <i class="i i-about"></i>
                        <span class="title">关于</span>
                    </a>
                </li>*/
                %>
            </ul>
			<!-- END SIDEBAR MENU -->
		</div>
	</div>