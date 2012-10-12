<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
{
"graphdata":
{
"nodes":
[
<c:forEach items="${nodes}" var="node" varStatus="status">
    <c:if test="${node.terminal}">
        {"name":"${node.endPoint}"}
    </c:if>
    <c:if test="${not node.terminal}">
        {"name":"${node}"}
    </c:if>
    <c:if test="${!status.last}">,</c:if>
</c:forEach>
],
"links":
[
<c:forEach items="${links}" var="link" varStatus="status">
    {"source":${link.from.sequence},"target":${link.to.sequence},"value":${link.callCount}}
    <c:if test="${!status.last}">,</c:if>
</c:forEach>
]
},

"businessTransactions":
[
<c:forEach items="${businessTransactions}" var="t" varStatus="status">
    {
    "name":"${t.name}",
    "calls":1,
    "time":1,
    "health":1,
    "traces":
    [
    <c:forEach items="${t.traces}" var="trace" varStatus="status2">
        "${trace}"
        <c:if test="${!status2.last}">,</c:if>
    </c:forEach>
    ]
    }
    <c:if test="${!status.last}">,</c:if>
</c:forEach>
]
}