<template>
	<view class="page">
		<view class="record_item">
			<view class="record">
				<view class="recore_title">提现</view>
				<view class="recore_time">2019-04-22 14:07</view>
			</view>
			<view class="record_money">-100.00</view>
		</view>
		<view class="record_item">
			<view class="record">
				<view class="recore_title">提现</view>
				<view class="recore_time">2019-04-22 14:07</view>
			</view>
			<view class="record_money">-100.00</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.record_item{
		padding: 10upx 20upx;
		height: 96upx;
		display: flex;
		justify-content: space-between;
	}
	.record{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.recore_title{
		color: #6b6b6b;
		font-size: 24upx;
	}
	.recore_time{
		color: #a4a4a4;
		font-size: 20upx;
	}
	.record_money{
		display: flex;
		align-items: center;
		color: #6c6c6c;
		font-size: 24upx;
	}
</style>
