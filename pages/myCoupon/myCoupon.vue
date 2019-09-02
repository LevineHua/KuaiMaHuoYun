<template>
	<view class="page">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''"
			 :id="tab.id" :data-current="index" @click="tapTab">{{tab.name}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" :duration="300" @change="changeTab">
			<swiper-item>
				<scroll-view class="list" scroll-y>
					<view class="yhq_item kyq" v-for="(cl,kyq_index) in couponList" :key="kyq_index" v-if="isOverdue(cl.end_time)==false && cl.states==0">
						<view class="yh_money">￥{{cl.money}}</view>
						<view class="yh_time">使用期限：{{setTime(cl.create_time)}} 至 {{setTime(cl.end_time)}}</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="list" scroll-y>
					<view class="yhq_item gqq" v-for="(cl,gqq_index) in couponList" :key="gqq_index" v-if="isOverdue(cl.end_time) && cl.states==0">
						<view class="yh_money">￥{{cl.money}}</view>
						<view class="yh_time">使用期限：{{setTime(cl.create_time)}} 至 {{setTime(cl.end_time)}}</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import util from '../../common/util.js'
	export default {
		data() {
			return {
				userinfo:'',
				scrollLeft: 0,
				tabIndex: 0,
				tabBars: [{
					name: '可用券',
					id: 'keyongquan'
				}, {
					name: '过期券',
					id: 'guoqiquan'
				}],
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
		computed:{
			
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/template/tabbar/detail/detail?title=' + e.title
				});
			},
			async changeTab(e) {
				let index = e.target.current;
				this.tabIndex = index; //一旦访问data就会出问题
			},
			async tapTab(e) { //点击tab-bar
				let tabIndex = e.target.dataset.current;
				this.tabIndex = tabIndex;
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
	@import url("myCoupon.css");
</style>
