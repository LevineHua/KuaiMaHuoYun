(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"4de1":function(n,e,o){},"5ece":function(n,e,o){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={onLaunch:function(){console.log("App Launch")},onShow:function(){if(console.log("App Show"),n.canIUse("getUpdateManager")){var e=n.getUpdateManager();e.onCheckForUpdate(function(o){o.hasUpdate&&(e.onUpdateReady(function(){n.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(n){n.confirm&&e.applyUpdate()}})}),e.onUpdateFailed(function(){n.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索进入哟~"})}))})}else n.showModal({title:"提示",content:"当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"})},onHide:function(){console.log("App Hide")}};e.default=o}).call(this,o("543d")["default"])},"6f48":function(n,e,o){"use strict";o.r(e);var t=o("5ece"),a=o.n(t);for(var c in t)"default"!==c&&function(n){o.d(e,n,function(){return t[n]})}(c);e["default"]=a.a},"7fb7":function(n,e,o){"use strict";o.r(e);var t=o("6f48");for(var a in t)"default"!==a&&function(n){o.d(e,n,function(){return t[n]})}(a);o("a53f");var c,u,l=o("2877"),i=Object(l["a"])(t["default"],c,u,!1,null,null,null);e["default"]=i.exports},a53f:function(n,e,o){"use strict";var t=o("4de1"),a=o.n(t);a.a}},[["9138","common/runtime","common/vendor"]]]);