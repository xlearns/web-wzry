<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/1f6b68c0e5ced2e09a8202f383a8df96.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/85f968eb2d52b0dbaaf9a1739d786d3b.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/da8f9c245cd42ae4e64d8d85dd794e1b.jpeg" alt>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class=" d-flex flex-wrap ">
            <div class='nav-item mb-3'
            v-for='n in 10'
            :key="n"
            >
            <i class="sprite sprite-story"></i>
            <div class="py-2">爆料站</div>
          </div>
      </div>
      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <!-- 
          justify-content: center;水平居中
          align-items: center;垂直居中
         -->
          <i class="sprite sprite-arrow mr-1"></i>
          <span>收起</span>
      </div>
    </div>
    <!-- end of nav -->


       <list-card icon='cc-menu-circle' title="新闻质询" :categories="newCats">
         <!-- 
           # xxx 表示和子组件和父组件关联
           ->#items ={category}表示取父组件里面的slot为items的category变量
          -->
       <template #items ="{category}">
          <router-link 
          tag="div" 
          :to="`/content/${n._id}`"
          class='py-2 fs-lg d-flex'
          v-for="(n,i) in category.newsList" 
          :key="i">
                <span class="text-info">[{{n.categoryName}}]</span>
                <span class="px-2">|</span>
                <span class='flex-1 text-dark-1 text-ellipse pr-2'>{{n.title}}</span>
                <span class='text-grey-1 fs-sm'>{{n.createdAt|toDate}}</span>
          </router-link>  
       </template> 
           
       </list-card>

         <!-- 
           # xxx 表示和子组件和父组件关联
           ->#items ={category}表示取父组件里面的slot为items的category变量
          -->
      <list-card icon='cc-menu-circle' title="英雄列表" :categories="heroCats">
       <template #items ={category}>
          <div class="yxlb d-flex flex-wrap text-center" style='margin:0 -0.5rem'>
            <router-link
             tag="div"
             :to="`/hero/${n._id}`" 
             class='p-2 text-center'
             style="width:20%" 
             v-for="(n,i) in category.heroList"
             :key="i">
                <img :src="n.avatar" alt="" class="w-100">
                <div>{{n.name}}</div>
            </router-link>   
          </div> 
       </template>      
       </list-card>

        <list-card icon='cc-menu-circle' title="视频列表" :categories="videoCats">
          <template #items ="{category}">
         
      <div class="d-flex flex-wrap videoList" style="margin: 0px;">
      <router-link 
             tag="div"
             :to="`/video/${n._id}`" 
             class='p-2 text-center'
             style="width:50%" 
             v-for="(n,i) in category.videoList"
             :key="i"
      >
          <img :src="n.icon" alt="" class="w-100">
          <div 
            style="
          overflow: hidden;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;"
          >{{n.name}}</div>
         
          <div style="display:flex">
              <i style="background:url(https://game.gtimg.cn/images/yxzj/m/m201706/images/bg/index.png) -10px 10px;line-height:15px;width:15px"></i>
               <span style="flex:1;text-align: left;">{{n.number}}</span>
               <span >03/28</span>
          </div>
      </router-link>

      </div>
     
          </template> 
       </list-card>

       <m-card icon="cc-menu-circle" title="图文攻略"></m-card>


  </div>
</template>

<script>
import dayjs from "dayjs"
export default {
   filters:{
   toDate(val){
     return dayjs(val).format("MM/DD")
   }
 },
  name: 'home',
   data() {
      return {
        swiperOption: {
          pagination: {
            el: '.pagination-home '
          }
        },
       newCats:[],
       heroCats:[],
       videoCats:[]
      }
  },
  methods:{
    async fetchNewCats(){
       const res = await this.$http.get("news/list")
       this.newCats=res.data
    },
    async fetchHeroCats(){
       const res = await this.$http.get("heroes/list")
       res.data.splice(1,1)
       this.heroCats=res.data
    },
    async fetchVideoCats(){
       const res = await this.$http.get("videos/list")
       
       this.videoCats=res.data
       
    },
    async fetchDb(){
       const res = await this.$http.get("heroes/list")
    }
  },
  created(){
    
    this.fetchNewCats()
    this.fetchHeroCats()
    this.fetchVideoCats()
    
  },
  components: {
 
  }
}
</script>

<style lang='scss'>
@import '../assets/scss/var.scss';
.yxlb{
  min-height: 180px;
}

.videoList{
  min-height:150px
}
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons{
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
     width: 25%;
     border-right: 1px solid $border-color;
     //4的倍数
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>