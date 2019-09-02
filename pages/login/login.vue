<template>
	<view class="page login_page">
		<template v-if="canGetUserInfo==1">
			<view class="login_items">
				<view class="km_logo"></view>
				<view class="login_item">
					手机号：
					<input type="number" class="login_ipt" v-model="phoneNumber" placeholder-class="ipt_pla" placeholder="请输入您的手机号" />
				</view>
				<view class="login_item">
					密码：
					<input type="text" password="true" class="login_ipt" v-model="password" placeholder-class="ipt_pla" placeholder="请输入密码" />
				</view>
				<view class="login_item">
					验证码：
					<input type="number" class="login_ipt yzm_ipt" v-model="yzm" placeholder-class="ipt_pla" placeholder="请输入您的验证码" />
					<text class="get_yzm" @click="getYzm">{{yzmTitle}}</text>
				</view>
				<view class="isAgree">
					<checkbox-group @change="checkboxChange">
						<label><checkbox value="agree" color="#139CFF" />同意使用<navigator class="pop_nav" url="../clause/clause">注意事项，以及金额退回处理方法</navigator></label>
					</checkbox-group>
				</view>
				<view class="next_btn" :class="{sure_isAgree: isAgree==='agree'}" @click="nextStep">下一步</view>
				<!-- <view>{{code}}</view> -->
			</view>
		</template>
		<template v-if="canGetUserInfo==0">
			<view class="getuserInfo_text">
				点击授权，即刻开启如期货运~
				<button open-type="getUserInfo" class="getuserInfo" @getuserinfo="getUserInfo">授权</button>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canGetUserInfo:0,
				isAgree:'',
				phoneNumber:'',
				password:'',
				yzm:'',
				code:'',	//发送验证码时返回的验证码
				seconds:60,		//60秒
				timer:'',
				yzmTitle:'获取验证码'
			}
		},
		onLoad(e) {
			if(e.canGetUserInfo==1){
				this.canGetUserInfo = e.canGetUserInfo;
			}
		},
		methods: {
			getUserInfo(e) {
				var _this = this;
				var url = _this.serverURL;
				// 通过微信开发能力，获得微信用户的基本信息
				var userInfo = e.detail.userInfo;
				uni.setStorageSync("wx_userInfo", userInfo);
				//console.log(userInfo);
				if(userInfo!=undefined){
					this.canGetUserInfo = 1;
					// 实现微信登录
					uni.login({
						provider: "weixin",
						success(loginResult) {
							//console.log(loginResult);
							// 获得微信登录的code：授权码
							var code = loginResult.code;
							
							uni.request({
								url:_this.serverURL+"home/login/api_login",
								method:"POST",
								data:{
									code:code
								},
								success(data) {
									//console.log(data);
									var openid = data.data.openid //返回openid
									uni.setStorageSync("openId", openid);
									
									//已授权时，判断该用户状态 100：登录成功；300：未注册；200：失败或账户禁止
									uni.request({
										url: url + 'home/user/get_user_information',
										method:'POST',
										data:{
											wxchat_oppid:openid,
										},
										success(res) {
											//console.log(res)
											if(res.data.code==100){
												var userinfo = {
													user_id:res.data.user_id,
													user_identity:res.data.user_type
												}
												uni.request({
													url: url + 'home/login/get_user_grant_wechat_openid',
													method:'POST',
													data:{
														uid:res.data.user_id,
													},
													success(data) {
														console.log(data);
														uni.setStorageSync("wxchat_oppid",data.data.wxchat_oppid);
														if(data.data.wxchat_oppid==0){
															uni.redirectTo({
																url:'../webview/webview?uid='+res.data.user_id
															})
														} else {
															uni.setStorageSync("userinfo",userinfo);
															if(res.data.examine==2 || (res.data.examine==0 && res.data.user_type==1) || res.data.examine==4){
																uni.redirectTo({
																	url:'../uploadCard/uploadCard'
																})
															} else if(res.data.examine==3 || res.data.examine==5){
																uni.redirectTo({
																	url:'../uploadDrivingLicense/uploadDrivingLicense'
																})
															} else {
																uni.switchTab({
																	url:"../index/index"
																})
															}
														}
													}
												});
												
											}
										},
										fail(error) {
											console.log(error)
										}
									})
									
								},
								fail(error) {
									console.log(error)
								}
							})
							
						}
					})
				}
			},
			checkboxChange(e) {
				if(e.detail.value[0]=="agree"){
					this.isAgree = e.detail.value[0];
				} else {
					this.isAgree ='';
				}
			},
			nextStep() {
				var _this = this;
				var url = _this.serverURL;
				if(_this.isAgree == "agree"){
					if(_this.phoneNumber==''){
						uni.showToast({
							title:'电话号码不能为空',
							icon:'none',
							mask:true
						})
					} else if(!_this.checkMobile(_this.phoneNumber)) {
						uni.showToast({
							title:'电话号码格式错误',
							icon:'none',
							mask:true
						})
					} else if(_this.password==''){
						uni.showToast({
							title:'密码不能为空',
							icon:'none',
							mask:true
						})
					} else if(_this.yzm==''){
						uni.showToast({
							title:'验证码不能为空',
							icon:'none',
							mask:true
						})
					} else if(_this.yzm!=_this.code){
						uni.showToast({
							title:'验证码错误',
							icon:'none',
							mask:true
						})
					} else {
						uni.redirectTo({
							url:'../selectRole/selectRole?mobile='+_this.phoneNumber+'&password='+_this.password+'&code='+_this.code
						})
					}
				}
			},
			getYzm() {
				var _this = this;
				var url = _this.serverURL;
				//console.log(_this.phoneNumber);
				if(_this.phoneNumber==''){
					uni.showToast({
						title:'电话号码不能为空',
						icon:'none',
						mask:true
					})
				} else if(_this.seconds!=60){
					
				} else if(!_this.checkMobile(_this.phoneNumber)) {
					uni.showToast({
						title:'电话号码格式错误',
						icon:'none',
						mask:true
					})
				} else {
					uni.request({
						url:url + 'home/login/code_send',
						method:'POST',
						data:{
							mobile:_this.phoneNumber,
							send_type:1
						},
						success(res) {
							//console.log(res);
							if(res.data.code==100){
								_this.code = res.data.rand_number;
								uni.showToast({
									title:res.data.msg,
									icon:'success',
									mask:true,
									duration:2000,
									success() {
										_this.timer = setInterval(() => {
											_this.seconds--
											if (_this.seconds < 0) {
												clearInterval(_this.timer);
												_this.seconds = 60;
												_this.yzmTitle = "获取验证码";
												return
											}
											_this.yzmTitle = "重新获取（"+_this.seconds+"）";
										}, 1000)
									}
								})
							} else {
								uni.showToast({
									title:res.data.msg,
									icon:'none',
									mask:true
								})
							}
							
						},
						fail(res) {
							console.log(res);
						}
					})
				}
			},
			checkMobile(mobile) {
				//console.log(RegExp(/^1[34578]\d{9}$/).test(mobile));
				return RegExp(/^1[34578]\d{9}$/).test(mobile);
			}
		}
	}
</script>

<style>
	@import url("login.css");
</style>
