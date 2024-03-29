﻿var JSON; if (!JSON) JSON = {}; (function () { "use strict"; function f(a) { return a < 10 ? "0" + a : a } if (typeof Date.prototype.toJSON !== "function") { Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf() } } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, rep; function quote(a) { escapable.lastIndex = 0; return escapable.test(a) ? '"' + a.replace(escapable, function (a) { var b = meta[a]; return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + a + '"' } function str(h, i) { var c, e, d, f, g = gap, b, a = i[h]; if (a && typeof a === "object" && typeof a.toJSON === "function") a = a.toJSON(h); if (typeof rep === "function") a = rep.call(i, h, a); switch (typeof a) { case "string": return quote(a); case "number": return isFinite(a) ? String(a) : "null"; case "boolean": case "null": return String(a); case "object": if (!a) return "null"; gap += indent; b = []; if (Object.prototype.toString.apply(a) === "[object Array]") { f = a.length; for (c = 0; c < f; c += 1) b[c] = str(c, a) || "null"; d = b.length === 0 ? "[]" : gap ? "[\n" + gap + b.join(",\n" + gap) + "\n" + g + "]" : "[" + b.join(",") + "]"; gap = g; return d } if (rep && typeof rep === "object") { f = rep.length; for (c = 0; c < f; c += 1) if (typeof rep[c] === "string") { e = rep[c]; d = str(e, a); d && b.push(quote(e) + (gap ? ": " : ":") + d) } } else for (e in a) if (Object.prototype.hasOwnProperty.call(a, e)) { d = str(e, a); d && b.push(quote(e) + (gap ? ": " : ":") + d) } d = b.length === 0 ? "{}" : gap ? "{\n" + gap + b.join(",\n" + gap) + "\n" + g + "}" : "{" + b.join(",") + "}"; gap = g; return d } } if (typeof JSON.stringify !== "function") JSON.stringify = function (d, a, b) { var c; gap = ""; indent = ""; if (typeof b === "number") for (c = 0; c < b; c += 1) indent += " "; else if (typeof b === "string") indent = b; rep = a; if (a && typeof a !== "function" && (typeof a !== "object" || typeof a.length !== "number")) throw new Error("JSON.stringify"); return str("", { "": d }) }; if (typeof JSON.parse !== "function") JSON.parse = function (text, reviver) { var j; function walk(d, e) { var b, c, a = d[e]; if (a && typeof a === "object") for (b in a) if (Object.prototype.hasOwnProperty.call(a, b)) { c = walk(a, b); if (c !== undefined) a[b] = c; else delete a[b] } return reviver.call(d, e, a) } text = String(text); cx.lastIndex = 0; if (cx.test(text)) text = text.replace(cx, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }); if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) { j = eval("(" + text + ")"); return typeof reviver === "function" ? walk({ "": j }, "") : j } throw new SyntaxError("JSON.parse"); } })()

var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

$.jqxhrPool = [];
$.jqxhrPool.abortAll = function () {
    /*
	$(this).each(function (idx, jqXHR) {
        jqXHR.abort();
    });    
	$.jqxhrPool.length = 0;
	*/
};

function login(anchor) {
    var returnUri = location.href;
    if (anchor && returnUri.indexOf("#" + anchor) < 0) {
        returnUri += "#" + anchor;
    }
    location.href = "http://passport.cnblogs" + getHostPostfix() + "/login.aspx?ReturnUrl=" + encodeURIComponent(returnUri);
    return false;
}

function logout() {
    if (confirm("纭閫€鍑哄悧锛�")) {
        location.href = "http://passport.cnblogs" + getHostPostfix() + "/logout.aspx?ReturnUrl=" + location.href;
    }
    return false;
}

function register() {
    location.href = "http://passport.cnblogs" + getHostPostfix() + "/register.aspx?ReturnUrl=" + location.href;
    return false;
}

function getHostPostfix() {
    var hostname = location.hostname;
    hostname = hostname.substring(hostname.lastIndexOf("."), hostname.length);
    return hostname;
}

function google_dfp_render() {
    var gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    gads.src = 'http://common.cnblogs.com/script/gpt.js';
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
}

//obsolete
function AjaxPost(url, postData, successFunc) {
    $.ajax({
        url: url,
        data: postData,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf8',
        success: function (data) {
            if (data.d) {
                successFunc(data.d);
            }
        },
        error: function (xhr) {
        }
    });
}
