import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import './registerServiceWorker'
import router from './router'
import './sass/main.scss'

import store from './store'
import vuetify from './plugins/vuetify';

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://127.0.0.1:8000/api';
Vue.prototype.$apiLogin = 'http://127.0.0.1:8000/oauth';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
