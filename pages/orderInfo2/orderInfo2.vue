<template>
	<view class="page orderInfo_page">
		<view class="order_address">
			<image class="address_icon" src="../../static/address3.png"></image>
			{{order.start_delivery[0]}}
			<image class="line_icon" src="../../static/address_line.png"></image>
			{{order.end_delivery[0]}}
		</view>
		<view class="order_info">
			<kmLi title="出发地点" :content="order.start_delivery[0]" isHide="true" :status="status"></kmLi>
			<kmLi title="目的地" :content="order.end_delivery[0]" isHide="true" :status="status"></kmLi>
			<kmLi title="车辆需求" :content="order.vehicle_msg"></kmLi>
			<kmLi title="需要车辆" :content="order.car_num+'辆'"></kmLi>
			<kmLi title="装货时间" :content="order.start_time" isDate="true"></kmLi>
			<kmLi title="装载货物" :content="order.transportation_name"></kmLi>
			<kmLi title="装载吨位" :content="order.transportation_weight+'吨'"></kmLi>
			<kmLi title="雇佣价格" :content="order.money+'元/吨'"></kmLi>
			<kmLi title="联系人" :content="order.username" :status="status"></kmLi>
			<kmLi title="联系电话" :content="order.mobile" isHide="true" isCall="true" :status="status"></kmLi>
			<kmLi title="订单备注" :content="order.remarks"></kmLi>
		</view>
		<view class="order_footer">
			<template v-if="status==1">
				<view class="select_car_num">
				</view>
				<view class="callShipper" @click="takeToken">接单</view>
			</template>
		</view>
		
	</view>
</template>

<script>
	import kmLi from '../../components/km-li.vue'
	export default {
		data() {
			return {
				url:'',
				link:'',
				userinfo:'',
				user_id:0,
				status:1,	// 0:审核中；1:未接单；2：拒绝；3:待确定；4：运输中（出货）；5：已完成（收货）；6 已支付；7：待支付 //0:未接单；1:待确认；2：已退款；3：运输中；4：已完成；5：申诉中
				orderId:'',
				order:''
			}
		},
		components: {
			kmLi
		},
		filters:{
			filterMath(value) {
				return Math.round(value*100)/100
			}
		},
		onLoad(e) {
			var _this = this;
			
			this.userinfo = uni.getStorageSync('userinfo');
			this.user_id  = this.userinfo.user_id;
			
			this.orderId = e.orderId;
			this.url = this.serverURL;
			
			/* uni.request({
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
					}
				},
				fail(error) {
					console.log(error)
				}
			}) */
			
		},
		onShow() {
			var _this = this;
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
					}
				},
				fail(error) {
					console.log(error)
				}
			})
		},
		filters:{
			filterPhone(val) {
				return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
			}
		},
		methods: {
			takeToken() {	//接单
				var _this = this;
				uni.showLoading({
					title:'接单中...',
					mask:true
				})
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
								//content: "接单成功，请耐心等待货主确认。",
								content:res.data.msg,
								confirmText: "确定",
								showCancel:false
							})
						} else {
							uni.showToast({
								//title:"等待货主确认中，请不要重复接单",
								title:res.data.msg,
								mask:true,
								icon:"none",
								duration:2000
							})
						}
					},
					fail(error) {
						console.log(error)
					},
					complete() {
						uni.hideLoading();
					}
				})
				
			}
		}
	}
</script>

<style>
	@import url("../orderInfo/orderInfo.css");
</style>
