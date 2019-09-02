<template>
	<view class="page">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view class="order_filter">
				<view class="filter">{{start_delivery}}</view>
				<view class="filter">{{end_delivery}}</view>
				<view class="filter">{{vehicle_msg}}</view>
			</view>
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''"
			 :id="tab.id" :data-current="index" @click="tapTab">{{tab.name}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" :duration="300" @change="changeTab">
			<swiper-item>
				<scroll-view class="list" scroll-y lower-threshold="10" @scrolltolower="loadMore(0)">
					<template v-if="todayOrderList.length>0">
						<kmOrder 
							v-for="(ol,order_index) in todayOrderList"
							v-if="ol.states==1 || ol.states==3 || ol.states==4 "
							:key="order_index"
							:name="ol.username"
							:startCity="ol.start_delivery[0]"
							:endCity="ol.end_delivery[0]"
							:money="ol.money"
							:carType="ol.vehicle_msg"
							:goodsWeight="ol.transportation_weight"
							:goodsName="ol.transportation_name"
							:startTime="ol.start_time"
							:createTime="ol.create_time"
							:status="ol.states"
							:orderId="ol.id"
							@seeOrder="seeOrder(ol.states,ol.id)"
						></kmOrder>
					</template>
					<template v-else>
						<view class="list_null">
							<image class="null_icon" src="../../static/null.png"></image>
							<text class="null_text">这条线路还没有订单，换个地区试试呗？</text>
						</view>
						<template v-if="recommendTodayList.length>0 && todayOrderList.length==0">
							<view class="recommend_title">
								<image src="../../static/recommend.png" class="recommend_icon"></image>
								推荐订单
							</view>
							<view class="recommend_list">
								<kmOrder 
									v-for="(rl,recommendToday_index) in recommendTodayList" 
									v-if="rl.states==1 || rl.states==3 || rl.states==4 "
									:key="recommendToday_index"
									:name="rl.username"
									:startCity="rl.start_delivery[0]"
									:endCity="rl.end_delivery[0]"
									:money="rl.money"
									:carType="rl.vehicle_msg"
									:goodsWeight="rl.transportation_weight"
									:goodsName="rl.transportation_name"
									:startTime="rl.start_time"
									:createTime="rl.create_time"
									:status="rl.states"
									:orderId="rl.id"
									@seeOrder="seeOrder(rl.states,rl.id)"
								></kmOrder>
							</view>
						</template>
					</template>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="list" scroll-y lower-threshold="10" @scrolltolower="loadMore(1)">
					<template v-if="orderList.length>0">
						<kmOrder 
							v-for="(ol,today_index) in orderList"
							v-if="ol.states==1 || ol.states==3 || ol.states==4 "
							:key="today_index"
							:name="ol.username"
							:startCity="ol.start_delivery[0]"
							:endCity="ol.end_delivery[0]"
							:money="ol.money"
							:carType="ol.vehicle_msg"
							:goodsWeight="ol.transportation_weight"
							:goodsName="ol.transportation_name"
							:startTime="ol.start_time"
							:createTime="ol.create_time"
							:status="ol.states"
							:orderId="ol.id"
							@seeOrder="seeOrder(ol.states,ol.id)"
						></kmOrder>
					</template>
					<template v-else>
						<view class="list_null">
							<image class="null_icon" src="../../static/null.png"></image>
							<text class="null_text">这条线路还没有订单，换个地区试试呗？</text>
						</view>
						<template v-if="recommendList.length>0 && orderList.length==0">
							<view class="recommend_title">
								<image src="../../static/recommend.png" class="recommend_icon"></image>
								推荐订单
							</view>
							<view class="recommend_list">
								<kmOrder 
									v-for="(rl,recommend_index) in recommendList" 
									v-if="rl.states==1 || rl.states==3 || rl.states==4 "
									:key="recommend_index"
									:name="rl.username"
									:startCity="rl.start_delivery[0]"
									:endCity="rl.end_delivery[0]"
									:money="rl.money"
									:carType="rl.vehicle_msg"
									:goodsWeight="rl.transportation_weight"
									:goodsName="rl.transportation_name"
									:startTime="rl.start_time"
									:createTime="rl.create_time"
									:status="rl.states"
									:orderId="rl.id"
									@seeOrder="seeOrder(rl.states,rl.id)"
								></kmOrder>
							</view>
						</template>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import kmOrder from '../../components/km-order2.vue'
	import util from '../../common/util.js'
	export default {
		data() {
			return {
				scrollLeft: 0,
				tabIndex: 0,
				tabBars: [{
					name: '即时订单',
					id: 'jishidingdan'
				}, {
					name: '预约订单',
					id: 'yuyuedingdan'
				}],
				vehicle_msg:'',
				start_delivery:'',
				end_delivery:'',
				page_num:0,
				orderList:[],	//预约列表
				todayOrderList:[],	//即时订单
				recommendList:[],	//推荐预约列表
				recommendTodayList:[],	//推荐即时列表
				todayListPage:0,
				todayPageCount:0,
				YYListPage:0,
				YYPageCount:0,
				todayRecommendPage:0,
				todayRecommendPageCount:0,
				recommendPageCount:0,
				recommendPage:0,
			}
		},
		components:{
			kmOrder
		},
		onLoad(e) {
			/* uni.showLoading({
				title:"急速为你匹配中...",
				mask:true
			}) */
			this.vehicle_msg = e.vehicle_msg;
			this.start_delivery = e.start_delivery;
			this.end_delivery = e.end_delivery;
			
			//this.searchPageList(0);
			this.getTodayList(this.todayListPage);
			this.getYYList(this.YYListPage);
		},
		methods: {
			seeOrder(status,orderId) {
				console.log('test');
				var _this = this;
				uni.navigateTo({
					url:"../orderInfo2/orderInfo2?orderId="+orderId
				})
			},
			getTodayList(page,isLoad=0) {
				var _this = this;
				var url = _this.serverURL;
				var data = {
					vehicle_msg: this.vehicle_msg ,
					start_delivery: this.start_delivery,
					end_delivery: this.end_delivery,
					page_num: page,
					times:1
				}
				if(page<_this.todayPageCount || isLoad==0){
					uni.showLoading({
						title:"急速为你匹配中...",
						mask:true
					})
					uni.request({
						url: url + 'home/index/get_transportation_list',
						method:'POST',
						data:data,
						success(success) {
							console.log(success)
							if(success.data.code==100){
								uni.hideLoading();
								var list = success.data.list;
								if(isLoad==1){
									_this.todayOrderList.push.apply(_this.todayOrderList,list);
								} else {
									_this.todayOrderList = list;
									_this.todayPageCount = success.data.count_page;
								}
								if(_this.todayOrderList.length==0){
									_this.getTodayRecommend(_this.todayRecommendPage);
								}
							}
						},
						fail(fail) {
							console.log(fail);
						},
						complete() {
							uni.hideLoading();
						}
					})
				}
			},
			getYYList(page,isLoad=0) {
				var _this = this;
				var url = _this.serverURL;
				var data = {
					vehicle_msg: this.vehicle_msg ,
					start_delivery: this.start_delivery,
					end_delivery: this.end_delivery,
					page_num: page,
					times:2
				}
				if(page<_this.YYPageCount || isLoad==0){
					uni.showLoading({
						title:"急速为你匹配中...",
						mask:true
					})
					uni.request({
						url: url + 'home/index/get_transportation_list',
						method:'POST',
						data:data,
						success(success) {
							console.log(success)
							if(success.data.code==100){
								uni.hideLoading();
								var list = success.data.list;
								if(isLoad==1){
									_this.orderList.push.apply(_this.orderList,list);
								} else {
									_this.orderList = list;
									_this.YYPageCount = success.data.count_page;
								}
								if(_this.orderList.length==0){
									_this.getRecommend(_this.recommendPage);
								}
							}
						},
						fail(fail) {
							console.log(fail);
						},
						complete() {
							uni.hideLoading();
						}
					})
				}
			},
			getTodayRecommend(page,isLoad=0) {
				var _this = this;
				var url = _this.serverURL;
				var data2 = {
					start_delivery: _this.start_delivery,
					times:1,
					page_num: page
				}
				if(page<_this.todayRecommendPageCount || isLoad==0){
					uni.showLoading({
						title:"急速为你匹配中...",
						mask:true
					})
					uni.request({
						url: url + 'home/index/get_transportation_list',
						method:'POST',
						data:data2,
						success(res) {
							console.log(res);
							if(res.data.code==100){
								uni.hideLoading();
								var recommendList = res.data.list;
								if(isLoad==1){
									_this.recommendTodayList.push.apply(_this.recommendTodayList,recommendList);
								} else {
									_this.recommendTodayList = recommendList;
									_this.todayRecommendPageCount = res.data.count_page;
								}
							}
						}
					})
				}
			},
			getRecommend(page,isLoad=0) {
				var _this = this;
				var url = _this.serverURL;
				var data2 = {
					start_delivery: _this.start_delivery,
					times:2,
					page_num: page
				}
				if(page<_this.recommendPageCount || isLoad==0){
					uni.showLoading({
						title:"急速为你匹配中...",
						mask:true
					})
					uni.request({
						url: url + 'home/index/get_transportation_list',
						method:'POST',
						data:data2,
						success(res) {
							console.log(res);
							if(res.data.code==100){
								uni.hideLoading();
								var recommendList = res.data.list;
								if(isLoad==1){
									_this.recommendList.push.apply(_this.recommendList,recommendList);
								} else {
									_this.recommendList = recommendList;
									_this.recommendPageCount = res.data.count_page;
								}
							}
						}
					})
				}
			},
			isToday(date) {
				var isToday = util.contrastDate(date);
				return isToday;
			},
			goDetail(e) {
				/* uni.navigateTo({
					url: '/pages/template/tabbar/detail/detail?title=' + e.title
				}); */
			},
			loadMore(index) {
				/* setTimeout(() => {
					this.addData(e);
				}, 1200); */
				var _this = this;
				if(index==0 && _this.todayOrderList.length!=0){
					this.getTodayList(_this.todayListPage = _this.todayListPage+1,1);
				} else if(index==1 && _this.orderList.length!=0) {
					this.getYYList(_this.YYListPage = _this.YYListPage+1,1);
				} else if(index==0 && _this.todayOrderList.length==0) {
					this.getTodayRecommend(_this.todayRecommendPage = _this.todayRecommendPage+1,1);
				} else if(index==1 && _this.orderList.length==0) {
					this.getRecommend(_this.recommendPage = _this.recommendPage+1,1);
				}
			},
			addData(e) {
				/* if (this.newsitems[e].data.length > 30) {
					this.newsitems[e].loadingText = '没有更多了';
					return;
				}
				for (let i = 1; i <= 10; i++) {
					this.newsitems[e].data.push(tpl['data' + Math.floor(Math.random() * 5)]);
				} */
			},
			async changeTab(e) {
				let index = e.target.current;
				this.tabIndex = index; //一旦访问data就会出问题
				var _this = this;
				/* if(index==0){
					_this.getTodayList(_this.todayListPage);
				} else {
					_this.getYYList(_this.YYListPage);
				} */
			},
			async tapTab(e) { //点击tab-bar
				let tabIndex = e.target.dataset.current;
				this.tabIndex = tabIndex;
			}
		}
	}
</script>

<style>
	@import url("orderList.css");
</style>
