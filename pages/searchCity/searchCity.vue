<template>
	<view class="page searchCity">
		<view class="search">
			<image class="search_icon" src="../../static/search.png"></image>
			<input type="text" placeholder="搜索" confirm-type='搜索' @confirm="searchCity" v-model="search" class="search_ipt" :focus="focus" />
		</view>
		<view class="city_item" v-for="(cl, index) in cityList" :key="index" @click="writeAddress" :data-city='cl'>{{cl}}</view>
	</view>
</template>

<script>
	import QQMapWX from '../../common/qqmap-wx-jssdk.min.js'
	import Citys from '../../components/ss-select-city/citys.js'
	export default {
		data() {
			return {
				focus:false,
				cityType:'',
				search:'',
				qqMapWX:'',
				cityList:[],
				citys:Citys
			}
		},
		onLoad(e) {
			this.search = e.search;
			this.cityType = e.type;
			var _this = this;
			_this.searchCity(_this.search);
		},
		methods: {
			searchCity(search) {
				var _this = this;
				this.cityList = [];
				
				for(var i=0;i<_this.citys.length;i++){
					var arr = fuzzyQuery(_this.citys[i].list,_this.search);
					_this.cityList.push.apply(_this.cityList,arr);
				}
				function fuzzyQuery(list, keyWord) {
					var reg =  new RegExp(keyWord);
					var arr = [];
					for (var i = 0; i < list.length; i++) {
						if (reg.test(list[i])) {
							arr.push(list[i]);
						}
					}
					return arr;
				 }
				
				//存储搜索城市历史记录
				var searchHistory = uni.getStorageSync("searchHistory");
				if(search!=''){
					if(searchHistory==''){
						var list = [];
						list.unshift(_this.search);
						uni.setStorageSync("searchHistory",list);
					} else {
						var has = 0;
						for(var i=0;i<searchHistory.length;i++){
							if(searchHistory[i]==_this.search){
								has=1;
								break;
							}
						}
						if(has==0){
							searchHistory.unshift(_this.search);
						}
						uni.setStorageSync("searchHistory",searchHistory);
					}
					console.log(searchHistory);
				}
			},
			writeAddress(e) {
				var city = e.currentTarget.dataset.city.replace('市','');
				uni.redirectTo({
					url:'../writeAddress/writeAddress?city='+city+'&type='+this.cityType
				})
			}
		}
	}
</script>

<style>
	.searchCity{
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.search{
		width: 100%;
		height: 70upx;
		background: rgb(239, 239, 239);
		border-radius: 30px;
		margin: 20upx 0;
		display: flex;
		align-items: center;
		position: relative;
	}
	.search_ipt{
		padding-left: 100upx;
		width: 100%;
		height: 100%;
		border-radius: 30px;
		color: #6e6e6e;
		font-size: 24upx;
	}
	.search_icon{
		width: 36upx;
		height: 36upx;
		position: absolute;
		left: 40upx;
	}
	.city_item{
		height: 79upx;
		display: flex;
		align-items: center;
		font-size: 24upx;
		color: #626262;
		border-bottom: solid 1px #e3e3e3;
	}
</style>
