<template>
	<view class="select-car-wrap">
		<view class="car_title" v-if="historyCar!=''">
			历史记录
			<text class="clear_history" @click="clearHistory">清除</text>
		</view>
		<view class="car_list">
			<view class="car_item car_item_hc" :class="{active: current === hc && (selfCT=='' || selfCL=='')}" @click="onSelect(hc)" v-for="(hc,h_index) in historyCar" :key="h_index">{{hc}}</view>
		</view>
		<view class="car_title">
			车型 
		</view>
		<view class="car_list">
			<view class="car_item" :class="{active: currentCT === ct.name && selfCT==''}" @click="onSelectCT(ct.name)" v-for="(ct,t_index) in carType" :key="t_index">{{ct.name}}</view>
			<view class="self_input">
				<!-- <view class="self_input_btn">确定</view> -->
				<input type="text" class="self_type" v-model="selfCT" :class="{active:selfCT!=''}" placeholder-class="self_pla" placeholder="自定义车型" />
			</view>
		</view>
		<view class="car_title">
			车长
		</view>
		<view class="car_list">
			<view class="car_item" :class="{active: currentCL === cl.name && selfCL==''}" @click="onSelectCL(cl.name)" v-for="(cl,l_index) in carLength" :key="l_index">{{cl.name}}</view>
			<view class="self_input">
				<!-- <view class="self_input_btn">确定</view> -->
				<input type="digit" class="self_type" style="padding-right: 44upx;" v-model="selfCL" :class="{active:selfCL!=''}" placeholder-class="self_pla" placeholder="自定义" />
				<view class="input_unit" :class="{active:selfCL!=''}">米</view>
			</view>
		</view>
		
		<view class="select_btn" @click="selected">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyCar:'',
				carType:'',
				carLength:'',
				current:'',
				currentCT:'',
				currentCL:'',
				selfCT:'',
				selfCL:''
			}
		},
		onLoad() {
			uni.showLoading({
				title:'加载中...',
				mask:true
			})
			var url = this.serverURL;
			var _this = this;
			//获取车长/车类型
			uni.request({
				url: url + 'home/index/get_car_type_list',
				method:'POST',
				success(res) {
					console.log(res);
					if(res.statusCode==200){
						_this.carType = res.data.vehicle_list;
						_this.carLength = res.data.conductor_list;
						uni.hideLoading();
					}
				}
			})
			//获取历史记录
			var selectCarHistory = uni.getStorageSync("selectCarHistory");
			this.historyCar = selectCarHistory;
			
			this.current = uni.getStorageSync("current");
			this.currentCT = uni.getStorageSync("currentCT");
			this.currentCL = uni.getStorageSync("currentCL");
			this.selfCT = uni.getStorageSync("selfCT");
			this.selfCL = uni.getStorageSync("selfCL");
		},
		methods: {
			onSelect(car) {
			  this.current = car;
			  uni.setStorageSync('current', car);
			  uni.removeStorageSync('currentCT');
			  uni.removeStorageSync('currentCL');
			  uni.navigateBack();
			},
			onSelectCT(car) {
				this.selfCT=''
				this.currentCT = car;
				uni.setStorageSync('currentCT', car);
				uni.removeStorageSync('current');
				uni.removeStorageSync('selfCT');
			},
			onSelectCL(car) {
				this.selfCL=''
				this.currentCL = car;
				uni.setStorageSync('currentCL', car);
				uni.removeStorageSync('current');
				uni.removeStorageSync('selfCL');
			},
			clearHistory() {
				uni.removeStorageSync("selectCarHistory");
				this.historyCar = '';
			},
			selected() {
				var _this = this;
				if(this.selfCT!=''){
					_this.currentCT = _this.selfCT;
					uni.setStorageSync('currentCT', _this.selfCT);
					uni.setStorageSync('selfCT', _this.selfCT);
					uni.removeStorageSync('current');
				}
				if(this.selfCL!=''){
					_this.currentCL = _this.selfCL;
					uni.setStorageSync('currentCL', _this.selfCL);
					uni.setStorageSync('selfCL', _this.selfCL);
					uni.removeStorageSync('current');
				}
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.select-car-wrap {
		position: relative;
		padding: 0 30upx;
		background-color: #fff;
	}
	.car_title{
		display: flex;
		justify-content: flex-start;
		color: #747474;
		font-size: 24.01upx;
		margin: 28upx 0;
		align-items: center;
	}
	.car_list{
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-right: -36upx;
	}
	.car_item{
		width: 137upx;
		height: 55upx;
		margin-right: 40upx;
		margin-bottom: 20upx;
		line-height: 55upx;
		text-align: center;
		border: 1px solid #dcdcdc;
		border-radius: 6upx;
		color: #626262;
		font-size: 24upx;
	}
	.car_item_hc{
		width: 190upx;
		margin-right: 49upx;
	}
	.car_item.active {
	  background-color: #d5ebff;
	  border-color: #2f9bfe;
	  color: #2f9bfe;
	}
	.self_type{
		width: 137upx;
		height: 60upx;
		border: solid 1px #dcdcdc;
		border-radius:8upx;
		font-size: 24upx;
		/* padding-left: 10upx; */
		box-sizing: border-box;
		text-align: center;
	}
	.self_type.active,.input_unit.active{
		background-color:#d5ebff;
		border-color:#2f9bfe;
		color:#2f9bfe;
	}
	.self_pla{
		font-size: 24upx;
		color: #626262;
	}
	.self_input{
		display: flex;
		position: relative;
	}
	.input_unit{
		position: absolute;
		right: 2upx;
		top: 2upx;
		height: 56upx;
		color: #2f9bfe;
		font-size: 24upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		border-radius:0 8upx 8upx 0;
		padding: 0 10upx;
	}
	.self_input_btn{
		height: 60upx;
		padding: 0 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		background: #139CFF;
		color: white;
		border-radius: 8upx 0 0 8upx;
	}
	.select_btn{
		color: white;
		background: #139CFF;
		width: 200upx;
		height: 63upx;
		font-size: 24upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30px;
		margin: 0 auto;
		margin-top: 150upx;
	}
	.clear_history{
		margin-left: 40upx;
	}
</style>
