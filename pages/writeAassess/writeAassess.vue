<template>
	<view class="page writeAssess">
		<view class="success">
			<image src="../../static/order_success.png" class="success_icon"></image>
		</view>
		<view class="success_title">订单完成给个评论被？</view>
		<view class="car_user">
			<image src="../../static/picture_img2.png" class="car_user_picture"></image>
			司机：{{name}}
		</view>
		<view class="grades">
			<template v-for="g in grade">
				<image :key="g" src="../../static/grade_active.png" class='grade_item' @click="settGrade(g+1)"></image>
			</template>
			<template v-for="n in 5-grade">
				<image :key="n" src="../../static/grade.png" class='grade_item' @click="settGrade(grade+n+1)"></image>
			</template>
		</view>
		<view class="assess_title">反馈</view>
		<textarea class="assess" v-model="message" placeholder="请输入您的反馈"></textarea>
		<view class="btn goOrder" @click="write">完成评论</view>
		<view class="btn goHome" @click="goHome">返回首页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				grade:0,
				message:'',
				url:'',
				orderId:0,
				order:'',
				name:''
			}
		},
		onLoad(e) {
			var _this = this;
			this.orderId = e.orderId;
			this.url = this.serverURL;
			this.name = e.name;
		},
		methods: {
			settGrade(num) {
				this.grade = num;
			},
			goHome() {
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			write() {
				var _this = this;
				uni.showLoading({
					title:'评论中...',
					mask:true
				})
				uni.request({
					url: _this.url + 'home/Order/update_transportation_order',
					method:'POST',
					data:{
						id: _this.orderId,
						comment_num: _this.grade,
						comment_msg:_this.message
					},
					success(res) {
						console.log(res);
						if(res.data.code==100){
							uni.hideLoading();
							uni.showToast({
								title:'评论完成',
								icon:"success",
								mask:true
							});
							setTimeout(function(){
								uni.navigateBack();
							},1500)
						}
					},
					fail(error) {
						console.log(error);
						uni.showToast({
							title:'评论失败',
							icon:"none",
							mask:true
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import url("writeAssess.css");
</style>
