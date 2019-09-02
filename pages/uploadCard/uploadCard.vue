<template>
	<view class="page uploadCard">
		<view class="cards">
			<view class="card_item">
				<view class="card_img card_z" @click="selectCardImg('due')">
					<image class="card" :src="cardDue"></image>
				</view>
				<text class="card_title">请上传本人身份证正面照片</text>
			</view>
		</view>
		<view class="cards">
			<view class="card_item">
				<view class="card_img card_f" @click="selectCardImg('back')">
					<image class="card" :src="cardBack"></image>
				</view>
				<text class="card_title">请上传本人身份证反面照片</text>
			</view>
		</view>
		<view class="cards">
			<view class="card_item">
				<view class="card_img card_photo" @click="selectCardImg('hold')">
					<image class="card" :src="holdCard"></image>
				</view>
				<text class="card_title">请上传本人手持身份证照片</text>
			</view>
		</view>
		<input class="uni-input" placeholder-class="ipt_pla" type="text" v-model="cardName" placeholder="请输入姓名" />
		<input class="uni-input" placeholder-class="ipt_pla" style="border-top: none;" v-model="cardId" type="idcard" placeholder="请输入身份证号" />
		<view class="next_btn" @click="nextStep" v-if="type!=1">
			<template v-if="examine==4">
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
				cardBack:'',
				cardDue:'',
				holdCard:'',
				cardName:'',
				cardId:'',
				userinfo:'',
				card_up:'',
				card_down:'',
				card_left:'',
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
					title: '修改身份证'
				});
				uni.request({
					url:_this.serverURL + "/home/user/get_card_examine",
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
							_this.cardName = res.data.msg.nickname;
							_this.cardId = res.data.msg.card_num;
							
							_this.card_up = res.data.msg.card_up;
							_this.card_down = res.data.msg.card_down;
							_this.card_left = res.data.msg.card_left;
						}
					},
					fail(fail) {
						console.log(fail)
					}
				})
			}
		},
		methods: {
			nextStep() {
				var _this = this;
				if(_this.card_up==''){
					uni.showToast({
						title:'身份证正面照片不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.card_down=='') {
					uni.showToast({
						title:'身份证反面照片不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.card_left=='') {
					uni.showToast({
						title:'手持身份证照片不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.cardName=='') {
					uni.showToast({
						title:'姓名不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.cardId=='') {
					uni.showToast({
						title:'身份证号不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.cardIsTrue!=100) {
					uni.showToast({
						title:'身份证有误',
						icon:'none',
						mask:true
					})
				} else {
					var url = _this.serverURL;
					console.log( _this.userinfo.user_id+';'+_this.card_up+';'+_this.card_down+';'+_this.card_left+';'+_this.cardName+';'+_this.cardId);
					
					uni.showModal({
						title:'',
						content:'我已确认并保证信息准确！',
						success(data) {
							if(data.confirm){
								uni.request({
									url: url + 'home/user/card_examine',
									method:'POST',
									data:{
										user_id: _this.userinfo.user_id,
										card_up:_this.card_up,
										card_down:_this.card_down,
										card_left:_this.card_left,
										nickname:_this.cardName,
										card_num:_this.cardId
									},
									success(res) {
										console.log(res);
										if(res.data.code==100){
											if(_this.type==1){
												uni.setStorageSync("examine",6);
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
												if(_this.examine==4){
													uni.showToast({
														title:'上传成功',
														icon:'success',
														mask:true,
														success() {
															setTimeout(function(){
																uni.switchTab({
																	url:'../index/index'
																})
															},1500);
														}
													})
												} else {
													uni.showToast({
														title:'上传成功',
														icon:'success',
														mask:true,
														success() {
															setTimeout(function(){
																uni.redirectTo({
																	url: '../uploadDrivingLicense/uploadDrivingLicense'
																})
															},1500);
														}
													})
												}
											}
										}
									}
								})
							}
						}
					})
					
				}
				
			},
			selectCardImg(type) {
				var _this = this;
				var url = _this.serverURL;
				uni.chooseImage({
					count:1,
					sourceType:["camera"],
					success(res) {
						var imgPath = res.tempFilePaths[0];
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
								console.log(uploadFileRes)
								if(uploadFileRes.statusCode==200){
									var file = JSON.parse(uploadFileRes.data);
									if(file.code==100){
										if(type=="back"){
											_this.cardBack = imgPath;
											_this.card_down = file.url;
											uni.hideLoading();
										} else if(type=="due"){
											_this.cardDue = imgPath;
											_this.card_up = file.url;
											
											uni.request({
												url:url + 'index/index/code_idcard',
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
														_this.cardId = imageData.data.date.words_result.公民身份号码.words;
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
										} else if(type=="hold"){
											uni.hideLoading();
											_this.holdCard = imgPath;
											_this.card_left = file.url;
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
								uni.hideLoading();
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
	@import url("uploadCard.css");
</style>
