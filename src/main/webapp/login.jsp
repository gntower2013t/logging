<%@page import="java.util.*" %>
<%@page import="java.net.*" %>
<%
    boolean foundLogin = false;
    List<String> relayParams = Arrays.asList("language","theme","v");
    try {
		String url = "/?returnTo=" + (""+request.getAttribute("javax.servlet.forward.request_uri"));
        String getEmbed = "";
        String getRelay = "";
        // append any GET parameters
        for( String param : request.getParameterMap().keySet() )
        {
            String value = request.getParameter(param);
            getEmbed += (getEmbed.length() > 1 ? "&":"?") + param + "=" + value;
            if( relayParams.contains(param) ) 
            {
                getRelay += "&" + param + "=" + URLEncoder.encode(value, "UTF-8");
            }
        }
        response.setStatus(response.SC_MOVED_TEMPORARILY);
        response.setHeader("Location", url + URLEncoder.encode(getEmbed, "UTF-8") + getRelay ); 
        foundLogin = true;
    } catch(Exception e) {
    }
    if( !foundLogin ) {
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%--
	$Id: login.jsp 3384 2007-06-13 12:27:53Z javawilli $
	$Source$
	
	Autologin for WebViewer:
	To allow external Webviewer access without login you can use request parameter to achieve autologin.
	1) accNr (Accession number) not null! 
	2) loginuser (user name)
	3) passwd4user (password for username in Base64)
	Be aware that this critical infos are visible in browser window!
	Therefore this user should only have WebUser role.
--%>
<%@ page import='java.net.InetAddress' %>
<html xmlns="http://www.w3.org/1999/xhtml" id="LoginPage">
<head>
  <title>Login</title>
  <link href="style.css" rel="stylesheet" type="text/css"> </link>
</head>

<%
	String nodeInfo = System.getProperty("dcm4che.archive.nodename", InetAddress.getLocalHost().getHostName() );
	String version = request.getParameter("v");
	String appendUrl = "";
	if( request.getQueryString()!=null && request.getQueryString().indexOf("v=")>=0 ) {
		appendUrl = "?v="+version;
	}
%>
<body onload="self.focus();document.login.j_username.focus()">
<center>
<h1>User Login at <%= nodeInfo %></h1>
<br>

<form name="login" method="post" action="j_security_check<%=appendUrl%>">
<table>
	<tr valign="middle">
	  <td><div class="text">Name:</div></td>
	  <td><input class="textfield" type="text" name="j_username" value=""/></td>
	</tr>
	<tr valign="middle">
	  <td><div class="text">Password:</div></td>
	  <td><input class="textfield" type="password" name="j_password" value=""/></td>
	</tr>
	<tr><td>&nbsp;</td></tr>
	<tr valign="middle">
	  <td>&nbsp;</td>
	  <td align="center"><input class="button" type="submit" value="Log in"></td>
	</tr>
</table>
</center>
</form>
</body>
</html>
<% } %>
