(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"13a8":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{canGetUserInfo:0,isAgree:"",phoneNumber:"",password:"",yzm:"",code:"",seconds:60,timer:"",yzmTitle:"获取验证码"}},onLoad:function(e){},methods:{getUserInfo:function(t){var o=this,n=o.serverURL,a=t.detail.userInfo;e.setStorageSync("wx_userInfo",a),void 0!=a&&e.login({provider:"weixin",success:function(t){var a=t.code;e.request({url:o.serverURL+"home/login/api_login",method:"POST",data:{code:a},success:function(t){var o=t.data.openid;e.setStorageSync("openId",o),e.request({url:n+"home/user/get_user_information",method:"POST",data:{wxchat_oppid:o},success:function(t){if(100==t.data.code){var o={user_id:t.data.user_id,user_identity:t.data.user_type};e.request({url:n+"home/login/get_user_grant_wechat_openid",method:"POST",data:{uid:t.data.user_id},success:function(n){console.log(n),e.setStorageSync("wxchat_oppid",n.data.wxchat_oppid),0==n.data.wxchat_oppid?e.redirectTo({url:"../webview/webview?uid="+t.data.user_id}):(e.setStorageSync("userinfo",o),e.setStorageSync("uid",t.data.user_id),2==t.data.examine||0==t.data.examine&&1==t.data.user_type||4==t.data.examine?e.redirectTo({url:"../uploadCard/uploadCard"}):3==t.data.examine||5==t.data.examine?e.redirectTo({url:"../uploadDrivingLicense/uploadDrivingLicense"}):e.switchTab({url:"../index/index"}))}})}else e.redirectTo({url:"../selectRole/selectRole"})},fail:function(e){console.log(e)}})},fail:function(e){console.log(e)}})}})},checkboxChange:function(e){"agree"==e.detail.value[0]?this.isAgree=e.detail.value[0]:this.isAgree=""},nextStep:function(){var t=this;t.serverURL;"agree"==t.isAgree&&(""==t.phoneNumber?e.showToast({title:"电话号码不能为空",icon:"none",mask:!0}):t.checkMobile(t.phoneNumber)?""==t.password?e.showToast({title:"密码不能为空",icon:"none",mask:!0}):""==t.yzm?e.showToast({title:"验证码不能为空",icon:"none",mask:!0}):t.yzm!=t.code?e.showToast({title:"验证码错误",icon:"none",mask:!0}):e.redirectTo({url:"../selectRole/selectRole?mobile="+t.phoneNumber+"&password="+t.password+"&code="+t.code}):e.showToast({title:"电话号码格式错误",icon:"none",mask:!0}))},getYzm:function(){var t=this,o=t.serverURL;""==t.phoneNumber?e.showToast({title:"电话号码不能为空",icon:"none",mask:!0}):60!=t.seconds||(t.checkMobile(t.phoneNumber)?e.request({url:o+"home/login/code_send",method:"POST",data:{mobile:t.phoneNumber,send_type:1},success:function(o){100==o.data.code?(t.code=o.data.rand_number,e.showToast({title:o.data.msg,icon:"success",mask:!0,duration:2e3,success:function(){t.timer=setInterval(function(){if(t.seconds--,t.seconds<0)return clearInterval(t.timer),t.seconds=60,void(t.yzmTitle="获取验证码");t.yzmTitle="重新获取（"+t.seconds+"）"},1e3)}})):e.showToast({title:o.data.msg,icon:"none",mask:!0})},fail:function(e){console.log(e)}}):e.showToast({title:"电话号码格式错误",icon:"none",mask:!0}))},checkMobile:function(e){return RegExp(/^1[34578]\d{9}$/).test(e)}}};t.default=o}).call(this,o("543d")["default"])},"266a":function(e,t,o){"use strict";o.r(t);var n=o("13a8"),a=o.n(n);for(var s in n)"default"!==s&&function(e){o.d(t,e,function(){return n[e]})}(s);t["default"]=a.a},"447e":function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},a=[];o.d(t,"a",function(){return n}),o.d(t,"b",function(){return a})},"7c2a":function(e,t,o){},"9cc6":function(e,t,o){"use strict";var n=o("7c2a"),a=o.n(n);a.a},b289:function(e,t,o){"use strict";o.r(t);var n=o("447e"),a=o("266a");for(var s in a)"default"!==s&&function(e){o.d(t,e,function(){return a[e]})}(s);o("9cc6");var i=o("2877"),r=Object(i["a"])(a["default"],n["a"],n["b"],!1,null,null,null);t["default"]=r.exports}},[["05fc","common/runtime","common/vendor"]]]);