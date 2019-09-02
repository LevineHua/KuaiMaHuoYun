<template>
	<view class="km_input" :class="{errorRed:error==1}">
		<view class="input_title">
			{{title}}
		</view>
		<input :type="inputType" v-model="value" :disabled="isDisabled" @blur="inputBlur" class="input_ipt" :class="{text_right: dir==1}" @focus="textDir(0)" />
		<view class="input_unit">{{unit}}</view>
	</view>
</template>

<script>
	export default {
		name:"km-input",
		props:{
			"title":{
				default:''
			},
			"unit":{
				default:' '
			},
			"inputType":{
				default:'text'
			},
			"iptValue":{
				default:''
			},
			"error":{
				default:0
			},
			"isDisabled":{
				default:false
			}
		},
		watch:{
			'iptValue': function(newVal, oldVal){
				this.value = newVal;
			},
			value : function(newVal, oldVal){
                this.$emit("update:iptValue", newVal);
            }
		},
		data() {
			return {
				value: this.iptValue,
				dir:0	//0:字体居左;1:字体居右
			};
		},
		methods:{
			textDir(dir) {
				this.dir = dir;
			},
			inputBlur() {
				this.$emit("inputBlur")
			}
		}
	}
</script>

<style>
	.km_input{
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
		margin: 50upx 0;
	}
	.input_title{
		display: flex;
		align-items: center;
		font-size: 28upx;
	}
	.input_ipt{
		width: 380upx;
		font-size: 24upx;
		text-align: right;
		flex: 1;
		padding-right: 10upx;
	}
	.input_unit{
		color: #139cff;
		font-size: 24upx;
	}
	.text_right{
		text-align: right;
	}
	.km_input.errorRed{
		border-color: red;
	}
</style>
