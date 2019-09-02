<template>
	<view class="page">
		<view class="rules_item" @click="goRulesContent(rs.id)" v-for="rs in rules" :key="rs.id">{{rs.title}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rules:[],
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
		methods: {
			goRulesContent(id) {
				uni.navigateTo({
					url:"../TradingRulesContent/TradingRulesContent?id="+id
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
							category:2,
							page_num:page
						},
						success(res) {
							console.log(res);
							uni.hideLoading();
							if(res.data.code==100){
								if(isLoad==0){
									_this.rules = res.data.list;
									_this.page_count = res.data.count_page;
								} else {
									_this.rules.push.apply(_this.rules,res.data.list);
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
.rules_item{
	height: 93upx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom: solid 1px #EEEEEE;
	color: #626262;
	font-size: 24upx;
	padding: 0 30upx;
}
</style>
