<template>
	<view class="page orderInfo_page">
		<view class="order_address">
			<image class="address_icon" src="../../static/address3.png"></image>
			{{order.start_delivery[0]}}
			<image class="line_icon" src="../../static/address_line.png"></image>
			{{order.end_delivery[0]}}
		</view>
		<view class="order_info">
			<kmLi title="出发地点" :content="order.start_delivery[1]" isHide="true" :status="status"></kmLi>
			<kmLi title="目的地" :content="order.end_delivery[1]" isHide="true" :status="status"></kmLi>
			<kmLi title="车辆需求" :content="order.vehicle_msg"></kmLi>
			<kmLi title="需要车辆" :content="order.car_num+'辆'"></kmLi>
			<kmLi title="装货时间" :content="order.start_time" isDate="true"></kmLi>
			<kmLi title="装载货物" :content="order.transportation_name"></kmLi>
			<kmLi title="装载吨位" :content="order.transportation_weight+'吨'"></kmLi>
			<kmLi title="雇佣价格" :content="order.money+'元/吨'"></kmLi>
			<kmLi title="联系人" :content="order.username" :status="status"></kmLi>
			<kmLi title="联系电话" :content="order.mobile" isHide="true" isCall="true" :status="status"></kmLi>
			<kmLi title="订单备注" :content="order.remarks"></kmLi>
			<template v-if="status==3 || status==7">	<!-- 0 -->
				<template v-if="cutId==0">
					<view class="select_yhq" @click="selectYhq">
						选择优惠券
						<image class='right_icon' src='../../static/right.png'></image>
					</view>
				</template>
				<template v-if="cutId!=0">
					<view class="select_yhq" @click="selectYhq">
						{{'-'+cutMoney}}
						<image class='right_icon' src='../../static/right.png'></image>
					</view>
				</template>
			</template>
			<template v-if="status!=1 && status!=7">	<!-- 0 -->
				<kmLi title="优惠券" :content="'-'+cutMoney"></kmLi>
			</template>
			<view class="photo_li" v-if="uploadPhoenStep>1">
				<view class="photo_li_title">出厂过磅照片：</view>
				<image :src="link+outPhoto" class='photo_li_img' mode="aspectFit"></image>
			</view>
			<view class="photo_li" v-if="uploadPhoenStep>2">
				<view class="photo_li_title">入厂过磅照片：</view>
				<image :src="link+inPhoto" class='photo_li_img' mode="aspectFit"></image>
			</view>
			<template v-if="status==4 && uploadPhoenStep!=3">	<!-- 3 -->
				<view class="upload_li">
					<view class="upload_img" @click="uploadImg">
						<image :src="uploadPhoto" class='upload_photo'></image>
					</view>
					<view class="upload_btn">
						<view class="againBtn" @click="uploadImg">上传照片</view>
					</view>
				</view>
			</template>
		</view>
		<view class="order_footer">
			<template v-if="status==0">
				<view class="order_status">等待货主确认</view>
				<view class="callShipper" @click="togglePopup('cancelOrder')">取消订单</view>
			</template>
			<template v-if="status==1">	<!-- 0 -->
				<view class="select_car_num">
					<!-- 选择车辆
					<uni-number-box :min="1" :max="5" @change="changeCar" :value="carNum"></uni-number-box> -->
				</view>
				<!-- <view class="callShipper" @click="togglePopup('carShipper')">联系货主</view> -->
				<view class="callShipper" @click="takeToken">接单</view>
			</template>
			<!-- <template v-if="status==3 || status==5">
				<view class="order_status">等待货主确认</view>
				<view class="callShipper" :class="{disableBtn:status==5}" @click="goAppeal">去申诉</view>
			</template> -->
			<template v-if="status==4">	<!-- 3 -->
				<template v-if="uploadPhoenStep==1">
					<view class="order_status">请上传出厂过磅照片</view>
					<view class="callShipper disableBtn" :class="{upload_success:uploadSuccess==1}" @click="nextStep(2)">下一步</view>
				</template>
				<template v-if="uploadPhoenStep==2">
					<view class="order_status">请上传入厂过磅照片</view>
					<view class="callShipper disableBtn" :class="{upload_success:uploadSuccess==1}" @click="nextStep(3)">订单完成</view>
				</template>
				<template v-if="uploadPhoenStep==3">
					<view class="order_status">等待货主确认</view>
					<view class="callShipper disableBtn">订单完成</view>
				</template>
			</template>
			<!-- <template v-if="status==4 && inPhoto!=null">
				<view class="order_status">等待货主确认</view>
				<view class="callShipper">订单完成</view>
			</template> -->
			<template v-if="status==7">
				<view class="callShipper" @click="togglePopup('cancelOrder')" style="width: 50%;border-right: solid 1px white;">取消订单</view>
				<view class="callShipper" @click="togglePopup('carShipper')" style="width: 50%;">支付订单</view>
			</template>
			<template v-if="status==6">
				<view class="order_status">订单已支付</view>
				<view class="callShipper" @click="go()">出发装货</view>
			</template>
			<template v-if="status==2">
				<view class="order_status">你已拒绝该订单</view>
			</template>
		</view>
		
		<uni-popup :show="type === 'carShipper'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="km_pop">
				<view class="needMoney">{{(lookInfoNeedMoney-cutMoney) | filterMath}}￥</view>
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
		</uni-popup>
		
		<uni-popup :show="type === 'cancelOrder'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="km_pop">
				<view class="needMoney" style="font-size: 28upx;color: #333;">确定取消订单吗？</view>
				<!-- <view class="isAgree">
					<checkbox-group @change="checkboxChange">
						<label><checkbox value="agree" color="#139CFF" />同意<navigator class="pop_nav" url="">支付注意事项，以及金额退回处理方法</navigator></label>
					</checkbox-group>
				</view> -->
			</view>
			<view class="pop_btns">
				<view class="pop_btn cancle_btn" @click="togglePopup('')">取消</view>
				<view class="pop_btn sure_btn sure_isAgree" @click="sureCancel">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import kmLi from '../../components/km-li.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				carNum:'1',
				url:'',
				link:'',
				userinfo:'',
				user_id:0,
				type: '',
				isAgree:'',
				status:5,	// 0:审核中；1:未接单；2：拒绝；3:待确定；4：运输中（出货）；5：已完成（收货）；6 已支付；7：待支付 //0:未接单；1:待确认；2：已退款；3：运输中；4：已完成；5：申诉中
				lookInfoNeedMoney:100,
				cutId:0,
				cutMoney:0,
				uploadPhoenStep:1,	//上传过磅照片步骤，1：上传出厂过磅照片；2：上传入厂过磅照片；3：订单等待确认
				uploadPhoto:'',
				uploadSuccess:0,
				outPhoto:'',
				inPhoto:'',
				orderId:'',
				order:''
			}
		},
		components: {
			uniNumberBox,
			kmLi,
			uniPopup
		},
		filters:{
			filterMath(value) {
				/* return Number(value.toString().match(/^\d+(?:\.\d{0,2})?/)); */
				return Math.round(value*100)/100
			}
		},
		onLoad(e) {
			var _this = this;
			
			this.userinfo = uni.getStorageSync('userinfo');
			this.user_id  = this.userinfo.user_id;
			
			console.log(e.status);
			this.status = e.status;
			this.orderId = e.orderId;
			console.log(e.orderId)
			uni.removeStorage({
				key:'cutMoney',
				success() {
					
				}
			})
			this.url = this.serverURL;
			this.link = this.href;
			
			/* if(this.status==1){
				uni.request({
					url: this.url + 'home/index/get_transportation_order',
					method:'POST',
					data:{
						tid: _this.orderId
					},
					success(res) {
						console.log(res);
						if(res.data.code==100){
							var order = res.data.list;
							_this.order = order;
							_this.status = order.status;
						}
					},
					fail(error) {
						console.log(error)
					}
				})
			} else {
				uni.request({
					url: this.url + 'home/user/user_order_id',
					method:'POST',
					data:{
						id: _this.orderId
					},
					success(res) {
						console.log(res);
						if(res.data.code==100){
							var order = res.data.msg;
							_this.order = order;
							_this.outPhoto = order.start_image_url;
							_this.inPhoto = order.end_image_url;
							if(_this.outPhoto!=null && _this.inPhoto==null){
								_this.uploadPhoenStep = 2;
							} else if(_this.inPhoto!=null) {
								_this.uploadPhoenStep = 3;
							}
							
							_this.status = order.status;
							if(order.coupon_money!=null){
								_this.cutMoney = order.coupon_money;
							}
							_this.lookInfoNeedMoney = order.total_fee;
						}
					},
					fail(error) {
						console.log(error)
					}
				})
			} */
			
		},
		onShow() {
			var _this = this;
			uni.getStorage({
				key:'cutMoney',
				success(res) {
					console.log(res.data);
					_this.cutMoney = res.data.money;
					_this.cutId = res.data.id;
				}
			})
			
			if(this.status==1){
				uni.request({
					url: this.url + 'home/index/get_transportation_order',
					method:'POST',
					data:{
						tid: _this.orderId
					},
					success(res) {
						console.log(res);
						if(res.data.code==100){
							var order = res.data.list;
							_this.order = order;
							_this.status = order.status;
						}
					},
					fail(error) {
						console.log(error)
					}
				})
			} else {
				uni.request({
					url: this.url + 'home/user/user_order_id',
					method:'POST',
					data:{
						id: _this.orderId
					},
					success(res) {
						//console.log(res);
						if(res.data.code==100){
							var order = res.data.msg;
							_this.order = order;
							_this.outPhoto = order.start_image_url;
							_this.inPhoto = order.end_image_url;
							if(_this.outPhoto!=null && _this.inPhoto==null){
								_this.uploadPhoenStep = 2;
							} else if(_this.inPhoto!=null) {
								_this.uploadPhoenStep = 3;
							}
							
							_this.status = order.states;
							
							if(_this.status==7){
								uni.showModal({
									title:'提示',
									content:'订单已确认，是否立即支付？',
									success(res) {
										if(res.confirm){
											_this.togglePopup("carShipper");
										}
									}
								})
							}
							
							if(order.coupon_money!=null){
								_this.cutMoney = order.coupon_money;
							}
							_this.lookInfoNeedMoney = order.total_fee;
						}
					},
					fail(error) {
						console.log(error)
					}
				})
			}
			
		},
		methods: {
			takeToken() {	//接单
				var _this = this;
				
				uni.request({
					url: this.url + 'home/Order/driver_add_order',
					method:'POST',
					data:{
						user_id: _this.user_id,
						tran_id: _this.orderId
					},
					success(res) {
						console.log(res);
						if(res.data.code==100){
							uni.showModal({
								content: "接单成功，请耐心等待货主确认。",
								confirmText: "确定",
								showCancel:false
							})
						} else if(res.data.code==200) {
							uni.showToast({
								title:"等待货主确认中，请不要重复接单",
								mask:true,
								icon:"none",
								duration:2000
							})
						}
					},
					fail(error) {
						console.log(error)
					}
				})
				
			},
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
				if(this.isAgree == "agree"){
					//支付
					uni.showLoading({
						title:'请求支付中...',
						mask:true
					})
					var _this = this;
					this.togglePopup('');
					
					uni.request({
						url: this.url + 'home/wxpay/wx_pay',
						method:'POST',
						data:{
							user_id: _this.user_id,
							user_order_id: _this.orderId,
							coupon_id:_this.cutId
						},
						success(res) {
							console.log(res);
							if(res.data.code==100){
								uni.hideLoading();
								var data = res.data.msg;
								uni.requestPayment({
									provider:"wxpay",
									timeStamp:data.timeStamp.toString(),
									/* timeStamp:new Date().getTime().toString(), */
									nonceStr:data.nonceStr,
									package:data.package,
									signType:data.signType,
									paySign:data.paySign,
									success(paySuccess){
										console.log(paySuccess);
										_this.status = 6;
										uni.showToast({
											title:'支付成功',
											icon:"success",
											mask:true
										})
										uni.request({
											url: _this.url + 'home/Order/update_transportation_order',
											method:'POST',
											data:{
												id: _this.orderId,
												states: 6
											},
											success(res) {
												console.log(res);
												/* if(res.data.code==100){
													uni.hideLoading();
													_this.status = 4;
													_this.uploadPhoenStep = step;
													_this.uploadSuccess = 0;
													_this.uploadPhoto = '';
													uni.showToast({
														title:'修改成功',
														icon:"success",
														mask:true
													})
												} */
											},
											fail(error) {
												console.log(error);
											}
										})
									},
									fail(payError) {
										console.log(payError);
										uni.showToast({
											title:"支付失败",
											icon:"none",
											mask:true
										})
									}
								});
							}
						},
						fail(error) {
							console.log(error)
						}
					})
					
				}
			},
			selectYhq() {
				uni.navigateTo({
					url:'../selectCoupon/selectCoupon'
				})
			},
			goAppeal(){
				if(this.status!=5){	//5
					uni.navigateTo({
						url:'../appeal/appeal'
					})
				}
			},
			nextStep(step) {
				var _this = this;
				if(_this.uploadSuccess==1){
					uni.showLoading({
						title:'修改中...',
						mask:true
					})
					uni.getLocation({
						success: function (res) {
							console.log(res);
							var let_lon = res.longitude+','+res.latitude;
							console.log(let_lon);
							if(step==2){
								uni.request({
									url: _this.url + 'home/Order/update_transportation_order',
									method:'POST',
									data:{
										id: _this.orderId,
										states: 4,
										start_image_url :_this.outPhoto,
										let_lon: let_lon
									},
									success(res) {
										console.log(res);
										if(res.data.code==100){
											uni.hideLoading();
											_this.status = 4;
											_this.uploadPhoenStep = step;
											_this.uploadSuccess = 0;
											_this.uploadPhoto = '';
											uni.showToast({
												title:'修改成功',
												icon:"success",
												mask:true
											})
										}
									},
									fail(error) {
										console.log(error);
										uni.showToast({
											title:'修改失败',
											icon:"none",
											mask:true
										})
									}
								})
							}else if(step==3){
								uni.request({
									url: _this.url + 'home/Order/update_transportation_order',
									method:'POST',
									data:{
										id: _this.orderId,
										/* states: 5, */
										end_image_url :_this.inPhoto,
										let_lon: let_lon
									},
									success(res) {
										console.log(res);
										if(res.data.code==100){
											uni.hideLoading();
											/* _this.status = 5; */
											_this.uploadPhoenStep = step;
											_this.uploadSuccess = 0;
											_this.uploadPhoto = '';
											uni.showToast({
												title:'修改成功',
												icon:"success",
												mask:true
											})
										}
									},
									fail(error) {
										console.log(error);
										uni.showToast({
											title:'修改失败',
											icon:"none",
											mask:true
										})
									}
								})
							}
						},
						fail(error) {
							console.log(error);
							uni.hideLoading();
						}
					});
					
				}
			},
			uploadImg() {
				var _this = this;
				uni.chooseImage({
					count:1,
					sourceType:["camera"],
					success(res) {
						var imgPath = res.tempFilePaths[0];
						uni.showLoading({
							title: '上传中...'
						});
						uni.uploadFile({
							url: _this.url + 'index/index/uploadImage',
							filePath: imgPath,
							name: 'filePath',
							formData: {
								'uid': _this.userinfo.user_id
							},
							success: (uploadFileRes) => {
								uni.hideLoading();
								if(uploadFileRes.statusCode==200){
									var file = JSON.parse(uploadFileRes.data);
									if(file.code==100){
										_this.uploadSuccess = 1;
										if(_this.uploadPhoenStep==1){
											_this.outPhoto = file.url;
										} else if(_this.uploadPhoenStep==2){
											_this.inPhoto = file.url;
										}
										_this.uploadPhoto = imgPath;
										console.log("上传图片成功");
									}
								}
							},
							fail() {
								console.log('上传失败')
							}
						});
						
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
			go() {	//出发装货
				var _this = this;
				// 修改司机的运单状态
				uni.request({
					url: _this.url + 'home/Order/update_transportation_order',
					method:'POST',
					data:{
						id: _this.orderId,
						states: 4
					},
					success(res) {
						console.log(res);
						if(res.data.code==100){
							_this.status = 4;
						}
					},
					fail(error) {
						console.log(error)
					}
				})
				// 修改货主的运单状态
				uni.request({
					url: _this.url + 'home/release/update_information',
					method:'POST',
					data:{
						id:_this.order.tran_id,
						states: 4
					},
					success(res) {
						console.log(res);
						if(res.data.code==100){
							_this.status = 4;
						}
					},
					fail(error) {
						console.log(error)
					}
				})
			},
			sureCancel() {	//取消订单
				var _this = this;
				// 修改司机的运单状态
				uni.request({
					url: _this.url + 'home/Order/update_transportation_order',
					method:'POST',
					data:{
						id: _this.orderId,
						states: 1
					},
					success(res) {
						console.log(res);
						if(res.data.code==100){
							_this.status = 2;
							uni.showToast({
								title:'你已取消该订单',
								icon:"success",
								mask:true
							});
							_this.togglePopup('');
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
	@import url("orderInfo.css");
</style>
