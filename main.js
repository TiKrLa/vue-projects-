import Vue from 'vue';
import App from './App.vue';
import './assets/common.css';

Vue.config.productionTip = false;

// Create event bus to pass data between components 
export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
