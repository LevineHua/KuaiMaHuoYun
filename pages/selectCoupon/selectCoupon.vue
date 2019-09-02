<template>
	<view class="page">
		<view class="yhq_list">
			<view class="yhq_item kyq" v-for="cs in couponList" :key="cs.id" 
				@click="selectCoupon(cs.id,cs.money)"  
				v-if="isOverdue(cs.end_time)==false && cs.states==0">
				<view class="yh_money">￥{{cs.money}}</view>
				<view class="yh_time">使用期限：{{setTime(cs.create_time)}} 至 {{setTime(cs.end_time)}}</view>
				<template v-if="cs.id==selected">
					<image src="../../static/selected.png" class="selected_icon"></image>
				</template>
			</view>
		</view>
		<view class="footer_btn" @click="selectCoupon(0,0)">不使用优惠券</view>
	</view>
</template>

<script>
	import util from '../../common/util.js'
	export default {
		data() {
			return {
				selected:0,
				cutMoney:0,
				userinfo:'',
				couponList:[]
			}
		},
		onLoad() {
			uni.showLoading({
				title:'加载中...',
				mask:true	
			})
			this.userinfo = uni.getStorageSync('userinfo');
			var user_id = this.userinfo.user_id;
			var url = this.serverURL;
			var _this = this;
			uni.request({
				url: url + 'home/user/get_user_coupon',
				method:'POST',
				data:{
					user_id: user_id
				},
				success(res) {
					console.log(res)
					if(res.data.code==100){
						_this.couponList = res.data.msg;
						uni.hideLoading();
					}
				},
				fail(res) {
					console.log(res);
				}
			})
		},
		methods: {
			selectCoupon(id,money) {
				var _this = this;
				_this.selected = id;
				//_this.cutMoney = money;
				_this.cutMoney = {
					id:id,
					money:money
				};
				uni.setStorage({
					key:"cutMoney",
					data:_this.cutMoney,
					success() {
						console.log('存储成功')
					}
				})
				if(id==0){
					uni.navigateBack();
				}
				
			},
			isOverdue(time) {
				return util.isOverdue(time);
			},
			setTime(time) {
				return util.formatTime(time);
			}
		}
	}
</script>

<style>
	@import url("selectCoupon.css");
</style>
