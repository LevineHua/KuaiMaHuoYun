<template>
	<view class="km_select" @click="goPage(navigateTo)" :class="{errorRed:error==1}">
		<view class="select_title">
			<image class="select_icon" v-if="hasIcon==1" :src="icon"></image>
			{{title}}
		</view>
		<view class="address_city">
			{{text}}
			<image class="select_right" src="../static/right.png"></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"km-select",
		props:{
			"title":{
				default:''
			},
			"icon":{
				default:''
			},
			"navigateTo":{
				default:''
			},
			"text":{
				default:''
			},
			"error":{
				default:0
			},
			"hasIcon":{
				default:0
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			goPage(link){
				uni.navigateTo({
					url:link
				})
			}
		}
	}
</script>

<style>
	.km_select{
		width: 100%;
		height: 83upx;
		border-radius: 30px;
		border: solid 1px #d7d7d7;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #139cff;
		font-size: 24upx;
		padding: 20upx;
		padding-right: 40upx;
		box-sizing: border-box;
		margin: 50upx 0;
	}
	.select_title{
		display: flex;
		align-items: center;
	}
	.select_icon{
		width: 28upx;
		height: 28upx;
		margin-right: 25upx;
	}
	.select_right{
		width: 18upx;
		height: 35upx;
		margin-left: 20upx;
	}
	.address_city{
		display: flex;
		align-items: center;
	}
	.km_select.errorRed{
		border-color: red;
	}
</style>
