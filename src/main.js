import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vuetify from 'vuetify/lib'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.filter("dosdecimales", (value, decimals = 2) => {
  console.log(parseInt(value).toFixed(decimals).toLocaleString());
  return parseInt(value).toFixed(decimals).toLocaleString();
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
