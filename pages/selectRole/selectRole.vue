<template>
	<view class="page selectRole_page">
		<view class="role_item" :class="{active: role=='dirver'}" @click="selectRole('dirver')">
			<view class="role carer"></view>
			<view class="active_item">我是司机</view>
		</view>
		<view class="role_item" :class="{active: role=='shipper'}" @click="selectRole('shipper')">
			<view class="role goodser"></view>
			<view class="active_item">我是货主</view>
		</view>
		<view class="next_btn" :class="{sure_isAgree: isAgree==='agree'}" @click="nextStep">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role:"dirver",
				mobile:'',
				password:'',
				code:''
			}
		},
		onLoad(e) {
			this.mobile = e.mobile;
			this.password = e.password;
			this.code = e.code;
			console.log(e);
		},
		methods: {
			selectRole(role) {
				this.role = role;
			},
			nextStep() {
				var _this = this;
				var url = _this.serverURL;
				var wx_userInfo = uni.getStorageSync("wx_userInfo");
				var openid = uni.getStorageSync("openId");
				uni.request({
					url:url + 'home/login/register',
					method:'POST',
					data:{
						mobile:_this.mobile,
						password:_this.password,
						code:_this.code,
						user_identity:_this.role==="dirver"?1:0,
						wxchat_oppid:openid,
						headimageurl:wx_userInfo.avatarUrl,
						username: wx_userInfo.nickName,
						pid:uni.getStorageSync("recommendId")
					},
					success(res) {
						console.log(res);
						if(res.data.code==100){
							var userinfo = {
								user_id:res.data.user_id,
								user_identity:res.data.user_identity
							}
							uni.setStorageSync("userinfo",userinfo)
							uni.showToast({
								title:'绑定成功',
								icon:'success',
								mask:true,
								success() {
									setTimeout(function(){
										if(_this.role === "dirver"){
											uni.request({
												url: _this.serverURL + 'home/login/get_user_grant_wechat_openid',
												method:'POST',
												data:{
													uid:res.data.user_id,
												},
												success(data) {
													console.log(data);
													uni.setStorageSync("wxchat_oppid",data.data.wxchat_oppid);
													if(data.data.wxchat_oppid==0){
														uni.redirectTo({
															url:'../webview2/webview2?uid='+userinfo.user_id
														})
													}
												}
											});
											/* uni.redirectTo({
												url:'../uploadCard/uploadCard'
											}) */
										} else {
											uni.request({
												url: _this.serverURL + 'home/login/get_user_grant_wechat_openid',
												method:'POST',
												data:{
													uid:res.data.user_id,
												},
												success(data) {
													console.log(data);
													uni.setStorageSync("wxchat_oppid",data.data.wxchat_oppid);
													if(data.data.wxchat_oppid==0){
														uni.redirectTo({
															url:'../webview/webview?uid='+userinfo.user_id
														})
													}
												}
											});
											/* uni.switchTab({
												url:"../index/index"
											}) */
										}
									},1500);
								}
							})
						}
					},
					fail(res) {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style>
	@import url("selectRole.css");
</style>
