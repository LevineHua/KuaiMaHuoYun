<template>
	<view class="km_li">
		<view class="li_title">{{title}}：</view>
		<view class="li_text">
			<template v-if="isDate=='true'">
				{{filterStartTime}}
			</template>
			<template v-if="isDate==false">
				{{isHide&&(status==1 || status==0 || status==7)?hideContent:content}}
			</template>
			<template v-if="(isCall&&(status!=1 && status!=7)) && (isCall && status!=0)">
				<image src='../static/phone2.png' class="phone_icon" @click="makePhoneCall"></image>
			</template>
		</view>
	</view>
</template>

<script>
	import util from '../common/util.js'
	export default {
		name:"km-li",
		props:{
			"title":{
				default:''
			},
			"content":{
				default:''
			},
			"isHide":{
				default:false
			},
			"status":{
				default:0
			},
			"isCall":{
				default:false
			},
			"isDate": {
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			hideContent: function(){
				return "******";
			},
			filterStartTime:function() {
				var isToday = util.contrastDate(this.content);
				var str = this.content;
				if(isToday){
					str = '今天'
				} else {
					str = util.formatTime(this.content);
				}
				return str;
			}
		},
		methods:{
			makePhoneCall() {
				uni.makePhoneCall({
					phoneNumber:this.content
				})
			}
		}
	}
</script>

<style>
	.km_li{
		height: 94upx;
		border-bottom: solid 1px #EEEEEE;
		padding: 0 30upx;
		display: flex;
		justify-content: space-between;
		color: #139CFF;
		font-size: 24upx;
		align-items: center;
	}
	.li_title{
		width: 200upx;
		font-size: 24upx;
	}
	.li_text{
		color: #7c7c7c;
		display: flex;
		align-items: center;
	}
	.phone_icon{
		width: 37upx;
		height: 37upx;
		margin-left: 10upx;
	}
</style>
