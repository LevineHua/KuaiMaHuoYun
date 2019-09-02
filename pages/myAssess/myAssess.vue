<template>
	<view class="page">
		<view class="assess_item" @click="seeAssess(al)" v-for="(al, aIndex) in assessList" :key="aIndex">
			<view class="assess_info">
				<image class="address_icon" src="../../static/address3.png"></image>
				<view class="assess_address">
					<view class="address">
						{{al.start_delivery[0]}}
						<image src="../../static/address_line.png" class="line_icon"></image>
						{{al.end_delivery[0]}}
					</view>
					<view class="assess_time">{{al.comment_time | filterTime}}</view>
				</view>
			</view>
			<view class="assess_score">
				<template v-for="cn in al.comment_num*1">
					<image :key="cn" src="../../static/grade_active.png" class="grade"></image>
				</template>
			</view>
			<view class="assess_see">
				<image class="see_icon" src="../../static/see.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	export default {
		data() {
			return {
				userinfo:'',
				user_id:0,
				page:0,
				assessList:[],
				page_count:0
			}
		},
		filters:{
			filterTime: function(value){
				return util.formatTime(parseInt(value))
			}
		},
		onReachBottom() {
			console.log('down');
			this.loadMore(this.page=this.page+1,1);
		},
		onLoad() {
			var _this = this;
			this.userinfo = uni.getStorageSync('userinfo');
			this.user_id  = this.userinfo.user_id;
			this.loadMore(this.page);
		},
		methods: {
			seeAssess(assess) {
				uni.navigateTo({
					url:"../assessInfo/assessInfo?assess="+ JSON.stringify(assess)
				})
			},
			loadMore(page,isLoad=0){
				var _this = this;
				if(isLoad==0 || page<this.page_count){
					uni.showLoading({
						title:"加载中...",
						mask:true
					})
					uni.request({
						url: this.serverURL + 'home/user/user_get_comment',
						method:'POST',
						data:{
							id: _this.user_id,
							page_num:page
						},
						success(res) {
							console.log(res);
							uni.hideLoading();
							if(isLoad==0){
								_this.assessList = res.data.list;
								_this.page_count = res.data.count_page;
							} else {
								_this.assessList.push.apply(_this.assessList,res.data.list);
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
	@import url("myAssess.css");
</style>
