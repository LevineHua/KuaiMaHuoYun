<template>
	<view class="km_order" @click="seeOrder()">
		<view class="order_info">
			<view class="info_address">
				<image class="address_icon" src="../static/address3.png"></image>
				<text>{{startCity}}</text>
				<image class="address_line_icon" src="../static/address_line.png"></image>
				<text>{{endCity}}</text>
			</view>
			<view class="infos">{{carType}} / {{goodsWeight}}吨 / {{goodsName}}</view>
			<template v-if="((status>1 && status!=6) && userType==0) || userType==1">
				<view class="info_user">
					<image class="user_picture" src="../static/picture.png"></image>
					<template v-if="userType==0">
						司机：
					</template>
					{{hideName=='true'?filterName:name}}
				</view>
			</template>
		</view>
		<view class="order_status">
			<view class="order_money">
				<image class="money_icon" src="../static/money.png"></image>
				{{money}}元/吨
			</view>
			<template v-if="status==1">
				<view class="status">{{filterCreateTime}}</view>
			</template>
			<template v-if="status==0 && userType==0">
				<view class="status">审核中</view>
			</template>
			<template v-if="(status==0 && userType==1) || (status==3 && userType==0)">
				<view class="status">待确认</view>
			</template>
			<template v-if="status==2">
				<view class="status" style="margin-bottom: 50upx;">已退款</view>
			</template>
			<template v-if="status==4">
				<view class="status">运输中</view>
			</template>
			<template v-if="status==5 || (userType==0 && status==5)">
				<view class="status">已完成</view>
			</template>
			<template v-if="status==6 && userType==1">
				<view class="status">待装货</view>
			</template>
			<template v-if="status==6 && userType==0">
				<view class="status">已取消</view>
			</template>
			<template v-if="status==7">
				<view class="status">待支付</view>
			</template>
			<template v-if="status=='s-0'">
				<view class="status">需要车辆：{{needCar}}</view>
			</template>
			<template v-if="status!=2">
				<view class="order_time">装货时间：{{filterStartTime}}</view>
			</template>
		</view>
		<view class="order_make">
			<template v-if="status==0 || status==1 || status==3 || status=='s-0' || status==7 || (status==6 && userType==1) || status==4">
				<view class="order_see">查看</view>
			</template>
			<template v-if="status==2 || (status==5 && userType==1)">
				<view class="order_del" @tap="delOrder()" :hover-stop-propagation="propagations">删除</view>
			</template>
			<template v-if="(userType==0 && status==5) || (userType==0 && status==6)">
				<view>
					<view class="order_del" @tap="delOrder()" :hover-stop-propagation="propagations">删除</view>
					<view class="order_del" @click="orderInfo()" :hover-stop-propagation="propagations">查看</view>
					<!-- <template v-if="isRemark=='true'">
						<view class="order_del remarked">已评价</view>
					</template>
					<template v-if="isRemark=='false'">
						<view class="order_del" @tap="remarkOrder(isRemark)" :hover-stop-propagation="propagations">评价</view>
					</template> -->
					
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import util from '../common/util.js'
	export default {
		name:"km-order",
		props:{
			name:{
				default:""
			},
			status:{		////0:未接单；1:待确定；2：已退款；3：运输中；4：已完成；s-0：货主已发布；s-4：货主已完成
				default:'1'		// 0:审核中；1:未接单；2：拒绝；3:待确定；4：运输中（出货）；5：已完成（收货）；6 已支付；7：待支付
			},
			hideName:{	//是否过滤名字
				default: 'true'
			},
			isRemark:{	//是否评论
				default: false
			},
			userType:{	//用户是否是车主
				default: 1
			},
			startCity:{	//开始城市
				default:''
			},
			endCity:{	//终点城市
				default:''
			},
			money:{	//佣金
				default:''
			},
			carType:{	//车辆要求
				default:''
			},
			goodsWeight:{	//货重
				default:''
			},
			goodsName:{	//货品名
				default:''
			},
			startTime:{	//装货时间
				default:''
			},
			createTime:{	//发布时间
				default:''
			},
			orderId:{
				default:0
			},
			needCar:{
				default:0
			}
		},
		data() {
			return {
				propagations:true,
				isDel:true
			};
		},
		computed:{
			filterName: function(){
				return this.name.slice(0,1)+"**";
			},
			filterStartTime:function() {
				var isToday = util.contrastDate(this.startTime);
				var str = this.startTime;
				if(isToday){
					str = '今天'
				} else {
					str = util.formatTime(this.startTime);
				}
				return str;
			},
			filterCreateTime:function() {
				var isToday = util.contrastDate(this.createTime);
				var str = this.createTime;
				if(isToday){
					str = '今天'
				} else {
					str = util.formatTime(this.createTime);
				}
				return str;
			}
		},
		methods:{
			seeOrder() {
				this.$emit('seeOrder');
				/* var _this = this;
				console.log(_this.userType);
				if((_this.status==0 || _this.status==1 || _this.status==3 || _this.status==4 || _this.status=='s-0' || _this.status==7 || _this.status==6) && _this.isDel){
					if(_this.userType==1){
						uni.navigateTo({
							url:"../orderInfo/orderInfo?status="+_this.status+"&orderId="+_this.orderId
						})
					} else {
						uni.navigateTo({
							url:"../orderInfo_shipper/orderInfo_shipper?status="+_this.status+"&orderId="+_this.orderId
						})
					}
				} */
			},
			orderInfo(){
				console.log('test');
				var _this = this;
				if(_this.userType==1){
					uni.navigateTo({
						url:"../orderInfo/orderInfo?status="+_this.status+"&orderId="+_this.orderId
					})
				} else {
					uni.navigateTo({
						url:"../orderInfo_shipper/orderInfo_shipper?status="+_this.status+"&orderId="+_this.orderId
					})
				}
			},
			delOrder() {
				this.isDel = false;
				this.$emit("delOrder");
				/* var _this = this;
				var url = this.serverURL;
				uni.showModal({
					title:'删除订单',
					content:'确定要删除该订单吗？',
					success(res) {
						if(res.confirm){
							console.log("删除订单");
							uni.request({
								url: url + 'home/release/update_information',
								method:'POST',
								data:{
									id:_this.orderId,
									del: 0
								},
								success(res) {
									console.log(res);
									if(res.data.code==100){
										uni.showToast({
											title:'订单已删除',
											mask:true,
											icon:"success"
										});
									}
								},
								fail(error) {
									console.log(error)
								}
							})
						}
					}
				}) */
				return false;
			},
			remarkOrder(isRemark) {
				this.isDel = false;
				uni.navigateTo({
					url: "../writeAassess/writeAassess?orderId="+_this.orderId
				})
			}
		}
	}
</script>

<style>
	.km_order{
		border-bottom: solid 1px #EEEEEE;
		padding: 10upx 50upx;
		display: flex;
		box-sizing: border-box;
		height: 177upx;
	}
	.order_info{
		width: 50%;
		display: flex;
		flex-direction: column;
		/* justify-content: space-between; */
		align-items: flex-start;
	}
	.info_address{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: #139CFF;
		font-size: 26upx;
	}
	.infos{
		color: #7c7c7c;
		font-size: 22upx;
		width: 100%;
		overflow: hidden;/*超出部分隐藏*/
		white-space: nowrap;/*不换行*/
		text-overflow:ellipsis;/*超出部分文字以...显示*/
		margin-top: 16upx;
	}
	.info_user{
		color: #7c7c7c;
		font-size: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20upx;
	}
	.address_icon{
		width: 21upx;
		height: 27upx;
		margin-right: 10upx;
	}
	.address_line_icon{
		width: 66upx;
		height: 7upx;
		margin: 0 10upx;
	}
	.user_picture{
		width: 33upx;
		height: 33upx;
		margin-right: 10upx;
	}
	.order_status{
		width: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	.order_money{
		color: #139CFF;
		font-size: 22upx;
	}
	.money_icon{
		width: 24upx;
		height: 24upx;
		margin-right: 10upx;
	}
	.status{
		color: #818181;
		font-size: 22upx;
	}
	.order_time{
		font-size: 18upx;
		color: #818181;
	}
	.order_make{
		width: 20%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.order_see{
		width: 72upx;
		height: 72upx;
		background: #139CFF;
		border-radius: 50%;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24upx;
	}
	.order_del{
		width: 72upx;
		height: 72upx;
		background: white;
		border-radius: 50%;
		color: #139CFF;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24upx;
	}
	.remarked{
		color: #818181;
	}
</style>
