(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"13a8":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{canGetUserInfo:0,isAgree:"",phoneNumber:"",password:"",yzm:"",code:"",seconds:60,timer:"",yzmTitle:"获取验证码"}},onLoad:function(e){1==e.canGetUserInfo&&(this.canGetUserInfo=e.canGetUserInfo)},methods:{getUserInfo:function(t){var n=this,o=n.serverURL,a=t.detail.userInfo;e.setStorageSync("wx_userInfo",a),void 0!=a&&(this.canGetUserInfo=1,e.login({provider:"weixin",success:function(t){var a=t.code;e.request({url:n.serverURL+"home/login/api_login",method:"POST",data:{code:a},success:function(t){var n=t.data.openid;e.setStorageSync("openId",n),e.request({url:o+"home/user/get_user_information",method:"POST",data:{wxchat_oppid:n},success:function(t){if(100==t.data.code){var n={user_id:t.data.user_id,user_identity:t.data.user_type};e.request({url:o+"home/login/get_user_grant_wechat_openid",method:"POST",data:{uid:t.data.user_id},success:function(o){console.log(o),e.setStorageSync("wxchat_oppid",o.data.wxchat_oppid),0==o.data.wxchat_oppid?e.redirectTo({url:"../webview/webview?uid="+t.data.user_id}):(e.setStorageSync("userinfo",n),e.setStorageSync("uid",t.data.user_id),2==t.data.examine||0==t.data.examine&&1==t.data.user_type||4==t.data.examine?e.redirectTo({url:"../uploadCard/uploadCard"}):3==t.data.examine||5==t.data.examine?e.redirectTo({url:"../uploadDrivingLicense/uploadDrivingLicense"}):e.switchTab({url:"../index/index"}))}})}},fail:function(e){console.log(e)}})},fail:function(e){console.log(e)}})}}))},checkboxChange:function(e){"agree"==e.detail.value[0]?this.isAgree=e.detail.value[0]:this.isAgree=""},nextStep:function(){var t=this;t.serverURL;"agree"==t.isAgree&&(""==t.phoneNumber?e.showToast({title:"电话号码不能为空",icon:"none",mask:!0}):t.checkMobile(t.phoneNumber)?""==t.password?e.showToast({title:"密码不能为空",icon:"none",mask:!0}):""==t.yzm?e.showToast({title:"验证码不能为空",icon:"none",mask:!0}):t.yzm!=t.code?e.showToast({title:"验证码错误",icon:"none",mask:!0}):e.redirectTo({url:"../selectRole/selectRole?mobile="+t.phoneNumber+"&password="+t.password+"&code="+t.code}):e.showToast({title:"电话号码格式错误",icon:"none",mask:!0}))},getYzm:function(){var t=this,n=t.serverURL;""==t.phoneNumber?e.showToast({title:"电话号码不能为空",icon:"none",mask:!0}):60!=t.seconds||(t.checkMobile(t.phoneNumber)?e.request({url:n+"home/login/code_send",method:"POST",data:{mobile:t.phoneNumber,send_type:1},success:function(n){100==n.data.code?(t.code=n.data.rand_number,e.showToast({title:n.data.msg,icon:"success",mask:!0,duration:2e3,success:function(){t.timer=setInterval(function(){if(t.seconds--,t.seconds<0)return clearInterval(t.timer),t.seconds=60,void(t.yzmTitle="获取验证码");t.yzmTitle="重新获取（"+t.seconds+"）"},1e3)}})):e.showToast({title:n.data.msg,icon:"none",mask:!0})},fail:function(e){console.log(e)}}):e.showToast({title:"电话号码格式错误",icon:"none",mask:!0}))},checkMobile:function(e){return RegExp(/^1[34578]\d{9}$/).test(e)}}};t.default=n}).call(this,n("543d")["default"])},"266a":function(e,t,n){"use strict";n.r(t);var o=n("13a8"),a=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,function(){return o[e]})}(s);t["default"]=a.a},7620:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},"7c2a":function(e,t,n){},"9cc6":function(e,t,n){"use strict";var o=n("7c2a"),a=n.n(o);a.a},b289:function(e,t,n){"use strict";n.r(t);var o=n("7620"),a=n("266a");for(var s in a)"default"!==s&&function(e){n.d(t,e,function(){return a[e]})}(s);n("9cc6");var i=n("2877"),r=Object(i["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=r.exports}},[["05fc","common/runtime","common/vendor"]]]);