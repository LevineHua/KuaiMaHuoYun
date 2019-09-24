<template>
	<view class="page">
		<swiper class="swiper" 
			indicator-dots="true" 
			autoplay="true" 
			interval="5000" 
			indicator-active-color="#75c5ff"
			duration="500"
			current="0"
			circular="true"
		>
			<swiper-item v-for="bl in bannerList" :key="bl.id">
				<image class="banner" :src="'https://cc.jiangxiruqi.com'+bl.image"></image>
			</swiper-item>
		</swiper>
		<view class="select_infos">
			<kmTitle title="请选择地区"></kmTitle>
			<kmSelect title="选择出发地" icon="../static/address1.png" :error="setoutCityIsError" :text='setoutCity' navigateTo="../writeAddress/writeAddress?type=setout"></kmSelect>
			<kmSelect title="选择目的地" icon="../static/address2.png" :error="endCityIsError" :text='endCity' navigateTo="../writeAddress/writeAddress?type=end"></kmSelect>
			<kmTitle title="请选择车辆信息"></kmTitle>
			<kmSelect title="选择车辆信息" icon="../static/car.png" :error="carInfoIsError" :text='carInfo' navigateTo="../selectCar/selectCar"></kmSelect>
			<template v-if="userType==1">
				<view class="select_btn" :class="{select_disable :examine!=1}" @click="searchOrder()">查询</view>
			</template>
			<template v-if="userType==0">
				<kmInput title="填写需要车辆数" @inputBlur="inputBlur" inputType='number' :error="carNumIsError" :iptValue.sync="car_num" unit="辆"></kmInput>
				<kmTitle title="请选择装货时间"></kmTitle>
				<kmSelect title="选择装货时间" icon="../static/time.png" :error="startTimeIsError" :text='start_time' navigateTo="../selectCalendar/selectCalendar"></kmSelect>
				<kmTitle title="请填写货物信息"></kmTitle>
				<!-- <kmInput title="请填写货物名称" @inputBlur="inputBlur" :iptValue.sync="goodsName" :error="goodsNameIsError"></kmInput> -->
				<kmSelect title="请填写货物名称" :hasIcon="0" :error="goodsNameIsError" :text='goodsName' navigateTo="../selectGoodsName/selectGoodsName"></kmSelect>
				<kmInput title="请填写货物重量" @inputBlur="inputBlur" :iptValue.sync="goodsWeight" :error="goodsWeightIsError" inputType="digit" unit="吨"></kmInput>
				<kmTitle title="请填写雇佣价格"></kmTitle>
				<kmInput title="请填写价格单位" @inputBlur="inputBlur" :iptValue.sync="goodsMoney" :error="goodsMoneyIsError" inputType="digit" unit="元/吨"></kmInput>
				<kmInput title="总运费" :iptValue="goodsMoney*goodsWeight" unit="元" :isDisabled="true"></kmInput>
				<kmTitle title="请填写联系人"></kmTitle>
				<kmInput title="请填写联系人姓名" @inputBlur="inputBlur" :iptValue.sync="username" :error="goodsUsernameIsError"></kmInput>
				<textarea class="orderRemarks" placeholder-class="remarks_pla" v-model="orderRemarks" placeholder="请填写订单备注"></textarea>
				<view class="select_btn" @click="releaseOrder()">发布</view>
			</template>
			<view class="select_btn" v-if="uid=='' || uid==null" @click="goLogin">登录</view>
		</view>
		
		<uni-popup :show="type === 'middle-img'" position="middle" mode="insert" @hidePopup="togglePopup('')">
			<view class="uni-center center-box">
				<image class="image" src="/static/yhq.png" />
				<view class="yhq">
					<!-- <image class="yhq_money" src="../../static/yhq_5.png"></image> -->
					{{yhqMoney}}元优惠券
				</view>
			</view>
		</uni-popup>
		
		<uni-popup :show="type === 'middle'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="km_pop">
				选择信息与您绑定信息不符是否继续？
			</view>
			<view class="pop_btns">
				<view class="pop_btn cancle_btn" @click="togglePopup('')">取消</view>
				<view class="pop_btn sure_btn sure_isAgree" @click="isSure">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import QQMapWX from '../../common/qqmap-wx-jssdk.min.js'
	import kmTitle from '../../components/km-title.vue'
	import kmSelect from '../../components/km-select.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import kmInput from '../../components/km-input.vue'
	export default {
		data() {
			return {
				loginCount:0,
				bannerList:[],
				url:'',
				userinfo:'',
				type: '',
				isNewUser:0,
				userType:'',		//0表示货主，1表示车主
				examine:1, 	//0:没有提交认证1  审核通过；2 身份审核未提交；3 驾驶证审核未提交；4 身份证审核拒绝；5 驾驶证审核拒绝；6 身份证审核中；7 驾驶证审核中
				car_num:'',
				goodsName:'',
				goodsWeight:'',
				goodsMoney:'',
				orderRemarks:'',
				setoutCity:'',
				endCity:'',
				carInfo:'',
				start_time:'',
				qqMapWX:'',
				endCityAddress:'',
				setoutAddress:'',
				endCityAddressInfo:'',
				setoutAddressInfo:'',
				start_delivery_lon:'',
				end_delivery_lon:'',
				car_type:'',	//判断司机的车型与选择的车型是否匹配
				yhqMoney:0,
				setoutCityIsError:0,
				endCityIsError:0,
				carInfoIsError:0,
				carNumIsError:0,
				startTimeIsError:0,
				goodsNameIsError:0,
				goodsWeightIsError:0,
				goodsMoneyIsError:0,
				goodsUsernameIsError:0,
				username:'',
				uid:''
			}
		},
		components:{
			kmTitle,
			kmSelect,
			uniPopup,
			kmInput
		},
		onLoad(e) {
			uni.setStorageSync("recommendId",e.uid);
			this.uid = uni.getStorageSync("uid");
			var _this = this;
			var url = _this.serverURL;
			this.url = url;
			uni.showLoading({
				title:'检查中...',
				mask:true
			})
						
			//获取banner
			uni.request({
				url: url + 'home/index/get_banner',
				method: 'POST',
				success(res) {
					console.log(res);
					if(res.data.code==100){
						_this.bannerList = res.data.list;
					}
					uni.hideLoading();
				},
				fail(error) {
					console.log(res);
				}
			})
			
			/* if(_this.isNewUser==1){
				_this.togglePopup('middle-img');
				uni.hideTabBar();
			} */
			this.userinfo = uni.getStorageSync('userinfo');
			this.userType = this.userinfo.user_identity * 1;
			
			_this.clearTemporary();
			
			// 实例化地图API
			_this.qqMapWX = new QQMapWX({
				key: _this.mapKey
			})
			
		},
		onShow() {
			var _this = this;
			var url = this.serverURL;
			
			this.uid = uni.getStorageSync("uid");
			if(this.uid!=null && this.uid!=''){
				uni.request({
					url: url + 'home/user/get_user_information',
					method:'POST',
					data:{
						wxchat_oppid:uni.getStorageSync("openId")
					},
					success(res) {
						if(res.data.code==300){
							uni.redirectTo({
								url:'/pages/login/login?canGetUserInfo=0'
							})
						} else if(res.data.code==100){
							var userinfo = {
								user_id:res.data.user_id,
								user_identity:res.data.user_type
							}
							uni.setStorageSync("car_type",res.data.car_type);
							
							uni.setStorageSync("examine",res.data.examine);
							
							uni.setStorageSync("userinfo",userinfo);
							
							uni.setStorageSync("userType",userinfo);
							
							uni.setStorageSync("loginCount",res.data.login_count);
							
							_this.car_type = res.data.car_type;
							_this.examine = res.data.examine;
							_this.userinfo = uni.getStorageSync('userinfo');
							_this.loginCount = res.data.login_count;;
							_this.userType = res.data.user_type;
							
							if(_this.loginCount==1){
								uni.request({
									url: url + 'home/index/get_user_card_money',
									method: 'POST',
									success(res) {
										console.log(res);
										if(res.data.code==100){
											_this.yhqMoney = res.data.money;
											_this.togglePopup('middle-img');
											uni.hideTabBar();
										}
									},
									fail(error) {
										console.log(res);
									}
								})
							}
						}
					},
					fail(error) {
						console.log(error)
					}
				})
			}
			
			_this.setoutCity = uni.getStorageSync("setoutCity");
			_this.endCity = uni.getStorageSync("endCity");
			_this.start_time = uni.getStorageSync("componentTime") + ' ' + uni.getStorageSync("componentTimeInfo");
			
			_this.setoutAddress = uni.getStorageSync("setoutAddress");
			_this.endCityAddress = uni.getStorageSync("endCityAddress");
			_this.setoutAddressInfo = uni.getStorageSync("setoutAddressInfo");
			_this.endCityAddressInfo = uni.getStorageSync("endAddressInfo");
			
			_this.goodsName = uni.getStorageSync("goodsName");
			
			var current=uni.getStorageSync("current"),
				currentCT=uni.getStorageSync("currentCT"),
				currentCL=uni.getStorageSync("currentCL");
			if(current!=''){
				_this.carInfo = current;
			} else if(currentCT!='' && currentCL!='') {
				_this.carInfo = currentCT+"/"+currentCL;
			} else {
				_this.carInfo = '';
			}
		},
		methods: {
			goLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			searchOrder(){
				var _this = this;
				if(this.examine==1){
					//_this.inputBlur();
					if(_this.setoutCity==''){
						_this.setoutCityIsError = 1;
					} else if(_this.setoutCity!=''){
						_this.setoutCityIsError = 0;
					}
					if(_this.endCity==''){
						_this.endCityIsError = 1;
					} else if(_this.endCity!=''){
						_this.endCityIsError = 0;
					}
					if(_this.carInfo==''){
						_this.carInfoIsError = 1;
					} else if(_this.carInfo!=''){
						_this.carInfoIsError = 0;
					}
					if(_this.setoutCity=='' || _this.endCity=='' || _this.carInfo==''){
						return false;
					} else if(_this.car_type!=_this.carInfo) {
						this.togglePopup('middle');
						uni.hideTabBar();
					} else {
						uni.navigateTo({
							url:"../orderList/orderList?vehicle_msg="+_this.carInfo+"&start_delivery="+_this.setoutCity+"&end_delivery="+_this.endCity
						})
						_this.storageHistoryCarInfo();
					}
					
					_this.clearTemporary();
					
				} else {
					var examine = '';
					var url = '';
					if(this.examine==0){
						examine = "没有提交认证";
						url = '/pages/uploadCard/uploadCard';
					} else if(this.examine==2){
						examine = "身份审核未提交";
						url = '/pages/uploadCard/uploadCard';
					} else if(this.examine==3){
						examine = "驾驶证审核未提交"
						url = '/pages/uploadDrivingLicense/uploadDrivingLicense';
					} else if(this.examine==4){
						examine = "身份审核拒绝";
						url = '/pages/uploadCard/uploadCard';
					} else if(this.examine==5){
						examine = "驾驶证审核拒绝";
						url = '/pages/uploadDrivingLicense/uploadDrivingLicense';
					} else if(this.examine==6){
						examine = "身份审核中"
					} else if(this.examine==7){
						examine = "驾驶证审核中"
					}
					uni.showToast({
						title:examine,
						icon:'none',
						mask:true,
						success() {
							setTimeout(function(){
								uni.navigateTo({
									url:url
								})
							},1500);
						}
					})
				}
			},
			isSure() {
				var _this = this;
				this.togglePopup('');
				uni.navigateTo({
					url:"../orderList/orderList?vehicle_msg="+_this.carInfo+"&start_delivery="+_this.setoutCity+"&end_delivery="+_this.endCity
				})
				this.storageHistoryCarInfo();
				
				_this.clearTemporary();
			},
			togglePopup(type) {
				this.type = type;
				if(type==''){
					uni.showTabBar()
				}
			},
			releaseOrder() {	//货主发布订单
				var _this = this;
				var url = _this.serverURL;
				
				this.inputBlur();
				
				/* if(_this.setoutCity==''){
					uni.showToast({
						title:'出发地城市不能为空',
						icon:'none',
						mask:true
					})
					return false;
				} else if(_this.endCity==''){
					uni.showToast({
						title:'目的地城市不能为空',
						icon:'none',
						mask:true
					})
					return false;
				} else if(_this.endCityAddress==''){
					uni.showToast({
						title:'目的地详细地址不能为空',
						icon:'none',
						mask:true
					})
					return false;
				} else if(_this.setoutAddress==''){
					uni.showToast({
						title:'出发地详细地址不能为空',
						icon:'none',
						mask:true
					})
					return false;
				} else if(_this.carInfo==''){
					uni.showToast({
						title:'车辆信息不能为空',
						icon:'none',
						mask:true
					})
					return false;
				} else if(_this.car_num==''){
					_this.carNumIsError = 1;
					uni.showToast({
						title:'车辆数不能为空',
						icon:'none',
						mask:true
					})
					return false;
				} else if(_this.start_time==''){
					uni.showToast({
						title:'装货时间不能为空',
						icon:'none',
						mask:true
					})
					return false;
				} else if(_this.goodsName==''){
					uni.showToast({
						title:'货物名称不能为空',
						icon:'none',
						mask:true
					})
					return false;
				} else if(_this.goodsWeight==''){
					uni.showToast({
						title:'货物重量不能为空',
						icon:'none',
						mask:true
					})
					return false;
				} else if(_this.goodsMoney==''){
					uni.showToast({
						title:'价格不能为空',
						icon:'none',
						mask:true
					})
					return false;
				} */
				if(_this.setoutCity==''|| _this.endCity=='' || _this.endCityAddressInfo.trim()=='' || _this.setoutAddressInfo.trim()=='' ||_this.carInfo=='' || _this.car_num.trim()=='' || _this.start_time.trim()=='' || _this.goodsName.trim()=='' || _this.goodsWeight.trim()=='' || _this.goodsMoney.trim()=='' || _this.username.trim()==''){
					return false;
				}
				uni.showLoading({
					title: '发布中...'
				});
				_this.qqMapWX.geocoder({
					address: _this.setoutCity+_this.setoutAddress,
					success(res) {
						console.log(res);
						if(res.status==0){
							_this.start_delivery_lon = res.result.location.lng+','+res.result.location.lat;
							
							_this.qqMapWX.geocoder({
								address: _this.endCity+_this.endCityAddress,
								success(data) {
									console.log(data);
									if(data.status==0){
										_this.end_delivery_lon = data.result.location.lng+','+data.result.location.lat;
										
										var sendDate = {
											user_id: _this.uid,	//用户id
											start_delivery: _this.setoutCity+','+_this.setoutAddress,	//出发地
											end_delivery: _this.endCity+','+_this.endCityAddress,	//收货地
											start_delivery_lon: _this.start_delivery_lon,		//出发地经纬度
											end_delivery_lon: _this.end_delivery_lon,		//收货地经纬度
											vehicle_msg: _this.carInfo,		//车辆信息
											car_num: _this.car_num,		//需要车数量
											start_time: _this.start_time,	//装货时间
											transportation_name: _this.goodsName,	//运货名称
											transportation_weight: _this.goodsWeight,	//运货重量
											money: _this.goodsMoney,	//雇佣金额
											username:_this.username,
											remarks: _this.orderRemarks	//备注 
										}
										
										console.log(sendDate);
										
										uni.request({
											url: url + 'home/release/release_information',
											method: 'POST',
											data:sendDate,
											success(res){
												console.log(res);
												if(res.data.code==100){
													uni.hideLoading();
													uni.showToast({
														title:'发布成功',
														icon:'success',
														mask:true,
														success() {
															setTimeout(function(){
																uni.navigateTo({
																	url:'../orderTakerSuccess/orderTakerSuccess?userType=0'
																})
															},1500);
														}
													})
													
													_this.storageHistoryCarInfo();
													
													_this.clearTemporary();
													
													_this.goodsName='';
													_this.car_num='';
													_this.goodsWeight='';
													_this.goodsMoney='';
													_this.orderRemarks='';
													_this.usernaem='';
													
												} else {
													uni.showToast({
														title:'发布失败',
														icon:'none',
														mask:true,
														success() {
															setTimeout(function(){
																uni.navigateTo({
																	url:'../orderTakerSuccess/orderTakerSuccess?userType=0'
																})
															},1500);
														}
													})
												}
												
											},
											fail(error){
												console.log(error);
											}
										})
										
									}
								},
								fail(error){
									console.log(error);
									uni.hideLoading();
									uni.showToast({
										title:'发布失败,地址有误',
										duration:2000,
										icon:'none',
										mask:true
									})
								}
							});
							
						}
					},
					fail(error){
						console.log(error);
						uni.hideLoading();
						uni.showToast({
							title:'发布失败,地址有误',
							icon:'none',
							duration:2000,
							mask:true
						})
					}
				})
				
			},
			storageHistoryCarInfo() {
				var _this = this;
				//存储选择车型历史记录
				var selectCarHistory = uni.getStorageSync("selectCarHistory");
				var selectNameHistory = uni.getStorageSync("selectNameHistory");
				if(_this.carInfo!=''){
					if(selectCarHistory==''){
						var list = [];
						list.push(_this.carInfo);
						uni.setStorageSync("selectCarHistory",list);
					} else {
						var has = 0;
						for(var i=0;i<selectCarHistory.length;i++){
							if(selectCarHistory[i]==_this.carInfo){
								has=1;
								break;
							}
						}
						if(has==0){
							selectCarHistory.push(_this.carInfo);
						}
						uni.setStorageSync("selectCarHistory",selectCarHistory);
					}
					console.log(selectCarHistory);
				}
				
				if(selectNameHistory==''){
					var list2 = [];
					list2.push(_this.goodsName);
					uni.setStorageSync("selectNameHistory",list2);
				} else {
					var has = 0;
					for(var i=0;i<selectNameHistory.length;i++){
						if(selectNameHistory[i]==_this.goodsName){
							has=1;
							break;
						}
					}
					if(has==0){
						selectNameHistory.push(_this.goodsName);
					}
					uni.setStorageSync("selectNameHistory",selectNameHistory);
				}
			},
			clearTemporary(){	//清除临时信息
				//清除选择车型临时记录
				/* uni.removeStorageSync('current');
				uni.removeStorageSync('currentCT');
				uni.removeStorageSync('currentCL');
				
				uni.removeStorageSync('setoutCity');
				uni.removeStorageSync('endCity');
				uni.removeStorageSync('setoutAddress');
				uni.removeStorageSync('endCityAddress');
				uni.removeStorageSync('componentTime'); */
			},
			inputBlur() {
				var _this = this;
				if(_this.setoutCity==''){
					_this.setoutCityIsError = 1;
				} else if(_this.setoutCity!=''){
					_this.setoutCityIsError = 0;
				}
				if(_this.endCity==''){
					_this.endCityIsError = 1;
				} else if(_this.endCity!=''){
					_this.endCityIsError = 0;
				}
				if(_this.endCityAddressInfo.trim()==''){
					_this.endCityIsError = 1;
				} else if(_this.endCityAddressInfo.trim()!=''){
					_this.endCityIsError = 0;
				} 
				if(_this.setoutAddressInfo.trim()==''){
					_this.setoutCityIsError = 1;
				} else if(_this.setoutAddressInfo.trim()!=''){
					_this.setoutCityIsError = 0;
				} 
				if(_this.carInfo==''){
					_this.carInfoIsError = 1;
				} else if(_this.carInfo!=''){
					_this.carInfoIsError = 0;
				} 
				if(_this.car_num.trim()==''){
					_this.carNumIsError = 1;
				} else if(_this.car_num.trim()!=''){
					_this.carNumIsError = 0;
				} 
				if(_this.start_time.trim()==''){
					_this.startTimeIsError = 1;
				} else if(_this.start_time.trim()!=''){
					_this.startTimeIsError = 0;
				} 
				if(_this.goodsName.trim()==''){
					_this.goodsNameIsError = 1;
				} else if(_this.goodsName.trim()!=''){
					_this.goodsNameIsError = 0;
				} 
				if(_this.goodsWeight.trim()==''){
					_this.goodsWeightIsError = 1;
				} else if(_this.goodsWeight.trim()!=''){
					_this.goodsWeightIsError = 0;
				} 
				if(_this.goodsMoney.trim()==''){
					_this.goodsMoneyIsError = 1;
				} else if(_this.goodsMoney.trim()!=''){
					_this.goodsMoneyIsError = 0;
				}
				if(_this.username.trim()==''){
					_this.goodsUsernameIsError = 1;
				} else if(_this.username.trim()!=''){
					_this.goodsUsernameIsError = 0;
				}
			}
		}
	}
</script>

<style>
	@import "index.css";
</style>
