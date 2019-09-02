<template>
	<view class="calendar-content">
		<view class="calendar-mask">
			<view class="calendar-box" @click.stop="">
				<uni-calendar :lunar="tags['lunar'].checked" :fixedHeihgt="tags['fixedHeihgt'].checked" :slide="slide" :disableBefore="tags['disableBefore'].checked" :start-date="startDate" :end-date="endDate" :date="date" @change="change" @to-click="toClick" />
			</view>
		</view>
		<view class="km_select_main">
			<view class="km_select" @click="showMulLinkageTwoPicker">
				<view class="select_title">
					<image class="select_icon" src="../../static/time.png"></image>
					请选择具体装货时间
				</view>
				<view class="address_city">
					{{start_time}}
					<image class="select_right" src="../../static/right.png"></image>
				</view>
			</view>
		</view>
		<view class="select_btn" @click="selectedTime()">确定</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import kmSelect from '../../components/km-select.vue'
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import timeData from '../../common/time.data.js';
	import util from '../../common/util.js'
	export default {
		components: {
			uniCalendar,
			kmSelect,
			mpvuePicker
		},
		data() {
			/**
			 * 时间计算
			 */
			function getDate(date, AddDayCount = 0) {
				if (typeof date !== 'object') {
					date = date.replace(/-/g, '/');
				}
				let dd = new Date(date);
				dd.setMonth(dd.getMonth() + AddDayCount); // 获取AddDayCount天后的日期
				let y = dd.getFullYear();
				let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
				let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
				return y + '-' + m + '-' + d;
			}
			return {
				slide: 'vertical',
				date: '',
				startDate: '',
				endDate: '',
				timeData: {},
				start_time:'',
				pickerValueArray:[],
				mulLinkageTwoPicker: timeData,
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
			};
		},
		onLoad() {},
		methods: {
			toggle(index, item) {
				this.tags[index].checked = !item.checked;
				// item.checked = !item.checked;
				if (index === 'horizontal') {
					this.tags['vertical'].checked = false;
				}
				if (index === 'vertical') {
					this.tags['horizontal'].checked = false;
				}
				// this.attribute[item.attr] = !item.checked;
			},
			change(e) {
				var _this = this;
				this.timeData = e;
				uni.request({
					url:_this.serverURL+'home/index/erp_time',
					method:"POST",
					data:{
						set_time:e.fulldate
					},
					success(res) {
						uni.setStorageSync("componentTime", res.data.time);
					}
				})
			},
			toClick(e) {
				var _this = this;
				this.timeData = e;
				uni.request({
					url:_this.serverURL+'home/index/erp_time',
					method:"POST",
					data:{
						set_time:e.fulldate
					},
					success(res) {
						uni.setStorageSync("componentTime", res.data.time);
					}
				})
				
			},
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.start_time = (e.value[0]>=10?(e.value[0]):('0'+e.value[0])) + ':' + (e.value[1]>=10?(e.value[1]):('0'+e.value[1]))
			},
			onCancel(e) {
				console.log(e)
				this.start_time = (e.value[0]>=10?(e.value[0]):('0'+e.value[0])) + ':' + (e.value[1]>=10?(e.value[1]):('0'+e.value[1]))
			},
			selectedTime() {
				uni.setStorageSync("componentTimeInfo", this.start_time);
				uni.navigateBack();
			}
		}
	};
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		font-size: 32upx;
		line-height: 32upx;
		color: #777;
		margin: 40upx 25upx;
		position: relative
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 0 40upx
	}

	page {
		background: #fff;
	}

	.calendar-content {
		/* padding: 20upx 0;
		padding-bottom: 60upx; */
		font-size: 26upx;
	}

	.calendar-content>.calendar-title {
		line-height: 80upx;
		/* font-weight: bold; */
		color: #666;
		font-size: 32upx;
		/* border-left: 2px #0d9ebb solid; */
		/* padding-left: 20upx; */
		margin: 0 20upx;
	}

	.calendar-tags-group {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 0 10upx;
	}

	.calendar-tags {
		width: 50%;
		box-sizing: border-box;
	}

	.calendar-tags-item {
		padding: 10upx 20upx;
		border: 1px rgba(0, 0, 0, .2) solid;
		color: #333;
		border-radius: 10upx;
		text-align: center;
		margin: 10upx;
		background: #f8f8f8;
	}

	.calendar-tags-item:active {
		background: #f8f8f8;
	}

	.checked .calendar-tags-item {
		background: rgb(0, 122, 255);
		;
		color: #fff;
		border: 1px rgba(0, 0, 0, 0.1) solid;
	}

	.calendar-button {
		margin: 10upx 20upx;
	}

	.calendar-info {
		padding: 0 20upx;
	}

	.calendar-mask {
		/* position: fixed; */
		/* #ifdef H5 */
		top: 45px;
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
		bottom: 0;
		display: flex;
		align-items: center;
		width: 100%;
		background: rgba(0, 0, 0, 0.4);
	}

	.calendar-box {
		/* margin: 20upx; */
		border: 1px #f5f5f5 solid;
		/* border-radius: 10upx; */
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #fff;
	}

	.calendar-button-groups {
		position: absolute;
		width: 100%;
		bottom: 0;
		display: flex;
	}

	.calendar-button-confirm {
		width: 50%;
		margin: 10upx;
		border: 1px #eee solid;
		font-size: 32upx;
	}

	.calendar-button-confirm:after {
		border: none;
	}
	.km_select_main{
		padding: 0 30upx;
	}
	.km_select{
		width: 100%;
		height: 83upx;
		border-radius: 30px;
		border: solid 1px #d7d7d7;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #139cff;
		font-size: 24upx;
		padding: 20upx;
		padding-right: 40upx;
		box-sizing: border-box;
		margin: 30upx 0 20upx;
	}
	.select_title{
		display: flex;
		align-items: center;
	}
	.select_icon{
		width: 28upx;
		height: 28upx;
		margin-right: 25upx;
	}
	.select_right{
		width: 18upx;
		height: 35upx;
		margin-left: 20upx;
	}
	.address_city{
		display: flex;
		align-items: center;
	}
	.select_btn{
		color: white;
		background: #139CFF;
		width: 312upx;
		height: 63upx;
		font-size: 24upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30px;
		margin: 0 auto;
	}
</style>