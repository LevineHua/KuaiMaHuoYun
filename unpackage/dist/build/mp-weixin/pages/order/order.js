(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"2b6b":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=s(e("a34a"));function s(t){return t&&t.__esModule?t:{default:t}}function i(t,a,e,n,s,i,r){try{var u=t[i](r),o=u.value}catch(c){return void e(c)}u.done?a(o):Promise.resolve(o).then(n,s)}function r(t){return function(){var a=this,e=arguments;return new Promise(function(n,s){var r=t.apply(a,e);function u(t){i(r,n,s,u,o,"next",t)}function o(t){i(r,n,s,u,o,"throw",t)}u(void 0)})}}var u=function(){return Promise.all([e.e("common/vendor"),e.e("components/km-order")]).then(e.bind(null,"d02d"))},o={data:function(){return{userinfo:"",url:"",scrollLeft:0,tabIndex:0,userType:0,tabBars:[{name:"待确认",id:"daiqueren",status:"0,3",page:0,count_page:0},{name:"待支付",id:"daizhifu",status:7,page:0,count_page:0},{name:"运输中",id:"yunshuzhong",status:"4,6",page:0,count_page:0},{name:"已完成",id:"yiwancheng",status:5,page:0,count_page:0}],tabBars2:[{name:"已发布",id:"yifabu",status:"0,1,2,3,4,5,6,7",page:0,count_page:0},{name:"待确认",id:"daiqueren2",status:3,page:0,count_page:0},{name:"运输中",id:"yunshuzhong2",status:4,page:0,count_page:0},{name:"已完成",id:"yiwancheng2",status:5,page:0,count_page:0}],orderList:[],daiquerenList:[],daizhifuList:[],daifukuanList:[],yunshuzhongList:[],yiwanchengList:[],yifabuList:[]}},components:{kmOrder:u},onLoad:function(){this.userinfo=t.getStorageSync("userinfo"),this.userType=this.userinfo.user_identity},onShow:function(){t.showLoading({title:"加载中...",mask:!0});this.userinfo.user_id;this.url=this.serverURL;var a=this;1==this.userType?(a.userOrderList("0,3",0),a.userOrderList("7",0)):0==a.userType&&a.getTransportationList("0,1,2,3,4,5,6,7",0)},methods:{goDetail:function(a){t.navigateTo({url:"/pages/template/tabbar/detail/detail?title="+a.title})},loadMore:function(t){var a=this;1==this.userType?0==t?a.userOrderList("0,3",a.tabBars[t].page=a.tabBars[t].page+1,1):1==t?a.userOrderList(7,a.tabBars[t].page=a.tabBars[t].page+1,1):2==t?a.userOrderList("4,6",a.tabBars[t].page=a.tabBars[t].page+1,1):3==t&&a.userOrderList(5,a.tabBars[t].page=a.tabBars[t].page+1,1):0==a.userType&&(0==t?a.getTransportationList("0,1,2,3,4,5,6,7",a.tabBars2[t].page=a.tabBars2[t].page+1,1):1==t?a.getTransportationList(3,a.tabBars2[t].page=a.tabBars2[t].page+1,1):2==t?a.getTransportationList(4,a.tabBars2[t].page=a.tabBars2[t].page+1,1):3==t&&a.getTransportationList(5,a.tabBars2[t].page=a.tabBars2[t].page+1,1))},addData:function(t){},changeTab:function(){var t=r(n.default.mark(function t(a){var e,s,i,r;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=this,s=a.target.current,this.tabIndex=s,1==e.userType?(i=e.tabBars[s].status,r=e.tabBars[s].page=0,e.userOrderList(i,r)):0==e.userType&&(i=e.tabBars2[s].status,r=e.tabBars2[s].page=0,e.getTransportationList(i,r));case 4:case"end":return t.stop()}},t,this)}));function a(a){return t.apply(this,arguments)}return a}(),tapTab:function(){var t=r(n.default.mark(function t(a){var e;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=a.target.dataset.current,this.tabIndex=e;case 2:case"end":return t.stop()}},t,this)}));function a(a){return t.apply(this,arguments)}return a}(),userOrderList:function(a,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=this;(0==n||"0,3"==a&&e<s.tabBars[0].count_page||7==a&&e<s.tabBars[1].count_page||"4,6"==a&&e<s.tabBars[2].count_page||5==a&&e<s.tabBars[3].count_page)&&(t.showLoading({title:"加载中...",mask:!0}),t.request({url:s.url+"home/user/user_order_list",method:"POST",data:{uid:s.userinfo.user_id,type:a,page_num:e},success:function(e){console.log(e),100==e.data.code&&(t.hideLoading(),"0,3"==a?(s.tabBars[0].count_page=e.data.count_page,1==n?s.daiquerenList.push.apply(s.daiquerenList,e.data.msg):s.daiquerenList=e.data.msg):7==a?(s.tabBars[1].count_page=e.data.count_page,1==n?s.daizhifuList.push.apply(s.daizhifuList,e.data.msg):s.daizhifuList=e.data.msg):"4,6"==a?(s.tabBars[2].count_page=e.data.count_page,1==n?s.yunshuzhongList.push.apply(s.yunshuzhongList,e.data.msg):s.yunshuzhongList=e.data.msg):5==a&&(s.tabBars[3].count_page=e.data.count_page,1==n?s.yiwanchengList.push.apply(s.yiwanchengList,e.data.msg):s.yiwanchengList=e.data.msg,console.log(s.yiwanchengList)))},fail:function(t){console.log(t)}}))},getTransportationList:function(a,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=this;(0==n||"0,1,2,3,4,5,6,7"==a&&e<s.tabBars2[0].count_page||3==a&&e<s.tabBars2[1].count_page||4==a&&e<s.tabBars2[2].count_page||5==a&&e<s.tabBars2[3].count_page)&&(t.showLoading({title:"加载中...",mask:!0}),t.request({url:s.url+"home/index/get_transportation_list",method:"POST",data:{uid:s.userinfo.user_id,states:a,page_num:e},success:function(e){console.log(e),100==e.data.code&&(t.hideLoading(),"0,1,2,3,4,5,6,7"==a?(s.tabBars2[0].count_page=e.data.count_page,1==n?s.yifabuList.push.apply(s.yifabuList,e.data.list):s.yifabuList=e.data.list):3==a?(s.tabBars2[1].count_page=e.data.count_page,1==n?s.daiquerenList.push.apply(s.daiquerenList,e.data.list):s.daiquerenList=e.data.list):4==a?(s.tabBars2[2].count_page=e.data.count_page,1==n?s.yunshuzhongList.push.apply(s.yunshuzhongList,e.data.list):s.yunshuzhongList=e.data.list):5==a&&(s.tabBars2[3].count_page=e.data.count_page,1==n?s.yiwanchengList.push.apply(s.yiwanchengList,e.data.list):s.yiwanchengList=e.data.list))},fail:function(t){console.log(t)}}))},delOrder:function(a){var e=this,n=this.serverURL;t.showModal({title:"删除订单",content:"确定要删除该订单吗？",success:function(s){s.confirm&&(console.log("删除订单"),1==e.userType?t.request({url:n+"home/Order/update_transportation_order",method:"POST",data:{id:a,del:0},success:function(a){console.log(a),100==a.data.code&&(t.showToast({title:"订单已删除",mask:!0,icon:"success"}),3==e.tabIndex&&e.userOrderList(5,0))},fail:function(t){console.log(t)}}):0==e.userType&&t.request({url:n+"home/release/update_information",method:"POST",data:{id:a,del:0},success:function(a){console.log(a),100==a.data.code&&(t.showToast({title:"订单已删除",mask:!0,icon:"success"}),0==e.tabIndex&&e.getTransportationList("0,1,2,3,4,5,6,7",0),3==e.tabIndex&&e.getTransportationList(5,0))},fail:function(t){console.log(t)}}))}})}}};a.default=o}).call(this,e("543d")["default"])},3726:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c},s=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return s})},a85d:function(t,a,e){"use strict";var n=e("d2a1"),s=e.n(n);s.a},c3ef:function(t,a,e){"use strict";e.r(a);var n=e("3726"),s=e("f11c");for(var i in s)"default"!==i&&function(t){e.d(a,t,function(){return s[t]})}(i);e("a85d");var r=e("2877"),u=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);a["default"]=u.exports},d2a1:function(t,a,e){},f11c:function(t,a,e){"use strict";e.r(a);var n=e("2b6b"),s=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,function(){return n[t]})}(i);a["default"]=s.a}},[["0d0f","common/runtime","common/vendor"]]]);