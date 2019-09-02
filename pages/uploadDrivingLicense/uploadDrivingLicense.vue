<template>
	<view class="page upload_drivingLicense">
		<view class="cards">
			<view class="card_item">
				<view class="card_img" @click="selectCardImg('due')">
					<image class="card" :src="cardDue"></image>
				</view>
				<text class="card_title">请上传本人驾驶证正页照片</text>
			</view>
		</view>
		<view class="cards">
			<view class="card_item">
				<view class="card_img" @click="selectCardImg('back')">
					<image class="card" :src="cardBack"></image>
				</view>
				<text class="card_title">请上传本人驾驶证副页照片</text>
			</view>
		</view>
		<view class="cards">
			<view class="card_item">
				<view class="card_img" @click="selectCardImg('driving')">
					<image class="card" :src="carDriving"></image>
				</view>
				<text class="card_title">请上传本人行驶证照片</text>
			</view>
		</view>
		<view class="cards">
			<view class="card_item">
				<view class="card_img" @click="carImg">
					<image class="card" :src="holdCard"></image>
				</view>
				<text class="card_title">请上传本人车辆车牌照片</text>
			</view>
		</view>
		<input class="uni-input" placeholder-class="ipt_pla" type="text" v-model="cardName" placeholder="请输入姓名" />
		<input class="uni-input" placeholder-class="ipt_pla" style="border-top: none;" v-model="driverLicenseId" type="idcard" placeholder="请输入驾驶证号" />
		<input class="uni-input" placeholder-class="ipt_pla" style="border-top: none;" v-model="drivingLicense" type="idcard" placeholder="请输入行驶证号" />
		<input class="uni-input" placeholder-class="ipt_pla" style="border-top: none;" v-model="carNumber" type="text" placeholder="请输入本人车辆车牌号" />
		<view class="uni-input select_car" style="border-top: none;" @click="selectCar" >
			选择车辆信息
			<view class="select_text">
				 {{carInfo}}
				 <image class="right_icon" src="../../static/right.png"></image>
			</view>
		</view>
		<view class="next_btn" @click="nextStep" v-if="type!=1">
			<template v-if="examine==5">
				重新提交
			</template>
			<template v-else>
				下一步
			</template>
		</view>
		<view class="next_btn" v-if="type==1" @click="nextStep">
			修改
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:'',
				cardBack:'',
				cardDue:'',
				holdCard:'',
				driving:'',
				carDriving:'',
				cardName:'',
				driverLicenseId:'',
				drivingLicense:'',
				carNumber:'',
				card_up:'',
				card_down:'',
				card_left:'',
				carInfo:'',
				examine:'',
				cardIsTrue:100,
				type:0
			}
		},
		onLoad(e) {
			var _this = this;
			this.userinfo = uni.getStorageSync('userinfo');
			console.log(this.userinfo);
			
			this.examine = uni.getStorageSync('examine');
			
			this.type = e.type;
			if(this.type==1){
				uni.setNavigationBarTitle({
					title: '修改驾驶证'
				});
				uni.request({
					url:_this.serverURL + "/home/user/get_car_examine",
					method:"POST",
					data:{
						user_id:_this.userinfo.user_id
					},
					success(res) {
						console.log(res)
						if(res.data.code==100){
							_this.cardDue = _this.href+res.data.msg.card_up;
							_this.cardBack = _this.href+res.data.msg.card_down;
							_this.holdCard = _this.href+res.data.msg.card_left;
							_this.carDriving = _this.href+res.data.msg.driving_up;
							_this.cardName = res.data.msg.nickname;
							_this.driverLicenseId = res.data.msg.drive_num;
							_this.drivingLicense = res.data.msg.travel_num;
							_this.carNumber = res.data.msg.car_num;
							_this.carInfo = res.data.msg.car_type;
							
							_this.card_up = res.data.msg.card_up;
							_this.card_down = res.data.msg.card_down;
							_this.card_left = res.data.msg.card_left;
							_this.driving = res.data.msg.driving_up;
						}
							
					},
					fail(fail) {
						console.log(fail)
					}
				})
			}
		},
		onShow() {
			var _this = this;
			if(this.type!=1){
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
			}
		},
		methods: {
			nextStep() {
				var _this = this;
				if(_this.card_up==''){
					uni.showToast({
						title:'驾驶证正面照片不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.card_down=='') {
					uni.showToast({
						title:'驾驶证反面照片不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.card_left=='') {
					uni.showToast({
						title:'车牌照片不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.card_left=='') {
					uni.showToast({
						title:'行驶证照片不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.cardName=='') {
					uni.showToast({
						title:'姓名不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.driverLicenseId=='') {
					uni.showToast({
						title:'驾驶证号不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.driving=='') {
					uni.showToast({
						title:'行驶证号不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.carNumber=='') {
					uni.showToast({
						title:'车牌号不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.carInfo=='') {
					uni.showToast({
						title:'请选择车辆信息',
						icon:'none',
						mask:true
					})
				} else if(_this.cardIsTrue!=100) {
					uni.showToast({
						title:'驾驶证有误',
						icon:'none',
						mask:true
					})
				} else {
					var url = _this.serverURL;
					uni.showModal({
						title:'',
						content:'我已确认并保证信息准确！',
						success(data) {
							if(data.confirm){
								uni.request({
									url: url + 'home/user/car_examine',
									method:'POST',
									data:{
										user_id: _this.userinfo.user_id,
										card_up:_this.card_up,
										card_down:_this.card_down,
										card_left:_this.card_left,
										nickname:_this.cardName,
										drive_num:_this.driverLicenseId,
										travel_num:_this.drivingLicense,
										driving_up:_this.driving,
										car_num:_this.carNumber,
										car_type:_this.carInfo
									},
									success(res) {
										console.log(res);
										if(res.data.code==100){
											if(_this.type==1){
												uni.setStorageSync("examine",7);
												uni.showToast({
													title:'上传成功',
													icon:'success',
													mask:true,
													success() {
														setTimeout(function(){
															uni.navigateBack();
														},1500);
													}
												})
											} else {
												uni.setStorageSync("examine",6);
												uni.showToast({
													title:'上传成功',
													icon:'success',
													mask:true,
													success() {
														setTimeout(function(){
															uni.switchTab({
																url:"../index/index"
															})
														},1500);
													}
												})
											}
											//清除选择车型临时记录
											uni.removeStorageSync('current');
											uni.removeStorageSync('currentCT');
											uni.removeStorageSync('currentCL');
										}
									}
								})
							}
						}
					})
				}
			},
			selectCar() {
				uni.navigateTo({
					url:'../selectCar/selectCar'
				})
			},
			selectCardImg(type) {
				var _this = this;
				var url = _this.serverURL;
				uni.chooseImage({
					count:1,
					sourceType:["camera"],
					success(res) {
						var imgPath = res.tempFilePaths[0];
						if(type=="back"){
							_this.cardBack = imgPath;
						} else if(type=="due"){
							_this.cardDue = imgPath;
						}
						console.log(imgPath);
						console.log("选择图片成功");
						uni.showLoading({
							title: '上传中...'
						});
						uni.uploadFile({
							url: url + 'index/index/uploadImage',
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
										if(type=="back"){
											_this.cardBack = imgPath;
											_this.card_down = file.url;
										} else if(type=="due"){
											_this.cardDue = imgPath;
											_this.card_up = file.url;
											
											uni.request({
												url:url + 'index/index/code_drivingLicense',
												method:'POST',
												data:{
													image:file.url
												},
												success(imageData) {
													console.log(imageData)
													uni.hideLoading();
													_this.cardIsTrue = imageData.data.code;
													if(imageData.data.code==100){
														_this.cardName = imageData.data.date.words_result.姓名.words;
														_this.driverLicenseId = imageData.data.date.words_result.证号.words;
													} else {
														uni.showModal({
															content: imageData.data.msg,
															confirmText: "确定",
															showCancel:false
														})
													}
												},
												fail(failData) {
													console.log(failData)
												}
											})
											
										} else if(type=="driving"){
											_this.carDriving = imgPath;
											_this.driving = file.url;
											
											uni.request({
												url:url + 'index/index/code_vehicleLicense',
												method:'POST',
												data:{
													image:file.url
												},
												success(imageData) {
													console.log(imageData)
													uni.hideLoading();
													_this.cardIsTrue = imageData.data.code;
													if(imageData.data.code==100){
														if(imageData.data.date.words_result_num!=0){
															_this.drivingLicense = imageData.data.date.words_result.号牌号码.words;
															_this.carNumber = imageData.data.date.words_result.车辆识别代号.words;
														} else {
															uni.showModal({
																content: '上传的行驶证有误',
																confirmText: "确定",
																showCancel:false
															})
														}
													} else {
														uni.showModal({
															content: imageData.data.msg,
															confirmText: "确定",
															showCancel:false
														})
													}
												},
												fail(failData) {
													console.log(failData)
												}
											})
											
										}
										console.log("上传图片成功");
									}
								}
							},
							fail() {
								console.log('上传失败')
							},
							complete() {
								console.log('上传结束')
							}
						});
					},
					fail() {
						console.log("选择图片失败");
					},
					complete() {
						console.log("选择图片完成");
					}
				})
			},
			carImg() {
				var _this = this;
				var url = _this.serverURL;
				uni.chooseImage({
					count:1,
					success(res) {
						var imgPath = res.tempFilePaths[0];
						_this.holdCard = imgPath;
						console.log(imgPath);
						uni.showLoading({
							title: '上传中...'
						});
						uni.uploadFile({
							url: url + 'index/index/uploadImage',
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
										_this.holdCard = imgPath;
										_this.card_left = file.url;
									}
								}
							},
							fail() {
								console.log('上传失败')
							},
							complete() {
								console.log('上传结束')
							}
						});
					},
					fail() {
						console.log("选择图片失败");
					},
					complete() {
						console.log("选择图片完成");
					}
				})
			}
		}
	}
</script>

<style>
	@import url("uploadDrivingLicense.css");
</style>
