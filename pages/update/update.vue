<template>
	<view class="page">
		<view class="update_item" @click="updateCard">
			身份证修改
			<image src="../../static/update.png" class="update_icon"></image>
		</view>
		<view class="update_item" @click="updateDrivingLicense">
			驾驶证修改
			<image src="../../static/update.png" class="update_icon"></image>
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
			updateCard() {
				uni.navigateTo({
					url:'../uploadCard/uploadCard?type=1'
				})
			},
			updateDrivingLicense() {
				uni.navigateTo({
					url:'../uploadDrivingLicense/uploadDrivingLicense?type=1'
				})
			}
		}
	}
</script>

<style>
	.update_item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 93upx;
		background-color: #ffffff;
		border-bottom: solid 1px #e3e3e3;
		padding: 0 20upx;
		font-size: 24upx;
		color: #626262;
	}
	.update_icon{
		width: 32upx;
		height: 32upx
	}
</style>
