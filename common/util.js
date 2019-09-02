/* function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
} */

function formatTime(date) {
	/* console.log(date); */
	var time = new Date(parseInt(date)*1000);
	var formatNumber = '';
	var year = time.getFullYear()
	var month = time.getMonth() + 1
	var day = time.getDate()
	 
	return year+'-'+month+'-'+day;
}

function formatDate(date) {
	/* console.log(date); */
	var time = new Date(parseInt(date)*1000);
	var formatNumber = '';
	var year = time.getFullYear()
	var month = addZero(time.getMonth() + 1)
	var day = addZero(time.getDate())
	var h = addZero(time.getHours());	//时
	var M = addZero(time.getMinutes());	//分
	 
	return year+'-'+month+'-'+day + ' ' + h + ':' + M ;
}

function addZero(num) {
	if(num<10){
		return '0'+num;
	} else {
		return num
	}
}

function contrastDate(date){
	var time = formatTime(date);
	var d = new Date();
    var y = d.getFullYear(); // 年
    var m = d.getMonth() + 1; // 月份从0开始的
    var d = d.getDate(); //日
    return time == (y + '-' + m + '-' + d);
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}

//判断日期是否大于今天
function isOverdue(time){
	var today = new Date().getTime();
	var time = parseInt(time)*1000;
	if(time<today){
		return true;
	} else {
		return false;
	}
}

// 判断选择的日期是否小于今天
function xiaoYuToday(date) {
	var today = new Date().getTime();
	var time = new Date(date).getTime();
	if(time>=today){
		return true;
	} else {
		return false;
	}
}


var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	contrastDate: contrastDate,
	isOverdue:isOverdue,
	formatDate:formatDate,
	xiaoYuToday:xiaoYuToday
}
