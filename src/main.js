import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/iconfont'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTippy, { TippyComponent } from "vue-tippy";
import Vtip from 'vtip'
import 'vtip/lib/index.min.css'


Vue.config.productionTip = false

Vue.use(Vtip.directive)
Vue.use(VueAxios, axios)
Vue.use(VueTippy, {
  animateFill: false,
  animation : 'fade',
  trigger : 'click',
  arrow : true
});
Vue.component("tippy", TippyComponent);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
