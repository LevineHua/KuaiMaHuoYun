<template>
	<view class="select-car-wrap">
		<view class="car_title" v-if="historyName.length!=0">
			历史记录
			<text class="clear_history" @click="clearHistory">清除</text>
		</view>
		<view class="car_list">
			<view class="car_item car_item_hc" :class="{active: goodsName === hc && selfGoodsName==''}" @click="onSelect(hc)" v-for="(hc,h_index) in historyName" :key="h_index">{{hc}}</view>
		</view>
		
		<view class="car_title">
			货物名称 
		</view>
		<view class="car_list">
			<view class="car_item" :class="{active: goodsName === ct.name && selfGoodsName==''}" @click="onSelect(ct.name)" v-for="(ct,t_index) in carType" :key="t_index">{{ct.name}}</view>
		</view>
		<view class="car_title">
			自定义货物名称 
		</view>
		<view class="self_input">
			<input type="text" class="self_type" v-model="selfGoodsName" :class="{active:selfGoodsName!=''}" placeholder-class="self_pla" placeholder="自定义货物名称" />
		</view>
		
		<view class="select_btn" @click="selected">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyName:'',
				goodsName:'',
				selfGoodsName:'',
				current:'',
				
				carType:'',
				carLength:'',
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
				url: url + 'home/index/get_product_name_list',
				method:'POST',
				success(res) {
					console.log(res);
					if(res.statusCode==200){
						_this.carType = res.data.product_name;
						//_this.carLength = res.data.conductor_list;
						uni.hideLoading();
					}
				}
			})
			//获取历史记录
			var selectNameHistory = uni.getStorageSync("selectNameHistory");
			this.historyName = selectNameHistory;
			
			this.goodsName = uni.getStorageSync("goodsName");
		},
		methods: {
			onSelect(name) {
			  this.goodsName = name;
			  uni.setStorageSync('goodsName', name);
			},
			clearHistory() {
				uni.removeStorageSync("selectNameHistory");
				this.historyName = [];
			},
			selected() {
				var _this = this;
				if(this.selfGoodsName!=''){
					_this.goodsName = _this.selfGoodsName;
					uni.setStorageSync('goodsName', _this.goodsName);
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
		width: 100%;
		height: 60upx;
		border: solid 1px #dcdcdc;
		border-radius:8upx;
		font-size: 24upx;
		padding-left: 10upx;
		box-sizing: border-box;
		text-align: left;
	}
	.self_type.active{
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
