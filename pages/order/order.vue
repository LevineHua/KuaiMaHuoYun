<template>
	<view class="page">
		<template v-if="uid=='' || uid==null">
			<view class="no_login">
				<view class="goLogin" @click="goLogin">去登陆</view>
			</view>
		</template>
		<template v-if="uid!='' && uid!=null">
			<!-- 车主 -->
			<template v-if="userType==1">
				<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
					<view v-for="(tab,index) in tabBars" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''"
					 :id="tab.id" :data-current="index" @click="tapTab">{{tab.name}}</view>
				</scroll-view>
				
				<swiper :current="tabIndex" class="swiper-box" :duration="300" @change="changeTab">
					<!-- <swiper-item v-for="(tab,index1) in 4" :key="index1">
						<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
							etetsetsetetse
						</scroll-view>
					</swiper-item> -->
					<swiper-item>
						<scroll-view class="list" scroll-y lower-threshold="10" @scrolltolower="loadMore(0)">
							<kmOrder 
								v-for="(daiL,order_index) in daiquerenList"
								:key="order_index"
								:name="daiL.username"
								:startCity="daiL.start_delivery[0]"
								:endCity="daiL.end_delivery[0]"
								:money="daiL.money"
								:carType="daiL.vehicle_msg"
								:goodsWeight="daiL.transportation_weight"
								:goodsName="daiL.transportation_name"
								:startTime="daiL.start_time"
								:createTime="daiL.create_time"
								:status="daiL.states"
								:orderId="daiL.id"
								:userType='userType'
								userIsCarer='false'
							></kmOrder>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="list" scroll-y lower-threshold="10" @scrolltolower="loadMore(1)">
							<kmOrder 
								v-for="(ol,dzf_index) in daizhifuList"
								:key="dzf_index"
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
								:userType='userType'
								userIsCarer='false'
							></kmOrder>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="list" scroll-y lower-threshold="10" @scrolltolower="loadMore(2)">
							<kmOrder 
								v-for="(ol,ysz_index) in yunshuzhongList"
								:key="ysz_index"
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
								:userType='userType'
								userIsCarer='false'
							></kmOrder>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="list" scroll-y lower-threshold="10" @scrolltolower="loadMore(3)">
							<kmOrder 
								v-for="(ol,ywc_index) in yiwanchengList"
								:key="ywc_index"
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
								:userType='userType'
								userIsCarer='false'
								@delOrder="delOrder(ol.id)"
							></kmOrder>
						</scroll-view>
					</swiper-item>
				</swiper>
			</template>
			<!-- 货主 -->
			<template v-if="userType==0">
				<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
					<view v-for="(tab,index2) in tabBars2" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index2 ? 'active' : ''"
					 :id="tab.id" :data-current="index2" @click="tapTab">{{tab.name}}</view>
				</scroll-view>
				<swiper :current="tabIndex" class="swiper-box" :duration="300" @change="changeTab">
					<!-- <swiper-item v-for="(tab,index1) in 4" :key="index1">
						<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
							etetsetsetetse
						</scroll-view>
					</swiper-item> -->
					<swiper-item>
						<scroll-view class="list" scroll-y lower-threshold="10" @scrolltolower="loadMore(0)">
							<!-- <kmOrder name="李四四" status='s-0' :userType='userType'></kmOrder> -->
							<kmOrder 
								v-for="(ol,yfb_index) in yifabuList"
								:key="yfb_index"
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
								:userType='userType'
								:needCar="ol.car_num"
								@delOrder="delOrder(ol.id)"
							></kmOrder>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="list" scroll-y lower-threshold="10" @scrolltolower="loadMore(1)">
							<!-- <kmOrder name="李四四" status='1' hideName='false' userIsCarer='false' :userType='userType'></kmOrder> -->
							<kmOrder 
								v-for="(ol,dqr_index) in daiquerenList"
								:key="dqr_index"
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
								:userType='userType'
								userIsCarer='false'
							></kmOrder>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="list" scroll-y lower-threshold="10" @scrolltolower="loadMore(2)">
							<!-- <kmOrder name="李四四" status='3' hideName='false' userIsCarer='false' :userType='userType'></kmOrder> -->
							<kmOrder 
								v-for="(ol,ysz_index) in yunshuzhongList"
								:key="ysz_index"
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
								:userType='userType'
								userIsCarer='false'
							></kmOrder>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="list" scroll-y lower-threshold="10" @scrolltolower="loadMore(3)">
							<!-- <kmOrder name="李四四" status='s-4' isRemark='false' hideName='false' :userType='userType'></kmOrder>
							<kmOrder name="李四四" status='s-4' isRemark='true' hideName='false' :userType='userType'></kmOrder> -->
							<kmOrder 
								v-for="(ol,ywc_index) in yiwanchengList"
								:key="ywc_index"
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
								:userType='userType'
								userIsCarer='false'
								@delOrder="delOrder(ol.id)"
							></kmOrder>
						</scroll-view>
					</swiper-item>
				</swiper>
			</template>
		</template>
	</view>
</template>

<script>
	import kmOrder from '../../components/km-order.vue'
	export default {
		data() {
			return {
				userinfo:'',
				url:'',
				scrollLeft: 0,
				tabIndex: 0,
				userType:0,		//0表示货主，1表示车主
				tabBars: [{
					name: '待确认',
					id: 'daiqueren',
					status:'0,3',
					page:0,
					count_page:0
				}, {
					name: '待支付',
					id: 'daizhifu',
					status:7,
					page:0,
					count_page:0
				}, {
					name: '运输中',
					id: 'yunshuzhong',
					status:'4,6',
					page:0,
					count_page:0
				}, {
					name: '已完成',
					id: 'yiwancheng',
					status:5,
					page:0,
					count_page:0
				}],
				tabBars2: [{
					name: '已发布',
					id: 'yifabu',
					status:'0,1,2,3,4,5,6,7',
					page:0,
					count_page:0
				}, {
					name: '待确认',
					id: 'daiqueren2',
					status:3,
					page:0,
					count_page:0
				}, {
					name: '运输中',
					id: 'yunshuzhong2',
					status:4,
					page:0,
					count_page:0
				}, {
					name: '已完成',
					id: 'yiwancheng2',
					status:5,
					page:0,
					count_page:0
				}],
				orderList:[],
				daiquerenList:[],	// 待确认
				daizhifuList:[],	//待支付
				daifukuanList:[],	//待付款
				yunshuzhongList:[],	//运输中
				yiwanchengList:[],	//已完成
				yifabuList:[],	//货主已发布的订单
				uid:''
			}
		},
		components:{
			kmOrder
		},
		onLoad() {
			var _this = this;
			/* this.userinfo = uni.getStorageSync('userinfo');
			this.userType = this.userinfo.user_identity;
			this.uid = uni.getStorageSync("uid"); */
		},
		onShow() {
			var _this = this;
			this.uid = uni.getStorageSync("uid");
			this.url = this.serverURL;
			if(this.uid==null || this.uid==''){
				return;
			}
			this.userinfo = uni.getStorageSync('userinfo');
			this.userType = this.userinfo.user_identity;
			var user_id = this.userinfo.user_id;
			uni.showLoading({
				title:'加载中...',
				mask:true
			})
			if(this.userType==1){
				_this.userOrderList('0,3',0);
				_this.userOrderList('7',0);
			} else if(_this.userType==0) {
				
				_this.getTransportationList('0,1,2,3,4,5,6,7',0)
			}
		},
		methods: {
			goLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/template/tabbar/detail/detail?title=' + e.title
				});
			},
			loadMore(index) {
				var _this = this;
				if(this.userType==1){
					if(index==0){
						_this.userOrderList('0,3',_this.tabBars[index].page = _this.tabBars[index].page+1,1);
					} else if(index==1){
						_this.userOrderList(7,_this.tabBars[index].page = _this.tabBars[index].page+1,1);
					} else if(index==2){
						_this.userOrderList('4,6',_this.tabBars[index].page = _this.tabBars[index].page+1,1);
					} else if(index==3){
						_this.userOrderList(5,_this.tabBars[index].page = _this.tabBars[index].page+1,1);
					}
				} else if(_this.userType==0) {
					if(index==0){
						_this.getTransportationList('0,1,2,3,4,5,6,7',_this.tabBars2[index].page = _this.tabBars2[index].page+1,1);
					} else if(index==1){
						_this.getTransportationList(3,_this.tabBars2[index].page = _this.tabBars2[index].page+1,1);
					} else if(index==2){
						_this.getTransportationList(4,_this.tabBars2[index].page = _this.tabBars2[index].page+1,1);
					} else if(index==3){
						_this.getTransportationList(5,_this.tabBars2[index].page = _this.tabBars2[index].page+1,1);
					}
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
				var _this = this;
				let index = e.target.current;
				this.tabIndex = index; //一旦访问data就会出问题
				if(_this.userType==1){
					var status = _this.tabBars[index].status;
					var page = _this.tabBars[index].page = 0;
					_this.userOrderList(status,page) 
				} else if(_this.userType==0) {
					var status = _this.tabBars2[index].status;
					var page = _this.tabBars2[index].page = 0;
					_this.getTransportationList(status,page) 
				}
			},
			async tapTab(e) { //点击tab-bar
				let tabIndex = e.target.dataset.current;
				this.tabIndex = tabIndex;
			},
			userOrderList(status,page,isLoad=0) {	//司机获取订单
				var _this = this;
				if(isLoad==0 || (status=='0,3' && page<_this.tabBars[0].count_page) || (status==7 && page<_this.tabBars[1].count_page) || (status=='4,6' && page<_this.tabBars[2].count_page) || (status==5 && page<_this.tabBars[3].count_page)){
					uni.showLoading({
						title:'加载中...',
						mask:true
					})
					uni.request({
						url: _this.url + 'home/user/user_order_list',
						method:'POST',
						data:{
							uid: _this.userinfo.user_id,
							type:status,
							page_num:page
						},
						success(res) {
							console.log(res)
							if(res.data.code==100){
								uni.hideLoading();
								if(status=='0,3'){
									_this.tabBars[0].count_page = res.data.count_page;
									if(isLoad==1){
										_this.daiquerenList.push.apply(_this.daiquerenList,res.data.msg);
									} else {
										_this.daiquerenList = res.data.msg;
									}
								} else if(status==7){
									_this.tabBars[1].count_page = res.data.count_page;
									if(isLoad==1){
										_this.daizhifuList.push.apply(_this.daizhifuList,res.data.msg);
									} else {
										_this.daizhifuList = res.data.msg;
									}
								} else if(status=='4,6'){
									_this.tabBars[2].count_page = res.data.count_page;
									if(isLoad==1){
										_this.yunshuzhongList.push.apply(_this.yunshuzhongList,res.data.msg);
									} else {
										_this.yunshuzhongList = res.data.msg;
									}
								} else if(status==5){
									_this.tabBars[3].count_page = res.data.count_page;
									if(isLoad==1){
										_this.yiwanchengList.push.apply(_this.yiwanchengList,res.data.msg);
									} else {
										_this.yiwanchengList = res.data.msg;
									}
									console.log(_this.yiwanchengList);
								}
							}
						},
						fail(res) {
							console.log(res);
						}
					})
				}
			},
			getTransportationList(status,page,isLoad=0) {	//货主获取订单
				var _this = this;
				if(isLoad==0 || (status=='0,1,2,3,4,5,6,7' && page<_this.tabBars2[0].count_page) || (status==3 && page<_this.tabBars2[1].count_page) || (status==4 && page<_this.tabBars2[2].count_page) || (status==5 && page<_this.tabBars2[3].count_page)){
					uni.showLoading({
						title:'加载中...',
						mask:true
					})
					uni.request({
						url: _this.url + 'home/index/get_transportation_list',
						method:'POST',
						data:{
							uid: _this.userinfo.user_id,
							states:status,
							page_num:page
						},
						success(res) {
							console.log(res)
							if(res.data.code==100){
								uni.hideLoading();
								if(status=='0,1,2,3,4,5,6,7'){
									_this.tabBars2[0].count_page = res.data.count_page;
									if(isLoad==1){
										_this.yifabuList.push.apply(_this.yifabuList,res.data.list);
									} else {
										_this.yifabuList = res.data.list;
									}
								} else if(status==3){
									_this.tabBars2[1].count_page = res.data.count_page;
									if(isLoad==1){
										_this.daiquerenList.push.apply(_this.daiquerenList,res.data.list);
									} else {
										_this.daiquerenList = res.data.list;
									}
								} else if(status==4){
									_this.tabBars2[2].count_page = res.data.count_page;
									if(isLoad==1){
										_this.yunshuzhongList.push.apply(_this.yunshuzhongList,res.data.list);
									} else {
										_this.yunshuzhongList = res.data.list;
									}
								} else if(status==5){
									_this.tabBars2[3].count_page = res.data.count_page;
									if(isLoad==1){
										_this.yiwanchengList.push.apply(_this.yiwanchengList,res.data.list);
									} else {
										_this.yiwanchengList = res.data.list;
									}
								}
							}
						},
						fail(res) {
							console.log(res);
						}
					})
				}
			},
			delOrder(orderId) {
				var _this = this;
				var url = this.serverURL;
				uni.showModal({
					title:'删除订单',
					content:'确定要删除该订单吗？',
					success(res) {
						if(res.confirm){
							console.log("删除订单");
							if(_this.userType==1){
								uni.request({
									url: url + 'home/Order/update_transportation_order',
									method:'POST',
									data:{
										id:orderId,
										del: 0
									},
									success(res) {
										console.log(res);
										if(res.data.code==100){
											uni.showToast({
												title:'订单已删除',
												mask:true,
												icon:"success"
											});
											if(_this.tabIndex==3){
												_this.userOrderList(5,0);
											}
										}
									},
									fail(error) {
										console.log(error)
									}
								})
							} else if(_this.userType==0) {
								uni.request({
									url: url + 'home/release/update_information',
									method:'POST',
									data:{
										id:orderId,
										del: 0
									},
									success(res) {
										console.log(res);
										if(res.data.code==100){
											uni.showToast({
												title:'订单已删除',
												mask:true,
												icon:"success"
											});
											if(_this.tabIndex==0){
												_this.getTransportationList('0,1,2,3,4,5,6,7',0)
											}
											if(_this.tabIndex==3){
												_this.getTransportationList(5,0)
											}
										}
									},
									fail(error) {
										console.log(error)
									}
								})
								
							}
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("order.css");
</style>
