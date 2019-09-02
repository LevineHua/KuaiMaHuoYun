<template>
	<view class="page">
		<view class="my_top">
			<view class="my_info">
				<view class="my_picture">
					<image class="picture" :src="avatarUrl"></image>
				</view>
				<view class="my_name">{{nickname}}</view>
				<view class="census">
					<view class="census_item" @click="goTab(1)">
						<text class="item_status">待确认</text>
						<text class="item_num">{{user.examine}}</text>
					</view>
					<view class="census_item" @click="goTab(2)">
						<text class="item_status">运输中</text>
						<text class="item_num">{{user.transit}}</text>
					</view>
					<view class="census_item" @click="goTab(3)">
						<text class="item_status">已完成</text>
						<text class="item_num">{{user.complete}}</text>
					</view>
				</view>
				<view class="my_menu">
					<template v-for="ms in menus">
						<view class="menu_item" @click="clickMenu(ms.event)" :key="ms.id" v-if="ms.event!='fxlq'">
							<image class="item_icon" :src="ms.icon"></image>
							{{ms.title}}
						</view>
						<button open-type="share" class="menu_item" v-if="ms.event=='fxlq'" :key="ms.id">
							<image class="item_icon" :src="ms.icon"></image>
							{{ms.title}}
						</button>
					</template>
					<view class="menu_item" @click="clickMenu('zlxg')" :key="ms.id" v-if="userinfo.user_identity==1">
						<image class="item_icon" src="../../static/xgzl.png"></image>
						资料修改
					</view>
				</view>
			</view>
		</view>
		<uni-popup :show="type === 'lxpt'" position="bottom" mode="fixed" @hidePopup="clickMenu('')">
			<view class="call_item" @click="makePhoneCall" data-phone='18507009330'>
				18507009330
				<image class="phone_icon" src="../../static/phone.png"></image>
			</view>
			<view class="call_item" @click="clickMenu('')">
				取消
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				type: '',
				menus:[
					/* {"id":"zhye","icon":"../../static/zhye.png","title":"账户余额","event":"zhye"}, */
					{"id":"wdyhq","icon":"../../static/wdyhq.png","title":"我的优惠券","event":"wdyhq"},
					{"id":"wdpj","icon":"../../static/wdpj.png","title":"我的评价","event":"wdpj"},
					{"id":"fxlq","icon":"../../static/fxlq.png","title":"分享领券","event":"fxlq"},
					{"id":"jygz","icon":"../../static/jygz.png","title":"交易规则","event":"jygz"},
					{"id":"mzsm","icon":"../../static/mzsm.png","title":"免责声明","event":"mzsm"},
					{"id":"lxpt","icon":"../../static/lxpt.png","title":"联系平台","event":"lxpt"}
				],
				avatarUrl:'',
				nickname:'',
				userinfo:'',
				user_id:0,
				user:[]
			}
		},
		components:{
			uniPopup
		},
		onLoad() {
			var _this = this;
			var wechar_userinfo = uni.getStorageSync("wx_userInfo");
			this.avatarUrl = wechar_userinfo.avatarUrl;
			this.nickname = wechar_userinfo.nickName;
			
			this.userinfo = uni.getStorageSync('userinfo');
			this.user_id  = this.userinfo.user_id;
			
		},
		onShow() {
			var _this = this;
			
			uni.request({
				url: this.serverURL + 'home/user/user_get_order',
				method:'POST',
				data:{
					id: _this.user_id
				},
				success(res) {
					_this.user = res.data;
				},
				fail(error) {
					console.log(error)
				}
			})
		},
		onShareAppMessage() {
			var _this = this;
			return {
				title: "如期货运",
				path: '/pages/index/index?uid='+_this.user_id,
				imageUrl:'../../static/share.png'
			}
		},
		methods: {
			clickMenu(type) {
				var _this = this;
				if(type=="lxpt"){
					_this.type = type;
					uni.hideTabBar();
				} else if(type==''){
					_this.type = type;
					uni.showTabBar()
				} else if(type=='jygz'){
					uni.navigateTo({
						url:"../TradingRules/TradingRules"
					})
				} else if(type=='wdpj'){
					uni.navigateTo({
						url:"../myAssess/myAssess"
					})
				} else if(type=='wdyhq'){
					uni.navigateTo({
						url:"../myCoupon/myCoupon"
					})
				} else if(type=='zhye'){
					uni.navigateTo({
						url:"../cashOut/cashOut"
					})
				} else if(type=='mzsm'){
					uni.navigateTo({
						url:"../statement/statement"
					})
				} else if(type=="zlxg"){
					uni.navigateTo({
						url:"../update/update"
					})
				}
			},
			makePhoneCall(e) {
				var phone = e.currentTarget.dataset.phone;
				console.log(phone);
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			goTab(index){
				uni.switchTab({
					url:'../order/order?index='+index
				})
			}
		}
	}
</script>

<style>
	@import url("my.css");
</style>
