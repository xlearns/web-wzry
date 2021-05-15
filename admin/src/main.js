import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
import "./style.css"
Vue.prototype.$http=http
Vue.config.productionTip = false


//mixin 代码块 让每一个vue实例拥有这些东西
//最好使用methods 如果使用data属性的话。会导致数据更新不了
Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  },
  methods:{
    getAuthHeaders(){
      return{
        Authorization:`Bearer ${localStorage.token||""}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
