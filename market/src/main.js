import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ajaxs from "./api/index.js"
import qs from "qs";
import moment from 'moment'
import $ from 'jquery'
import LetItSnow from 'vue-let-it-snow';

Vue.prototype.$ = $;
Vue.prototype.$moment = moment;
Vue.prototype.$http = ajaxs;
Vue.prototype.qs = qs;
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
