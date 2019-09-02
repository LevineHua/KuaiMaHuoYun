<template>
	<view class="km_title">
		{{title}}
		<view class="title_dot"></view>
	</view>
</template>

<script>
	export default {
		name:"km-title",
		props:["title"],
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.km_title{
		width: 100%;
		height: 37upx;
		font-size: 24upx;
		border-left: 4upx solid #139cff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 20upx;
		color: #139cff;
		box-sizing: border-box;
		margin: 20upx 0;
	}
	.title_dot{
		width: 8upx;
		height: 8upx;
		background: #139cff;
		border-radius: 50%;
	}
</style>
