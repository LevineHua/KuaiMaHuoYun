<template>
	<view class="page" style="padding-top: 20upx;box-sizing: border-box;">
		<view class="order_info">
			<view class="info">
				<image src="../../static/picture_img2.png" class="user_picture"></image>
				<view class="address">
					<view class="info_address">
						<text>{{order.start_delivery[0]}}</text>
						<image class="address_line_icon" src="../../static/address_line.png"></image>
						<text>{{order.end_delivery[0]}}</text>
					</view>
					<view class="infos">{{order.vehicle_msg}} / {{order.transportation_weight}}吨 /{{order.transportation_name}}</view>
					<view class="info_user">司机：{{order.username}}</view>
				</view>
			</view>
			<view class="status" v-if="order.states==4">运输中</view>
			<view class="status" v-if="order.states==5">已完成</view>
			<view class="status" v-if="order.states==6">待装货</view>
			<view class="status" v-if="order.states==7">等待司机联系</view>
		</view>
		<view class="km_timeline">
			<view class="km_timeline_item">
				<view class="timeline_time">{{order.start_time | filterTime}}</view>
				<view class="timeline_content">
					<view class="timeline_drink_bg">
						<view class="timeline_drink" :class="{isComplete : (order.states==6 || order.states==4 || order.states==5)}"></view>
					</view>
					订单确认等待司机装货
				</view>
			</view>
			<view class="km_timeline_item">
				<view class="timeline_time">2019-03-23 04:02</view>
				<view class="timeline_content">
					<view class="timeline_drink_bg">
						<view class="timeline_drink" :class="{isComplete : ((order.states==5 || order.states==4) && order.start_image_url!=null)}"></view>
					</view>
					装货完成出发前往目的地
					<view class="timeline_link" v-if="order.start_image_url!=null" @click="seePhoto(order.start_image_url)">查看图片</view>
				</view>
			</view>
			<view class="km_timeline_item">
				<view class="timeline_time">2019-03-23 04:02</view>
				<view class="timeline_content">
					<view class="timeline_drink_bg">
						<view class="timeline_drink" :class="{isComplete : ((order.states==4 || order.states==5) && order.end_image_url!=null)}"></view>
					</view>
					到达目的地城市过磅称重
					<view class="timeline_link" v-if="order.end_image_url!=null" @click="seePhoto(order.end_image_url)">查看图片</view>
				</view>
			</view>
			<view class="km_timeline_item">
				<view class="timeline_time">2019-03-23 04:02</view>
				<view class="timeline_content lastTimeline_item">
					<view class="timeline_drink_bg">
						<view class="timeline_drink" :class="{isComplete : ((order.states==4 || order.states==5) && order.end_image_url!=null)}"></view>
					</view>
					卸货完成 司机已确认完成
				</view>
			</view>
		</view>
		<view class="complete_btn complete_active" v-if="order.states!=5" @click="isConfirm">确认完成</view>
		<template v-if="order.states==5">
			<view class="complete_btn">已完成</view>
			<view class="complete_btn complete_active" v-if="order.comment_msg==null" style="margin-top: 50upx;" @click="goAssess">去评论</view>
			<view class="complete_btn" v-if="order.comment_msg!=null" style="margin-top: 50upx;">已评论</view>
		</template>
	</view>
</template>

<script>
	import util from '../../common/util.js'
	export default {
		data() {
			return {
				url:'',
				orderId:0,
				order:''
			}
		},
		onLoad(e) {
			var _this = this;
			this.orderId = e.orderId;
			this.url = this.serverURL;
			
			
		},
		onShow() {
			var _this = this;
			uni.showLoading({
				title:'加载中...',
				mask:true
			})
			uni.request({
				url: _this.url + 'home/user/user_order_id',
				method:'POST',
				data:{
					id: _this.orderId
				},
				success(res) {
					console.log(res);
					if(res.data.code==100){
						var order = res.data.msg;
						_this.order = order;
					}
					uni.hideLoading();
				},
				fail(error) {
					console.log(error)
				}
			})
		},
		filters:{
			filterTime(time) {
				return util.formatDate(time);
			}
		},
		methods: {
			seePhoto(url) {
				uni.navigateTo({
					url:'../photo/photo?photo='+url
				})
			},
			isConfirm() {
				var _this = this;
				uni.showLoading({
					title:'订单完成中...',
					mask:true
				})
				uni.request({
					url: _this.url + 'home/Order/update_transportation_order',
					method:'POST',
					data:{
						id: _this.orderId,
						states: 5,
					},
					success(res) {
						console.log(res);
						if(res.data.code==100){
							uni.hideLoading();
							_this.order.states = 5;
							uni.showToast({
								title:'订单已完成',
								icon:"success",
								mask:true
							})
						}
					},
					fail(error) {
						console.log(error);
						uni.showToast({
							title:'修改失败',
							icon:"none",
							mask:true
						})
					}
				})
			},
			goAssess() {
				uni.navigateTo({
					url: '../writeAassess/writeAassess?orderId='+this.orderId+"&name="+this.order.username
				})
			}
		}
	}
</script>

<style>
	@import url("userSeeOrderInfo.css");
</style>
