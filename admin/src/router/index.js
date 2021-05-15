import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemsList from '../views/ItemsList.vue'
import ItemsEdit from '../views/ItemsEdit.vue'
import HeroesList from '../views/HeroesList.vue'
import HeroesEdit from '../views/HeroesEdit.vue'
import ArticlesList from '../views/ArticlesList.vue'
import ArticlesEdit from '../views/ArticlesEdit.vue'
import AdsList from '../views/AdsList.vue'
import AdsEdit from '../views/AdsEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import Login from '../views/Login.vue'

import VideosList from '../views/VideosList.vue'
import VideosEdit from '../views/VideosEdit.vue'

import AudiosList from '../views/AudiosList.vue'
import AudiosEdit from '../views/AudiosEdit.vue'


// import MarkdownsList from '../views/MarkdownsList.vue'
// import MarkdownsEdit from '../views/MarkdownsEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/login",
    name:"login",
    component:Login,
    //=>路由限制。给需要公开的添加个meta。不需要的公开的就不添加。
    meta:{isPublic:true}  
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
 
      {
        path: '/categories/create',
        name: 'CategoryEdit',
        component: CategoryEdit
      },
      {
        path: '/categories/list',
        name: 'CategoryList',
        component: CategoryList
      },
      {
        path: '/categories/edit/:id',
        name: 'CategoryEdit',
        component: CategoryEdit,
        props:true //=>表示:id 注入到 CategoryEdit组件中
      },{
        path: '/items/create',
        name: 'itemsEdit',
        component: ItemsEdit
      },
      {
        path: '/items/list',
        name: 'itemsList',
        component: ItemsList
      },
      {
        path: '/items/edit/:id',
        name: 'itemsEdit',
        component: ItemsEdit,
        props:true //=>表示:id 注入到 CategoryEdit组件中
      },
      {
        path: '/heroes/create',
        name: 'heroesEdit',
        component: HeroesEdit
      },
      {
        path: '/heroes/list',
        name: 'heroesList',
        component: HeroesList
      },
      {
        path: '/heroes/edit/:id',
        name: 'heroesEdit',
        component: HeroesEdit,
        props:true //=>表示:id 注入到 CategoryEdit组件中
      },
      {
        path: '/articles/create',
        name: 'ArticlesEdit',
        component: ArticlesEdit
      },
      {
        path: '/articles/list',
        name: 'ArticlesList',
        component: ArticlesList
      },
      {
        path: '/articles/edit/:id',
        name: 'articlesEdit',
        component:ArticlesEdit,
        props:true //=>表示:id 注入到 CategoryEdit组件中
      },
      {
        path: '/ads/create',
        name: 'adsEdit',
        component: AdsEdit
      },
      {
        path: '/ads/list',
        name: 'adsList',
        component:AdsList
      },
      {
        path: '/ads/edit/:id',
        name: 'adsEdit',
        component:AdsEdit,
        props:true //=>表示:id 注入到 CategoryEdit组件中
      },
      {
        path: '/admin_users/create',
        name: 'adminUserEdit',
        component: AdminUserEdit
      },
      {
        path: '/admin_users/list',
        name: 'adminUserList',
        component:AdminUserList
      },
      {
        path: '/admin_users/edit/:id',
        name: 'adminUserEdit',
        component:AdminUserEdit,
        props:true //=>表示:id 注入到 CategoryEdit组件中
      },{
        path: '/videos/create',
        name: 'videosEdit',
        component: VideosEdit
      },
      {
        path: '/videos/list',
        name: 'videosList',
        component: VideosList
      },
      {
        path: '/videos/edit/:id',
        name: 'videosEdit',
        component: VideosEdit,
        props:true //=>表示:id 注入到 CategoryEdit组件中
      },{
        path: '/audios/create',
        name: 'audiosEdit',
        component: AudiosEdit
      },
      {
        path: '/audios/list',
        name: 'audiosList',
        component: AudiosList
      },
      {
        path: '/audios/edit/:id',
        name: 'audiosEdit',
        component: AudiosEdit,
        props:true //=>表示:id 注入到 CategoryEdit组件中
       },
      //{
      //   path: '/markdowns/create',
      //   name: 'markdownsEdit',
      //   component: MarkdownsEdit
      // },
      // {
      //   path: '/markdowns/list',
      //   name: 'markdownsList',
      //   component: MarkdownsList
      // },
      // {
      //   path: '/markdowns/edit/:id',
      //   name: 'markdownsEdit',
      //   component: MarkdownsEdit,
      //   props:true //=>表示:id 注入到 CategoryEdit组件中
      // }
    ]
  },
  
]

const router = new VueRouter({
  routes
})
//每次切换路由的时候要做什么
//导航守卫
router.beforeEach((to,from,next)=>{
  //to=>目标对象
  //from=>来自那个对象
  //next=>要不要进去怎么处理这个东西
  if(!to.meta.isPublic&&!localStorage.token){
      return(next("login"))
  }
  next()
})
export default router
