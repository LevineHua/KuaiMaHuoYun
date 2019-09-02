<template>
	<view class="page">
		<map style="width: 750upx; height: 100%;" 
			:latitude="latitude" 
			:longitude="longitude"
			:markers="markers"
			scale=7
		></map>
		<cover-view class="btns">
			<cover-view class="btn_item" @click="orderInfo">
				<cover-image src="../../static/info.png" class="btn_icon"></cover-image>
			</cover-view>
			<cover-view class="btn_item" style="border: none;" @click="makePhoneCall(order.mobile)">
				<cover-image src="../../static/phone3.png" class="btn_icon"></cover-image>
			</cover-view>
		</cover-view>
	</view>
</template>

<script>
	import QQMapWX from '../../common/qqmap-wx-jssdk.min.js'
	export default {
		data() {
			return {
				qqMapWX:'',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/address3.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../static/address3.png'
				}],
				url:'',
				orderId:0,
				status:0,
				polyline:[
					{
						points:[{latitude: 0, longitude: 0},{latitude: 0, longitude: 0}],
						color:"#139cff",
						width:2
					}
				],
				markers:[
					{
						id:0,
						latitude:0,
						longitude:0,
						title:'',
						iconPath:'../../static/static.png'
					},
					{
						id:1,
						latitude:0,
						longitude:0,
						title:'',
						iconPath:'../../static/end.png'
					}
				]
			}
		},
		onLoad(e) {
			var _this = this;
			this.orderId = e.id;
			this.status = e.status;
			this.url = this.serverURL;
			
			// 实例化地图API
			_this.qqMapWX = new QQMapWX({
				key: _this.mapKey
			})
			
			uni.request({
				url: _this.url + 'home/user/user_order_id',
				method:'POST',
				data:{
					id: _this.orderId
				},
				success(res) {
					console.log(res);
					if(res.data.code==100){
						var order = res.data.msg;
						_this.order = order;
						var start_delivery_lon = order.start_delivery_lon;
						var end_delivery_lon = order.end_delivery_lon;
					
						_this.polyline[0].points[0].longitude = start_delivery_lon[0];
						_this.polyline[0].points[0].latitude = start_delivery_lon[1];
						_this.polyline[0].points[1].longitude = end_delivery_lon[0];
						_this.polyline[0].points[1].latitude = end_delivery_lon[1];
						
						//_this.createPolyline(start_delivery_lon,end_delivery_lon)
						
						if(order.let_lon[0]==null){
							_this.longitude = start_delivery_lon[0];
							_this.latitude = start_delivery_lon[1];
						} else {
							_this.longitude = order.let_lon[0];
							_this.latitude = order.let_lon[1];
							_this.markers.push({id:parseInt(order.let_lon[0].split(".")[1]),latitude:order.let_lon[1],longitude:order.let_lon[0],title:'',iconPath:'../../static/car_icon.png'});
						}
						
						_this.markers[0].id = parseInt(start_delivery_lon[0].split(".")[1]);
						_this.markers[0].latitude = start_delivery_lon[1];
						_this.markers[0].longitude = start_delivery_lon[0];
						_this.markers[0].title = order.start_delivery[1];
						
						_this.markers[1].id = parseInt(end_delivery_lon[0].split(".")[1]);
						_this.markers[1].latitude = end_delivery_lon[1];
						_this.markers[1].longitude = end_delivery_lon[0];
						_this.markers[1].title = order.end_delivery[1];
					}
				},
				fail(error) {
					console.log(error)
				}
			})
			
		},
		methods: {
			orderInfo() {
				uni.navigateTo({
					url: '../userSeeOrderInfo/userSeeOrderInfo?orderId='+this.orderId
				})
			},
			/* createPolyline(start,end) {
				this.qqMapWX.direction({
					mode:"driving",
					from:{
						latitude:start[1],
						longitude:start[0]
					},
					to:{
						latitude:end[1],
						longitude:end[0]
					},
					accuracy:1000,
					success(res) {
						console.log(res);
					},
					fail(fail) {
						console.log(res);
					}
				});
			}, */
			makePhoneCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			}
		}
	}
</script>

<style>
	.btns{
		width: 278upx;
		height: 65upx;
		background: white;
		border-radius: 30px;
		position: fixed;
		bottom: 80upx;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
	}
	.btn_item{
		width: 50%;
		height: 37upx;
		border-right: solid 1px #e7e7e7;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btn_icon{
		width: 30upx;
		height: 35upx;
	}
</style>
