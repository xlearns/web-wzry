import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Content from "../views/Content.vue"
import Hero from "../views/Hero.vue"
import Video from "../views/Video.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {
        path:'/',
        name:"home",
        component:Home
      },{
        path:'/content/:id',
        name:"content",
        component:Content,
        props:true
      },{
        path:'/video/:id',
        name:"video",
        component:Video,
        props:true
      }
    ]
  },{
    path:'/hero/:id',
    name:"hero",
    component:Hero,
    props:true
  }
]

const router = new VueRouter({
  routes
})

export default router
