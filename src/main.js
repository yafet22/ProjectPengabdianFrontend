import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import './registerServiceWorker'
import router from './router'
import './sass/main.scss'

import store from './store'
import vuetify from './plugins/vuetify';

Vue.use(VueGoogleMaps, {
  load: {
    key:  "AIzaSyC4m3960a0NxbUHCNND05Us9fwb0MSJvoI",
    libraries: 'places,drawing,visualization' 
  },
})

Vue.prototype.$http = Axios;
// Vue.prototype.$imageUrl = 'http://127.0.0.1:8000';
Vue.prototype.$imageUrl = 'https://api-gis.ercasystem.com';
// Vue.prototype.$apiUrl = 'http://127.0.0.1:8000/api';
Vue.prototype.$apiUrl = 'https://api-gis.ercasystem.com/api';
// Vue.prototype.$apiLogin = 'http://127.0.0.1:8000/oauth';
Vue.prototype.$apiLogin = 'https://api-gis.ercasystem.com/oauth';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
