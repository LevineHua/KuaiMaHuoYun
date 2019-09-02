<template>
	<view class="page orderInfo_page">
		<view class="order_address">
			<image class="address_icon" src="../../static/address3.png"></image>
			{{order.start_delivery[0]}}
			<image class="line_icon" src="../../static/address_line.png"></image>
			{{order.end_delivery[0]}}
		</view>
		<view class="order_info">
			<kmLi title="出发地点" :content="order.start_delivery[1]"></kmLi>
			<kmLi title="目的地" :content="order.end_delivery[1]"></kmLi>
			<kmLi title="车辆需求" :content="order.vehicle_msg"></kmLi>
			<kmLi title="需要车辆" :content="order.car_num+'辆'"></kmLi>
			<kmLi title="装货时间" :content="order.start_time" isDate="true"></kmLi>
			<kmLi title="装载货物" :content="order.transportation_name"></kmLi>
			<kmLi title="装载吨位" :content="order.transportation_weight"></kmLi>
			<kmLi title="雇佣价格" :content="order.money+'元/吨'"></kmLi>
			<kmLi title="联系人" :content="order.username"></kmLi>
			<kmLi title="联系电话" :content="order.mobile" isCall="true" :status='status' isHide="true" ></kmLi>
			<kmLi title="车主车型" :content="order.car_dateil_type"></kmLi>
			<kmLi title="车主车牌" :content="order.car_dateil_num"></kmLi>
			<kmLi title="订单备注" :content="order.remarks"></kmLi>
			<!-- <template v-if="cutMoney==0">
				<view class="select_yhq" @click="selectYhq">
					选择优惠券
					<image class='right_icon' src='../../static/right.png'></image>
				</view>
			</template>
			<template v-if="cutMoney!=0">
				<view class="select_yhq" @click="selectYhq">
					{{cutMoney}}
					<image class='right_icon' src='../../static/right.png'></image>
				</view>
			</template> -->
			<!-- <template v-if="status!=0">
				<kmLi title="优惠券" content="-5"></kmLi>
			</template> -->
			<!-- <view class="photo_li" v-if="uploadPhoenStep>1">
				<view class="photo_li_title">出厂过磅照片：</view>
				<image :src="outPhoto" class='photo_li_img' mode="aspectFit"></image>
			</view>
			<view class="photo_li" v-if="uploadPhoenStep>2">
				<view class="photo_li_title">入厂过磅照片：</view>
				<image :src="inPhoto" class='photo_li_img' mode="aspectFit"></image>
			</view>
			<template v-if="status==3 && uploadPhoenStep!=3">
				<view class="upload_li">
					<view class="upload_img" @click="uploadImg">
						<image :src="uploadPhoto" class='upload_photo'></image>
					</view>
					<view class="upload_btn">
						<view class="againBtn" @click="uploadImg">重新上传</view>
					</view>
				</view>
			</template> -->
		</view>
		<view class="order_footer">
			<template v-if="status==0">
				<view class="order_status">等待确认</view>
				<view class="callShipper" @click="confirmOrder">确认订单</view>
			</template>
			<template v-if="status!=0">
				<view class="order_status">订单已确认</view>
				<view class="callShipper disableBtn">已确认</view>
			</template>
			
		</view>
		
		<!-- <uni-popup :show="type === 'carShipper'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="km_pop">
				<view class="needMoney">{{lookInfoNeedMoney}}￥</view>
				<view class="isAgree">
					<checkbox-group @change="checkboxChange">
						<label><checkbox value="agree" color="#139CFF" />同意<navigator class="pop_nav" url="">支付注意事项，以及金额退回处理方法</navigator></label>
					</checkbox-group>
				</view>
			</view>
			<view class="pop_btns">
				<view class="pop_btn cancle_btn" @click="togglePopup('')">取消</view>
				<view class="pop_btn sure_btn" :class="{sure_isAgree: isAgree==='agree'}" @click="isSure">确定</view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import kmLi from '../../components/km-li.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				userType:0,		//0表示货主，1表示车主
				carNum:'1',
				type: '',
				isAgree:'',
				status:1,	//1:待确认；2:已确认；
				lookInfoNeedMoney:100,
				cutMoney:0,
				uploadPhoenStep:1,	//上传过磅照片步骤，1：上传出厂过磅照片；2：上传入厂过磅照片；3：订单等待确认
				uploadPhoto:'',
				uploadSuccess:0,
				outPhoto:'',
				inPhoto:'',
				orderId:0,
				url:'',
				order:{}
			}
		},
		components: {
			uniNumberBox,
			kmLi,
			uniPopup
		},
		onLoad(e) {
			var _this = this;
			this.orderId = e.id;
			/* this.status = e.status; */
			this.url = this.serverURL;
			uni.removeStorage({
				key:'cutMoney',
				success() {
					
				}
			});
			
			uni.request({
				url: _this.url + 'home/user/user_order_id',
				method:'POST',
				data:{
					id: _this.orderId
				},
				success(res) {
					console.log(res);
					if(res.data.code==100){
						var order = res.data.msg;
						_this.order = order;
						_this.status = order.states;
					}
				},
				fail(error) {
					console.log(error)
				}
			})
			
			
		},
		onShow() {
			var _this = this;
			uni.getStorage({
				key:'cutMoney',
				success(res) {
					console.log(res.data);
					_this.cutMoney = res.data * (-1);
				}
			})
		},
		methods: {
			changeCar(value) {
				this.carNum = value;
			},
			togglePopup(type) {
				this.type = type;
			},
			checkboxChange(e) {
				if(e.detail.value[0]=="agree"){
					this.isAgree = e.detail.value[0];
				} else {
					this.isAgree ='';
				}
			},
			isSure() {
				this.status = 2;
				if(this.isAgree == "agree"){
					console.log("agree");
				}
			},
			selectYhq() {
				uni.navigateTo({
					url:'../selectCoupon/selectCoupon'
				})
			},
			nextStep(step) {
				var _this = this;
				if(_this.uploadSuccess==1){
					_this.uploadPhoenStep = step;
					_this.uploadSuccess = 0;
					_this.uploadPhoto = '';
				}
			},
			uploadImg() {
				var _this = this;
				uni.chooseImage({
					count:1,
					success(res) {
						var imgPath = res.tempFilePaths[0];
						_this.uploadPhoto = imgPath;
						_this.uploadSuccess = 1;
						if(_this.uploadPhoenStep==1){
							_this.outPhoto = imgPath;
						} else if(_this.uploadPhoenStep==2){
							_this.inPhoto = imgPath;
						}
						console.log("选择图片成功");
					},
					fail() {
						console.log("选择图片失败");
					},
					complete() {
						console.log("选择图片完成");
					}
				})
			},
			confirmOrder() {
				uni.showLoading({
					title:'确认中...',
					mask:true
				})
				var _this = this;
				uni.request({
					url: _this.url + 'home/Order/update_transportation_order',
					method:'POST',
					data:{
						id: _this.orderId,
						states: 7
					},
					success(res) {
						console.log(res);
						uni.hideLoading();
						if(res.data.code==100){
							_this.status = 7;
							uni.showToast({
								title:'确认成功',
								icon:"success",
								mask:true
							})
						}
					},
					fail(error) {
						console.log(error)
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../orderInfo/orderInfo.css");
</style>
