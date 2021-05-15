import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'
import router from './router'

//导入vue播放器插件
import VueVideoPlayer from 'vue-video-player'
// require styles
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer)



import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)


import Card from "./components/Card.vue"
Vue.component("m-card",Card)



import ListCard from "./components/ListCard.vue"
Vue.component("list-card",ListCard)


//axios 
import axios from "axios"
Vue.prototype.$http = axios.create({
  baseURL:process.env.VUE_APP_API_URL || '/web/api'
  /*   baseURL:"http://localhost:3000/web/api" */
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
