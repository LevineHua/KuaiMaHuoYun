<template>
	<view class="page orderInfo_page">
		<view class="order_address">
			<image class="address_icon" src="../../static/address3.png"></image>
			{{order.start_delivery[0]}}
			<image class="line_icon" src="../../static/address_line.png"></image>
			{{order.end_delivery[0]}}
		</view>
		<view class="order_info">
			<kmLi title="出发地点" :content="order.start_delivery[1]" :status="order.states"></kmLi>
			<kmLi title="目的地" :content="order.end_delivery[1]" :status="order.states"></kmLi>
			<kmLi title="车辆需求" :content="order.vehicle_msg"></kmLi>
			<template v-if="isUpdate==0">
				<kmLi title="需要车辆" :content="order.car_num+'辆'"></kmLi>
			</template>
			<template v-if="isUpdate==1">
				<view class="title_item" style="border-bottom: solid 1px #EEEEEE;">
					<view class="title_item_title">需要车辆：</view>
					<view class="item_text">
						<uni-number-box min="1" max="999" @change="changeCar" :value="carNum"></uni-number-box>
					</view>
				</view>
			</template>
			<kmLi title="装货时间" :content="order.start_time" isDate="true"></kmLi>
			<kmLi title="装载货物" :content="order.transportation_name"></kmLi>
			<kmLi title="装载吨位" :content="order.transportation_weight"></kmLi>
			<kmLi title="雇佣价格" :content="order.money+'元/吨'"></kmLi>
			<template v-if="(status>1 && status!=6) && isUpdate==0">	<!-- s-0 -->
				<view class="carers">
					<view class="title_item">
						<view class="title_item_title">联系人</view>
						<view class="item_text">
							<image src='../../static/picture2.png' class="item_icon"></image>
						</view>
					</view>
					<view class="cares_list" style="height:auto">
						<view class="carer_item" v-for="oo in order.owner" :key="oo.id" v-if="oo.states!=1">
							<text>司机：{{oo.username}}</text>
							<view class="carer_info" v-if="oo.states!=0 && oo.states!=7">
								{{oo.mobile}}
								<image src="../../static/phone2.png" @click="makePhoneCall" :data-phone='oo.mobile' class="carer_phono_icon"></image>
							</view>
							<view class="confirm_btn" v-if="oo.states==0" @click="goConfirm(oo.id,oo.states)">确认司机</view>
							<view class="confirm_btn" v-if="oo.states!=0" @click="seeMap(oo.id,oo.states)">查看</view>
						</view>
					</view>
					<!-- <view class="seeMore" @click="seeMore">
						<template v-if="seeMoreIsOpen==0">
							查看更多
							<image src="../../static/down.png" class='btn_icon'></image>
						</template>
						<template v-if="seeMoreIsOpen==1">
							收起
							<image src="../../static/up.png" class='btn_icon'></image>
						</template>
					</view> -->
				</view>
			</template>
			<kmLi title="订单备注" :content="order.remarks"></kmLi>
		</view>
		<view class="order_footer">
			<template v-if="status==0 && isUpdate==0">	<!-- s-0 -->
				<view class="order_status">等待接单</view>
				<view class="update_order" @click="updateOrder">
					<image src="../../static/updateOrder.png" class="update_icon"></image>
					订单修改
				</view>
				<view class="callShipper" @click="cancelOrder">取消订单</view>
			</template>
			<template v-if="(status==1 && isUpdate==0)  || (status==3 && isUpdate==0)">	
				<view class="order_status">等待确定</view>
				<view class="update_order" style="width: 237upx;" @click="updateOrder">
					<image src="../../static/updateOrder.png" class="update_icon"></image>
					订单修改
				</view>
			</template>
			<template v-if="status==4 && isUpdate==0">
				<view class="order_status">运输中</view>
				<view class="update_order" style="width: 237upx;" @click="updateOrder">
					<image src="../../static/updateOrder.png" class="update_icon"></image>
					订单修改
				</view>
			</template>
			<template v-if="isUpdate==1">
				<view class="order_status"></view>
				<view class="callShipper" @click="confirmUpdate">
					修改完成
				</view>
			</template>
			<template v-if="status==5">
				<view class="order_status">订单已完成</view>
			</template>
			<template v-if="status==6">
				<view class="order_status">订单已取消</view>
			</template>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import kmLi from '../../components/km-li.vue'
	export default {
		data() {
			return {
				carNum:0,
				userinfo:{},
				type: '',
				isAgree:'',
				status:0,	//1:待确认；s-0：等待接单；3：运输中	//0：审核中;1:未接单；3:待确定；4：运输中；5：已完成；
				isUpdate:0, //是否是修改订单界面。0：否；1：是
				lookInfoNeedMoney:100,
				cutMoney:0,
				seeMoreIsOpen:0,
				orderId:'',
				order:'',
				url:''
			}
		},
		components: {
			uniNumberBox,
			kmLi
		},
		onLoad(e) {
			/* uni.showLoading({
				title:'加载中...',
				mask:true
			}) */
			var _this = this;
			this.userinfo = uni.getStorageSync('userinfo');
			console.log(e.status);
			this.orderId = e.orderId;
			uni.removeStorage({
				key:'cutMoney',
				success() {
					
				}
			})
			
			/* var url = this.serverURL;
			this.url = this.serverURL;
			uni.request({
				url: url + 'home/index/get_transportation_order',
				method:'POST',
				data:{
					tid: _this.orderId,
					user_id: _this.userinfo.user_id
				},
				success(res) {
					if(res.data.code==100){
						uni.hideLoading();
						var order = res.data.list;
						_this.order = order;
						console.log(order);
						_this.status = parseInt(order.states);
						_this.carNum = order.car_num;
					}
				},
				fail(error) {
					console.log(error)
				}
			}) */
		},
		onShow() {
			uni.showLoading({
				title:'加载中...',
				mask:true
			})
			var _this = this;
			uni.getStorage({
				key:'cutMoney',
				success(res) {
					console.log(res.data);
					_this.cutMoney = res.data * (-1);
				}
			})
			var url = this.serverURL;
			this.url = this.serverURL;
			uni.request({
				url: url + 'home/index/get_transportation_order',
				method:'POST',
				data:{
					tid: _this.orderId,
					user_id: _this.userinfo.user_id
				},
				success(res) {
					if(res.data.code==100){
						uni.hideLoading();
						var order = res.data.list;
						_this.order = order;
						console.log(order);
						_this.status = parseInt(order.states);
						_this.carNum = order.car_num;
					}
				},
				fail(error) {
					console.log(error)
				}
			})
		},
		methods: {
			changeCar(value) {
				this.carNum = value;
			},
			seeMore() {
				var _this = this;
				if(_this.seeMoreIsOpen==0){
					_this.seeMoreIsOpen=1;
				} else {
					_this.seeMoreIsOpen=0;
				}
			},
			makePhoneCall(e) {
				var phone = e.currentTarget.dataset.phone;
				console.log(phone);
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			goConfirm(id,status) {
				uni.navigateTo({
					url:'../confirmOrder/confirmOrder?id='+id+"&status="+status
				})
			},
			updateOrder() {
				this.isUpdate = 1;
			},
			confirmUpdate() {
				var url = this.serverURL;
				var _this = this;
				uni.showLoading({
					title:'修改中...',
					mask:true
				})
				uni.request({
					url: url + 'home/release/update_information',
					method:'POST',
					data:{
						id: _this.order.id,
						user_id: _this.order.user_id,
						car_num: _this.carNum
					},
					success(success) {
						console.log(success);
						if(success.data.code==100){
							uni.showToast({
								title:'修改成功',
								mask:true,
								icon:'success',
								success() {
									_this.isUpdate = 0;
									_this.order.car_num = _this.carNum;
									uni.hideLoading();
								}
							})
						}
					},
					fail(fail) {
						console.log(fail);
						uni.showToast({
							title:'修改失败',
							mask:true,
							icon:'none',
							success() {
								_this.isUpdate = 0;
								uni.hideLoading();
							}
						})
					}
				})
				
				
			},
			seeMap(id,status) {
				uni.navigateTo({
					url:'../carMap/carMap?id='+id+"&status="+status
				})
			},
			cancelOrder(){
				var _this = this;
				uni.request({
					url: _this.url + 'home/release/update_information',
					method:'POST',
					data:{
						id:_this.order.id,
						states: 6
					},
					success(res) {
						console.log(res);
						if(res.data.code==100){
							_this.status = 6;
							uni.showToast({
								title:'订单已取消',
								mask:true,
								icon:"success"
							})
						}
					},
					fail(error) {
						console.log(error)
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../orderInfo/orderInfo.css");
</style>
