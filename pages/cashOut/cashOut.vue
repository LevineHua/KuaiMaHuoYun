<template>
	<view class="page cashOut">
		<view class="cashOut_title">
			<image src="../../static/zhye.png" class="title_icon"></image>
			我的余额
		</view>
		<input class="uni-input money_ipt" type="digit" focus/>
		<view class="can_cashOut">可提余额1.00元</view>
		<view class="btn submit">提交</view>
		<view class="btn goRecord" @click="goRecord">明细记录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goRecord() {
				uni.navigateTo({
					url:'../cashOutRecord/cashOutRecord'
				})
			}
		}
	}
</script>

<style>
	.cashOut{
		padding: 50upx 30upx;
		box-sizing: border-box;
	}
	.cashOut_title{
		font-size: 24upx;
		color: #676767;
		display: flex;
		align-items: center;
	}
	.title_icon{
		width: 34upx;
		height: 34upx;
		margin-left: 30upx;
		margin-right: 10upx;
	}
	.money_ipt{
		border-bottom: solid 1px #139CFF;
		width: 100%;
		height: 100upx;
		font-size: 72upx;
		color: #139CFF;
		margin-top: 40upx;
	}
	.can_cashOut{
		font-size: 24upx;
		color: #676767;
		margin-left: 30upx;
		margin-top: 30upx;
		margin-bottom: 40upx;
	}
	.btn{
		font-size: 24upx;
		margin: 0 auto;
		margin-bottom: 40upx;
		width: 214upx;
		height: 63upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30px;
	}
	.submit{
		color: white;
		background: #139cff;
	}
	.goRecord{
		color: #139cff;
		background: white;
		border: solid 2px #eee;
	}
</style>
