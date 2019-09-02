<template>
	<view class="page">
		<view class="content_title">{{news.title}}</view>
		<view class="content">
			<uParse :content="news.content" />
			<!-- {{news.content}} -->
		</view>
	</view>
</template>

<script>
	import uParse from '../../components/uParse/src/wxParse.vue'
	export default {
		data() {
			return {
				new_id:0,
				news:{
					content:'   '
				}
			}
		},
		components:{
			uParse
		},
		onLoad(option) {
			this.new_id = option.id;
			var url = this.serverURL;
			var _this = this;
			uni.request({
				url: url + 'home/index/get_new_id',
				method:'POST',
				data:{
					new_id: _this.new_id
				},
				success(data) {
					console.log(data);
					if(data.data.code==100){
						_this.news = data.data.msg;
					}
				},
				fail(error) {
					console.log(error);
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("../../components/uParse/src/wxParse.css");
	.content_title{
		color: #626262;
		font-size: 24upx;
		padding: 20upx 0;
		text-align: center;
	}
	.content{
		color: #787878 ;
		font-size: 18upx;
		padding: 0 30upx;
	}
</style>
