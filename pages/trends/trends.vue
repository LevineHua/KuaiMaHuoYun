<template>
	<view class="page">
		<view class="trends" v-for="nl in newList" :key="nl.id" @click="newsInfo(nl.id)">
			<view class="trends_info">
				<view class="trends_dot"></view>
				<view class="info">
					<view class="info_title">{{nl.title}}</view>
					<view class="info_time">{{nl.create_time | filterTime}}</view>
				</view>
			</view>
			<view class="trends_see">
				<image class="see_icon" src="../../static/return.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	export default {
		data() {
			return {
				newList:[],
				page:0,
				page_count:0
			}
		},
		onLoad() {
			this.loadMore(this.page);
		},
		onReachBottom() {
			console.log('down');
			this.loadMore(this.page=this.page+1,1);
		},
		filters:{
			filterTime: function(value){
				return util.formatTime(value)
			}
		},
		methods: {
			newsInfo(id) {
				uni.navigateTo({
					url: '../trend_info/trend_info?id='+id
				})
			},
			loadMore(page,isLoad=0){
				console.log(page);
				var _this = this;
				if(isLoad==0 || page<this.page_count){
					uni.showLoading({
						title:"加载中...",
						mask:true
					})
					uni.request({
						url:_this.serverURL + 'home/index/get_new_list',
						method:'POST',
						data:{
							category:1,
							page_num:page
						},
						success(res) {
							console.log(res);
							uni.hideLoading();
							if(res.data.code==100){
								if(isLoad==0){
									_this.newList = res.data.list;
									_this.page_count = res.data.count_page;
								} else {
									_this.newList.push.apply(_this.newList,res.data.list);
								}
							}
						},
						fail(error) {
							console.log(error)
						}
					})
				}
			}
		}
	}
</script>

<style>
	.trends{
		border-bottom: solid 1px #EEEEEE;
		height: 128upx;
		padding: 20upx 20upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	.trends_info{
		display: flex;
		justify-content: flex-start;
		align-items: baseline;
	}
	.trends_dot{
		background: #139CFF;
		width: 14upx;
		height: 14upx;
		border-radius: 50%;
		margin-right: 30upx;
	}
	.info{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	.info_title{
		font-size: 24upx;
		color: #646464;
	}
	.info_time{
		color: #b2b2b2;
		font-size: 18upx;
	}
	.trends_see{
		height: 100%;
		align-items: center;
		display: flex;
	}
	.see_icon{
		width: 32upx;
		height: 32upx;
	}
</style>
