(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/selectCity/selectCity"],{"14bb":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},i=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return i})},"2c23":function(t,e,o){"use strict";o.r(e);var n=o("14bb"),i=o("6e42");for(var c in i)"default"!==c&&function(t){o.d(e,t,function(){return i[t]})}(c);var s=o("2877"),r=Object(s["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},"6e42":function(t,e,o){"use strict";o.r(e);var n=o("fa32"),i=o.n(n);for(var c in n)"default"!==c&&function(t){o.d(e,t,function(){return n[t]})}(c);e["default"]=i.a},fa32:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(o("73b9"));function i(t){return t&&t.__esModule?t:{default:t}}var c=function(){return Promise.all([o.e("common/vendor"),o.e("components/ss-select-city/ss-select-city")]).then(o.bind(null,"f105"))},s={data:function(){return{hotCitys:[],value:"北京",cityType:"",qqMapWX:""}},components:{ssSelectCity:c},onLoad:function(t){var e=this;e.cityType=t.type,e.qqMapWX=new n.default({key:e.mapKey}),e.position()},onShow:function(){var e=this,o=t.getStorageSync("searchHistory");e.hotCitys=o},methods:{onSelect:function(e){console.log(e),t.redirectTo({url:"../writeAddress/writeAddress?city="+e+"&type="+this.cityType})},clearHistory:function(){console.log("清空搜索记录"),t.removeStorageSync("searchHistory"),this.hotCitys=[]},position:function(){var e=this;t.getLocation({type:"wgs84",success:function(t){console.log(t),e.qqMapWX.reverseGeocoder({location:{latitude:t.latitude,longitude:t.longitude},success:function(t){console.log(t),e.value=t.result.ad_info.city.replace("市",""),console.log(e.value)},fail:function(t){console.log(t)},complete:function(){console.log("完成")}})}})},searchCity:function(e){var o=this,n=t.getStorageSync("searchHistory");if(""!=e){if(""==n){var i=[];i.unshift(e),t.setStorageSync("searchHistory",i),o.hotCitys=i}else{for(var c=0,s=0;s<n.length;s++)if(n[s]==e){c=1;break}0==c&&(n.unshift(e),o.hotCitys=n),t.setStorageSync("searchHistory",n)}console.log(n)}t.navigateTo({url:"../searchCity/searchCity?search="+e+"&type="+this.cityType})}}};e.default=s}).call(this,o("543d")["default"])}},[["46fc","common/runtime","common/vendor"]]]);