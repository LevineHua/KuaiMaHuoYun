<template>
	<view class="page writeAddress">
		<view class="address" @click="showMulLinkageThreePicker">
			<view class="address_info">
				<image src="../../static/address1.png" class="address_icon"></image>
				{{city}}
			</view>
			<!-- <image src="../../static/refresh.png" class="refresh_icon" @click="refresh"></image> -->
		</view>
		<textarea class="address_text" v-model="address" placeholder="请填写详细地址 如:南昌市奥斯卡大厦B座522 鼎峰互动" />
		<view class="select_btn" @click="submitAddress()">确定</view>
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js';
	export default {
		data() {
			return {
				address:'',
				cityType:'',	//出发城市或目的地城市
				city:'请选择城市',
				themeColor: '#139CFF',
				cityPickerValueDefault: [0, 0, 1],
			}
		},
		components:{
			mpvueCityPicker
		},
		onLoad(e) {
			var _this = this;
			//this.city = e.city;
			this.cityType = e.type;
			if(this.cityType=='setout'){
				var city = uni.getStorageSync("setoutCityInfo");
				var address = uni.getStorageSync("setoutAddressInfo");
				if(city!=''){
					_this.city = city;
					_this.address = address;
				}
			} else if(this.cityType=='end'){
				var city = uni.getStorageSync("endCityInfo");
				var address = uni.getStorageSync("endAddressInfo");
				if(city!=''){
					_this.city = city;
					_this.address = address;
				}
			}
		},
		methods: {
			/* refresh() {
				uni.redirectTo({
					url:'../selectCity/selectCity'
				})
			}, */
			submitAddress() {
				var _this = this;
				if(_this.city=="请选择城市"){
					uni.showToast({
						title:'请选择城市',
						mask:true,
						icon:'none',
						duration:2000
					})
					return;
				}
				if(_this.cityType=='setout'){
					uni.setStorageSync("setoutCityInfo",_this.city);
					uni.setStorageSync("setoutCity",_this.city.split('-')[1]);
					uni.setStorageSync("setoutAddress",_this.city.split('-')[2]+" "+_this.address);
					uni.setStorageSync("setoutAddressInfo",_this.address);
				} else if(_this.cityType=='end'){
					uni.setStorageSync("endCityInfo",_this.city);
					uni.setStorageSync("endCity",_this.city.split('-')[1])
					uni.setStorageSync("endCityAddress",_this.city.split('-')[2]+" "+_this.address);
					uni.setStorageSync("endAddressInfo",_this.address);
				}
				uni.switchTab({
					url:'../index/index'
				})
			},
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.city = e.label;
			},
			onCancel(e) {
				this.city = e.label;
			},
		}
	}
</script>

<style>
	/* .writeAddress{
		padding: 0 30upx;
		box-sizing: border-box;
	} */
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
		font-size: 24upx;
		color: #D7D7D7;
		margin-top: 30upx;
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
