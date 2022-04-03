import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThermometer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faThermometer);
Vue.component('faIcons', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({

  router,
  library,
  render: h => h(App)
}).$mount('#app')
