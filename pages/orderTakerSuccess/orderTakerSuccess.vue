<template>
	<view class="page order_taker_success">
		<image src="../../static/success.png" class="success_icon"></image>
		<template v-if="userType==0">
			<view class="success_tip">订单发布成功请在订单中查看</view>
		</template>
		<template v-if="userType==1">
			<view class="success_tip">接单成功请在订单中查看</view>
		</template>
		<view class="btn goOrder" @click="goOrder">前往订单</view>
		<view class="btn goHome" @click="goHome">返回首页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userType:1
			}
		},
		onLoad(e) {
			this.userType = e.userType;
		},
		methods: {
			goOrder() {
				uni.switchTab({
					url:'../order/order'
				})
				/* uni.redirectTo({
					url:"../orderInfo_shipper/orderInfo_shipper?status="+_this.status+"&orderId="+_this.orderId
				}) */
			},
			goHome() {
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style>
	.order_taker_success{
		text-align: center;
	}
	.success_icon{
		width: 164upx;
		height: 166upx;
		margin: 80upx;
	}
	.success_tip{
		color: #9c9c9c;
		font-size: 24upx;
		text-align: center;
		margin-bottom: 90upx;
	}
	.btn{
		font-size: 24upx;
		margin: 0 auto;
		margin-bottom: 30upx;
		width: 186upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30px;
	}
	.goOrder{
		color: white;
		background: #139cff;
	}
	.goHome{
		color: #139cff;
		background: white;
		border: solid 2px #eee;
	}
</style>
