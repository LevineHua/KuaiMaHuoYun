<template>
	<view class="page writeAddress">
		<view style="width: 710upx;margin: 0 auto;">
			<kmInput title="联系方式：" inputType='number' :iptValue.sync="phoneNumber"></kmInput>
		</view>
		<textarea class="address_text" v-model="address" placeholder="请填写申诉原因" />
		<view class="select_btn" @click="submitAppeal()">确定</view>
	</view>
</template>

<script>
	import kmInput from '../../components/km-input.vue'
	export default {
		data() {
			return {
				address:'',
				phoneNumber:''
			}
		},
		components:{
			kmInput
		},
		methods: {
			submitAppeal() {
				
			}
		}
	}
</script>

<style>
	.writeAddress{
		padding-top: 10upx;
		box-sizing: border-box;
	}
	.address{
		width: 710upx;
		height: 83upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: solid 1px #D7D7D7;
		border-radius: 30px;
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 20upx;
	}
	.address_info{
		color: #139CFF;
		font-size: 24upx;
		align-items: center;
		display: flex;
	}
	.address_icon{
		height: 32upx;
		width: 28upx;
		margin-right: 20upx;
	}
	.refresh_icon{
		height: 29upx;
		width: 29upx;
	}
	.address_text{
		width: 100%;
		height: 153upx;
		padding: 10upx 20upx;
		box-sizing: border-box;
		border: solid 1px #D7D7D7;
		border-left: none;
		border-right: none;
		font-size: 24upx;
		color: #D7D7D7;
		color: #333;
	}
	.select_btn{
		color: white;
		background: #139CFF;
		width: 312upx;
		height: 63upx;
		font-size: 24upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30px;
		margin: 0 auto;
		margin-top: 40upx;
	}
</style>
