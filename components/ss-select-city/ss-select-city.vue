<template>
  <view class="select-city-wrap">
		<view class="search">
			<image class="search_icon" src="../../static/search.png"></image>
			<input type="text" placeholder="搜索" confirm-type='搜索' v-model="search" @confirm="searchCity" class="search_ipt" :focus="focus" />
		</view>
    <view class="select-city">
      <view class="index">
        <view class="index-item" @click="scrollTo('#')">#</view>
        <view class="index-item" v-for="item in citys" :key="item.letter" @click="scrollTo(item.letter)">{{item.letter}}</view>
      </view>
      <scroll-view :scroll-into-view="scrollIntoId" :scroll-y="true" :scroll-with-animation="true" :style="{height:windowHeight}">
        <view class="content">
          <view class="section" id="current">
            <view class="city-title">当前城市</view>
            <view class="city-list">
              <view class="city-item" @click="onSelect(current)">{{current}}</view>
							<text class="gps_dw" @click="position">GPS定位</text>
            </view>
          </view>
          <view class="section" id="hot" v-if="hotCitys.length">
            <view class="city-title search_history">
							历史搜索
							<text @click="clearHistory">清空记录</text>
						</view>
            <view class="city-list">
              <view class="city-item" :class="{active: current === city}" v-for="(city, i) in hotCitys" :key="i" @click="historyCityt(city)">{{city}}</view>
            </view>
          </view>
          <view class="section" :id="item.letter" v-for="item in citys" :key="item.letter">
            <view class="letter">{{item.letter}}</view>
            <view class="city-list">
              <view class="city-item" :class="{active: current === city}" v-for="(city,itemIndex) in item.list" :key="itemIndex" @click="onSelect(city)">{{city}}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
  import Citys from './citys'
  export default {
    props: {
      hotCitys: {
        type: Array,
        default () {
          return []
        }
      },
      value: {
        type: String,
        default: '未设置'
      }
    },
    data() {
      return {
				focus:false,
        citys: Citys,
        windowHeight: '',
        scrollIntoId: 'F',
        current: this.value,
				search: ''
      }
    },
    mounted() {
      this.getSystemInfo()
    },
		watch:{
			value(val) {
				this.current = val;
			} 
		},
    methods: {
      getSystemInfo() {
        uni.getSystemInfo().then(res => {
          let [error, data] = res
          this.windowHeight = `${data.windowHeight}px`
        })
      },
      scrollTo(letter) {
        this.scrollIntoId = letter === '#' ? 'current' : letter
      },
      onSelect(city) {
        this.current = city
        this.$emit('input', city)
        this.$emit('on-select', city)
      },
			historyCityt(city){
				this.current = city;
				this.$emit('searchCity', city)
			},
			clearHistory(){
				this.$emit("clearHistory");
			},
			position(){
				this.$emit("position");
				this.current = this.value;
				console.log(this.value);
			},
			searchCity() {
				this.$emit("searchCity",this.search);
			}
    }
  }
</script>

<style lang="scss" scoped>
  .select-city-wrap {
    position: relative;
    padding: 0 30upx;
    background-color: #fff;
  }
	.search{
		width: 100%;
		height: 70upx;
		background: rgb(239, 239, 239);
		border-radius: 30px;
		margin: 20upx 0;
		display: flex;
		align-items: center;
		position: relative;
		.search_ipt{
			padding-left: 100upx;
			width: 100%;
			height: 100%;
			border-radius: 30px;
			color: #6e6e6e;
			font-size: 24upx;
		}
		.search_icon{
			width: 36upx;
			height: 36upx;
			position: absolute;
			left: 40upx;
		}
	}
  .select-city {
    .index {
      position: absolute;
      right: 0;
      bottom: 20upx;
      z-index: 999;
      color: #2f9bfe;
      font-size: 32upx;
      .index-item {
        width: 40upx;
        height: 42upx;
        line-height: 42upx;
        text-align: center;
      }
    }
    .section {
      margin-bottom: 19upx;
      .city-title {
        color: #888888;
        font-size: 20upx;
        margin-bottom: 28upx;
      }
			.gps_dw{
				font-size: 16upx;
				color: #a5a5a5;
				display: flex;
				height: 55upx;
				align-items: center;
			}
			.search_history{
				display: flex;
				justify-content: space-between;
				padding-right: 36upx;
			}
      .letter {
        width: 44upx;
        height: 44upx;
        color: #fff;
        border-radius: 100%;
        background-color: #2f9bfe;
        font-size: 28upx;
        line-height: 44upx;
        text-align: center;
        margin-bottom: 30upx;
      }
      .city-list {
        display: flex;
        flex-wrap: wrap;
        .city-item {
          width: 190upx;
          height: 55upx;
          margin-right: 36upx;
          margin-bottom: 20upx;
          line-height: 55upx;
          text-align: center;
          border: 1px solid #dcdcdc;
          border-radius: 6upx;
          color: #626262;
          font-size: 24upx;
          &.active {
            background-color: #d5ebff;
            border-color: #2f9bfe;
            color: #2f9bfe;
          }
        }
      }
    }
  }
</style>
