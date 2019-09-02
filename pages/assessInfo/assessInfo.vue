<template>
	<view class="page">
		<view class="order_info">
			<view class="address_info">
				<image class="address_icon" src="../../static/address3.png"></image>
				<view class="assess_address">
					<view class="address">
						{{assess.start_delivery[0]}}
						<image src="../../static/address_line.png" class="line_icon"></image>
						{{assess.end_delivery[0]}}
					</view>
				</view>
			</view>
			<view class="assess_time">{{assess.comment_time | filterTime}}</view>
		</view>
		<view class="grades">
			<template v-for="cn in assess.comment_num*1">
				<image :key="cn" src="../../static/grade_active.png" class="grade"></image>
			</template>
		</view>
		<view class="assess_info">
			{{assess.comment_msg}}
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	export default {
		data() {
			return {
				assess:{
					
				}
			}
		},
		filters:{
			filterTime: function(value){
				return util.formatTime(parseInt(value))
			}
		},
		onLoad(e) {
			this.assess = JSON.parse(e.assess);
		},
		methods: {
			
		}
	}
</script>

<style>
	.order_info{
		height: 108upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
	}
	.address_info{
		display: flex;
	}
	.address_icon{
		width: 21upx;
		height: 27upx;
		margin-right: 20upx;
		margin-top: 10upx;
	}
	.assess_address{
		flex: 1;
		justify-content: space-between;
		display: flex;
		flex-direction: column;
	}
	.address{
		display: flex;
		align-items: center;
		color: #139CFF;
		font-size: 26upx;
	}
	.line_icon{
		width: 66upx;
		height: 7upx;
		margin: 0 30upx;
	}
	.assess_time{
		color: #838383;
		font-size: 20upx;
	}
	.grades{
		width: 710upx;
		height: 158upx;
		margin: 0 auto;
		border: solid 1px #e4e4e4;
		background: #fafafa;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.grade{
		width: 64upx;
		height: 59upx;
		margin: 0 30upx;
	}
	.assess_info{
		border: solid 1px #e4e4e4;
		background: #fafafa;
		width: 710upx;
		padding: 20upx;
		color: #838383;
		font-size: 20upx;
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: 20upx;
	}
</style>
