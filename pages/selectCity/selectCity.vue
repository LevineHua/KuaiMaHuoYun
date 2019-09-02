<template>
	<view class="page">
		<ss-select-city 
			:hotCitys="hotCitys" 
			v-model="value" 
			@clearHistory="clearHistory" 
			@on-select="onSelect"
			@position="position"
			@searchCity="searchCity"
			@historyCityt="searchCity"
		></ss-select-city>
	</view>
</template>

<script>
	import QQMapWX from '../../common/qqmap-wx-jssdk.min.js'
	import ssSelectCity from '@/components/ss-select-city/ss-select-city.vue'
	export default {
		data() {
			return {
				hotCitys: [],
				value: '北京',
				cityType:'',
				qqMapWX:''
			}
		},
		components: {
			ssSelectCity
		},
		onLoad(e) {
			var _this = this;
			_this.cityType = e.type;
			
			// 实例化地图API
			_this.qqMapWX = new QQMapWX({
				key: _this.mapKey
			})
			
			//获取当前地址
			_this.position();
		},
		onShow() {
			var _this = this;
			//获取搜索记录
			var searchHistory = uni.getStorageSync("searchHistory");
			_this.hotCitys = searchHistory;
		},
		methods: {
			onSelect(city) {
				console.log(city);
				uni.redirectTo({
					url:'../writeAddress/writeAddress?city='+city+'&type='+this.cityType
				})
			},
			clearHistory(){
				console.log("清空搜索记录");
				uni.removeStorageSync("searchHistory");
				this.hotCitys = [];
			},
			position() {
				var _this = this;
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						console.log(res);
						_this.qqMapWX.reverseGeocoder({
							location:{
								latitude:res.latitude,
								longitude:res.longitude
							},
							success(data){
								console.log(data);
								_this.value = data.result.ad_info.city.replace('市','');
								console.log(_this.value)
							},
							fail(fail){
								console.log(fail)
							},
							complete(){
								console.log('完成');
							}
						})
					}
				})
			},
			searchCity(search) {
				var _this = this;
				//存储搜索城市历史记录
				var searchHistory = uni.getStorageSync("searchHistory");
				if(search!=''){
					if(searchHistory==''){
						var list = [];
						list.unshift(search);
						uni.setStorageSync("searchHistory",list);
						_this.hotCitys = list;
					} else {
						var has = 0;
						for(var i=0;i<searchHistory.length;i++){
							if(searchHistory[i]==search){
								has=1;
								break;
							}
						}
						if(has==0){
							searchHistory.unshift(search);
							_this.hotCitys = searchHistory;
						}
						uni.setStorageSync("searchHistory",searchHistory);
					}
					console.log(searchHistory);
				}
				
				uni.navigateTo({
					url:'../searchCity/searchCity?search='+search+'&type='+this.cityType
				})
			}
		}
	}
</script>

<style>

</style>
