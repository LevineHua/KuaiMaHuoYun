(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/km-order"],{"75c1":function(t,e,r){},"7ca9":function(t,e,r){"use strict";var a=r("75c1"),s=r.n(a);s.a},d02d:function(t,e,r){"use strict";r.r(e);var a=r("fbc2"),s=r("fad2");for(var u in s)"default"!==u&&function(t){r.d(e,t,function(){return s[t]})}(u);r("7ca9");var n=r("2877"),d=Object(n["a"])(s["default"],a["a"],a["b"],!1,null,null,null);e["default"]=d.exports},d168:function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=s(r("5b0b"));function s(t){return t&&t.__esModule?t:{default:t}}var u={name:"km-order",props:{name:{default:""},status:{default:"1"},hideName:{default:"true"},isRemark:{default:!1},userType:{default:1},startCity:{default:""},endCity:{default:""},money:{default:""},carType:{default:""},goodsWeight:{default:""},goodsName:{default:""},startTime:{default:""},createTime:{default:""},orderId:{default:0},needCar:{default:0}},data:function(){return{propagations:!0,isDel:!0}},computed:{filterName:function(){return this.name.slice(0,1)+"**"},filterStartTime:function(){var t=a.default.contrastDate(this.startTime),e=this.startTime;return e=t?"今天":a.default.formatTime(this.startTime),e},filterCreateTime:function(){var t=a.default.contrastDate(this.createTime),e=this.createTime;return e=t?"今天":a.default.formatTime(this.createTime),e}},methods:{seeOrder:function(){var e=this;console.log(e.userType),0!=e.status&&1!=e.status&&3!=e.status&&4!=e.status&&"s-0"!=e.status&&7!=e.status&&6!=e.status||!e.isDel||(1==e.userType?t.navigateTo({url:"../orderInfo/orderInfo?status="+e.status+"&orderId="+e.orderId}):t.navigateTo({url:"../orderInfo_shipper/orderInfo_shipper?status="+e.status+"&orderId="+e.orderId}))},orderInfo:function(){var e=this;1==e.userType?t.navigateTo({url:"../orderInfo/orderInfo?status="+e.status+"&orderId="+e.orderId}):t.navigateTo({url:"../orderInfo_shipper/orderInfo_shipper?status="+e.status+"&orderId="+e.orderId})},delOrder:function(){return this.isDel=!1,this.$emit("delOrder"),!1},remarkOrder:function(e){this.isDel=!1,t.navigateTo({url:"../writeAassess/writeAassess?orderId="+_this.orderId})}}};e.default=u}).call(this,r("543d")["default"])},fad2:function(t,e,r){"use strict";r.r(e);var a=r("d168"),s=r.n(a);for(var u in a)"default"!==u&&function(t){r.d(e,t,function(){return a[t]})}(u);e["default"]=s.a},fbc2:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},s=[];r.d(e,"a",function(){return a}),r.d(e,"b",function(){return s})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/km-order-create-component',
    {
        'components/km-order-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d02d"))
        })
    },
    [['components/km-order-create-component']]
]);                