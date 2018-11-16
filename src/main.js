// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
//import BootstrapVue from 'bootstrap-vue'
import BootstrapVue from 'bootstrap-vue'
/* ...there may be other imports here */
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import VueResource from 'vue-resource'
import Vue2Leaflet from 'vue2-leaflet'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
//add jquery (npm install expose-loader --save):
//import 'expose?$!expose?jQuery!jquery'
//to get around BootstrapVue...
//https://github.com/bootstrap-vue/bootstrap-vue/issues/1201
let originalVueComponent = Vue.component
Vue.component = function(name, definition) {
  if (name === 'bFormCheckboxGroup' || name === 'bCheckboxGroup' ||
      name === 'bCheckGroup' || name === 'bFormRadioGroup') {
    definition.components = {bFormCheckbox: definition.components[0]}
  }
  originalVueComponent.apply(this, [name, definition])
}
//stop to get around BootstrapVue bug

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
Vue.component('icon', Icon);
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(Vue2Leaflet);
Vue.http.options.emulateJSON = true
const http=Vue.http
export default http
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, 
  template: '<App/>',
  components: { App }
})
