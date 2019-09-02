import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.href = "https://cc.jiangxiruqi.com";
Vue.prototype.serverURL = "https://cc.jiangxiruqi.com/index.php/";
Vue.prototype.mapKey = "FYYBZ-IV3KF-GSOJN-JOPQU-JHOTZ-D6FTM";
Vue.prototype.APPID = "wxadbdaec1160120df";
Vue.prototype.secret = "531b6e231816aa6fe386f0e5fa680a26";

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
