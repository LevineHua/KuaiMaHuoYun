(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/confirmOrder/confirmOrder"],{"24b4":function(o,e,n){},a751:function(o,e,n){"use strict";var t=n("24b4"),u=n.n(t);u.a},b300:function(o,e,n){"use strict";(function(o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=function(){return n.e("components/uni-number-box/uni-number-box").then(n.bind(null,"a224"))},u=function(){return Promise.all([n.e("common/vendor"),n.e("components/km-li")]).then(n.bind(null,"8df7"))},r=function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"eeff"))},s={data:function(){return{userType:0,carNum:"1",type:"",isAgree:"",status:1,lookInfoNeedMoney:100,cutMoney:0,uploadPhoenStep:1,uploadPhoto:"",uploadSuccess:0,outPhoto:"",inPhoto:"",orderId:0,url:"",order:{}}},components:{uniNumberBox:t,kmLi:u,uniPopup:r},onLoad:function(e){var n=this;this.orderId=e.id,this.url=this.serverURL,o.removeStorage({key:"cutMoney",success:function(){}}),o.request({url:n.url+"home/user/user_order_id",method:"POST",data:{id:n.orderId},success:function(o){if(console.log(o),100==o.data.code){var e=o.data.msg;n.order=e,n.status=e.states}},fail:function(o){console.log(o)}})},onShow:function(){var e=this;o.getStorage({key:"cutMoney",success:function(o){console.log(o.data),e.cutMoney=-1*o.data}})},methods:{changeCar:function(o){this.carNum=o},togglePopup:function(o){this.type=o},checkboxChange:function(o){"agree"==o.detail.value[0]?this.isAgree=o.detail.value[0]:this.isAgree=""},isSure:function(){this.status=2,"agree"==this.isAgree&&console.log("agree")},selectYhq:function(){o.navigateTo({url:"../selectCoupon/selectCoupon"})},nextStep:function(o){var e=this;1==e.uploadSuccess&&(e.uploadPhoenStep=o,e.uploadSuccess=0,e.uploadPhoto="")},uploadImg:function(){var e=this;o.chooseImage({count:1,success:function(o){var n=o.tempFilePaths[0];e.uploadPhoto=n,e.uploadSuccess=1,1==e.uploadPhoenStep?e.outPhoto=n:2==e.uploadPhoenStep&&(e.inPhoto=n),console.log("选择图片成功")},fail:function(){console.log("选择图片失败")},complete:function(){console.log("选择图片完成")}})},confirmOrder:function(){o.showLoading({title:"确认中...",mask:!0});var e=this;o.request({url:e.url+"home/Order/update_transportation_order",method:"POST",data:{id:e.orderId,states:7},success:function(n){console.log(n),o.hideLoading(),100==n.data.code&&(e.status=7,o.showToast({title:"确认成功",icon:"success",mask:!0}))},fail:function(o){console.log(o)}})}}};e.default=s}).call(this,n("543d")["default"])},e062:function(o,e,n){"use strict";n.r(e);var t=n("f809"),u=n("eef5");for(var r in u)"default"!==r&&function(o){n.d(e,o,function(){return u[o]})}(r);n("a751");var s=n("2877"),c=Object(s["a"])(u["default"],t["a"],t["b"],!1,null,null,null);e["default"]=c.exports},eef5:function(o,e,n){"use strict";n.r(e);var t=n("b300"),u=n.n(t);for(var r in t)"default"!==r&&function(o){n.d(e,o,function(){return t[o]})}(r);e["default"]=u.a},f809:function(o,e,n){"use strict";var t=function(){var o=this,e=o.$createElement;o._self._c},u=[];n.d(e,"a",function(){return t}),n.d(e,"b",function(){return u})}},[["187d","common/runtime","common/vendor"]]]);