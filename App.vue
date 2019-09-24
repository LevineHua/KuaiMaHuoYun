<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			//判断是否授权
// 			var _this = this;
// 			var url = this.serverURL;
// 			uni.getUserInfo({
// 				success(success) {
// 					var userInfo = success.userInfo;
// 					uni.setStorageSync("wx_userInfo", userInfo);
// 					//判断登录状态是否过期
// 					uni.checkSession({
// 						success(session) {
// 							if(session.errMsg=="checkSession:ok"){	//登录状态未过期
// 								console.log('登录状态未过期');
// 								//已授权时，判断该用户状态 100：登录成功；300：未注册；200：失败或账户禁止
// 								uni.request({
// 									url: url + 'home/user/get_user_information',
// 									method:'POST',
// 									data:{
// 										wxchat_oppid:uni.getStorageSync("openId")
// 									},
// 									success(res) {
// 										if(res.data.code==300){
// 											uni.redirectTo({
// 												url:'/pages/login/login?canGetUserInfo=0'
// 											})
// 										} else if(res.data.code==100){
// 											var userinfo = {
// 												user_id:res.data.user_id,
// 												user_identity:res.data.user_type
// 											}
// 											uni.setStorageSync("car_type",res.data.car_type);
// 											uni.setStorageSync("examine",res.data.examine);
// 											var examineNum = res.data.examine;
// 											var examine = '';
// 											if(examineNum==0){
// 												examine = "没有提交认证"
// 											} else if(examineNum==2){
// 												examine = "身份审核未提交"
// 											} else if(examineNum==3){
// 												examine = "驾驶证审核未提交"
// 											} else if(examineNum==4){
// 												examine = "身份证审核拒绝"
// 											} else if(examineNum==5){
// 												examine = "驾驶证审核拒绝"
// 											}
// 											if((res.data.examine==2 || res.data.examine==0 || res.data.examine==4) && res.data.user_type=='1'){
// 												uni.showToast({
// 													title:examine,
// 													icon:'none',
// 													mask:true,
// 													success() {
// 														setTimeout(function(){
// 															uni.redirectTo({
// 																url:'/pages/uploadCard/uploadCard'
// 															})
// 														},1500);
// 													}
// 												})
// 											} else if((res.data.examine==3 || res.data.examine==5) && res.data.user_type=='1'){
// 												uni.showToast({
// 													title:examine,
// 													icon:'none',
// 													mask:true,
// 													success() {
// 														setTimeout(function(){
// 															uni.redirectTo({
// 																url:'/pages/uploadDrivingLicense/uploadDrivingLicense'
// 															})
// 														},1500);
// 													}
// 												})
// 											}
// 											uni.setStorageSync("userinfo",userinfo);
// 											uni.setStorageSync("userType",userinfo);
// 											uni.setStorageSync("loginCount",res.data.login_count);
// 										}
// 									},
// 									fail(error) {
// 										console.log(error);
// 										uni.showModal({
// 											title:'error',
// 											content:JSON.stringify(error)
// 										})
// 									}
// 								})
// 							}
// 						},
// 						fail(sessionFail){
// 							console.log(sessionFail	);
// 							// 实现微信登录
// 							console.log('登录状态已过期');
// 							uni.login({
// 								provider: "weixin",
// 								success(loginResult) {
// 									console.log(loginResult);
// 									// 获得微信登录的code：授权码
// 									var code = loginResult.code;
// 									
// 									uni.request({
// 										url:_this.serverURL+"home/login/api_login",
// 										method:"POST",
// 										data:{
// 											code:code
// 										},
// 										success(data) {
// 											var openid = data.data.openid //返回openid
// 											uni.setStorageSync("openId", openid);
// 													
// 											//已授权时，判断该用户状态 100：登录成功；300：未注册；200：失败或账户禁止
// 											uni.request({
// 												url: url + 'home/user/get_user_information',
// 												method:'POST',
// 												data:{
// 													wxchat_oppid:openid
// 												},
// 												success(res) {
// 													console.log(res)
// 													if(res.data.code==300){
// 														uni.redirectTo({
// 															url:'/pages/login/login?canGetUserInfo=0'
// 														})
// 													} else if(res.data.code==100){
// 														var userinfo = {
// 															user_id:res.data.user_id,
// 															user_identity:res.data.user_type
// 														}
// 														uni.setStorageSync("car_type",res.data.car_type);
// 														uni.setStorageSync("examine",res.data.examine);
// 														
// 														var examineNum = res.data.examine;
// 														var examine = '';
// 														if(examineNum==0){
// 															examine = "没有提交认证"
// 														} else if(examineNum==2){
// 															examine = "身份审核未提交"
// 														} else if(examineNum==3){
// 															examine = "驾驶证审核未提交"
// 														} else if(examineNum==4){
// 															examine = "身份证审核拒绝"
// 														} else if(examineNum==5){
// 															examine = "驾驶证审核拒绝"
// 														}
// 														
// 														if((res.data.examine==2 || res.data.examine==0 || res.data.examine==4) && res.data.user_type=='1'){
// 															uni.showToast({
// 																title:examine,
// 																icon:'none',
// 																mask:true,
// 																success() {
// 																	setTimeout(function(){
// 																		uni.redirectTo({
// 																			url:'/pages/uploadCard/uploadCard'
// 																		})
// 																	},1500);
// 																}
// 															})
// 														} else if((res.data.examine==3 || res.data.examine==5) && res.data.user_type=='1'){
// 															uni.showToast({
// 																title:examine,
// 																icon:'none',
// 																mask:true,
// 																success() {
// 																	setTimeout(function(){
// 																		uni.redirectTo({
// 																			url:'/pages/uploadDrivingLicense/uploadDrivingLicense'
// 																		})
// 																	},1500);
// 																}
// 															})
// 														}
// 														uni.setStorageSync("userinfo",userinfo);
// 														uni.setStorageSync("userType",userinfo);
// 														uni.setStorageSync("loginCount",res.data.login_count);
// 													}
// 												},
// 												fail(error) {
// 													console.log(error)
// 												}
// 											})
// 											
// 										},
// 										fail(error) {
// 											console.log(error)
// 										}
// 									})
// 								}
// 							})
// 						}
// 					});
// 				},
// 				fail(fail) {
// 					uni.redirectTo({
// 						url:'/pages/login/login'
// 					})
// 				}
// 			})
		},
		onShow: function() {
			console.log('App Show');
// 			var _this = this;
// 			var wxchat_oppid = uni.getStorageSync("wxchat_oppid");
// 			var userinfo = uni.getStorageSync("userinfo");
// 			if(wxchat_oppid==0 && wxchat_oppid!=''){
// 				uni.request({
// 					url: _this.serverURL + 'home/login/get_user_grant_wechat_openid',
// 					method:'POST',
// 					data:{
// 						uid:userinfo.user_id,
// 					},
// 					success(data) {
// 						console.log(data);
// 						uni.setStorageSync("wxchat_oppid",data.data.wxchat_oppid);
// 						if(data.data.wxchat_oppid==0){
// 							uni.redirectTo({
// 								url:'page/webview/webview?uid='+userinfo.user_id
// 							})
// 						}
// 					}
// 				});
// 			}
// 			
// 			if(userinfo!='' && userinfo.user_identity==1){
// 				uni.request({
// 					url: _this.serverURL + 'home/Order/get_user_order',
// 					method:'POST',
// 					data:{
// 						uid:userinfo.user_id,
// 					},
// 					success(data) {
// 						console.log(data);
// 						if(data.data.code==100){
// 							var id = data.data.id;
// 							uni.getLocation({
// 								type: 'wgs84',
// 								success: function (res) {
// 									var let_lon = res.longitude+','+res.latitude;
// 									uni.request({
// 										url: _this.serverURL + 'home/order/update_transportation_order',
// 										method:'POST',
// 										data:{
// 											let_lon:let_lon,
// 											id:id,
// 										},
// 										success(data) {
// 											console.log(data);
// 										}
// 									});
// 								}
// 							});
// 						}
// 					}
// 				});
// 			}
			
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function (res) {
					if (res.hasUpdate) { // 请求完新版本信息的回调
						updateManager.onUpdateReady(function () {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function (res) {
									if (res.confirm) {// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate()
									}
								}
							})
						});
						updateManager.onUpdateFailed(function () {
							uni.showModal({// 新的版本下载失败
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索进入哟~',
							})
						})
					}
				})
			} else {
				uni.showModal({// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	.page{
		height: 100vh;
	}
</style>
