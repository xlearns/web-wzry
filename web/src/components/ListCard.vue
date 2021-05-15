<template> 
        <m-card :icon="icon" :title="title">
           <div class="nav jc-between">
             <!-- 
               滑动到
                $refs.list.swiper.slideTo() 表示滚动到那个索引值
              -->
              <div class="nav-item " :class="{active:active===i}" v-for="(n,i) in categories" :key="i" @click="$refs.list.swiper.slideTo(i)">
                <div class="nav-link">
                   {{n.name}}
                </div>
              </div>
             
            </div>
               <!--  -->
              <div class="pt-3">
                <!-- vue中的ref => id
                    在vue中可以通过$refs中找到ref定义的名字
                    swiper.realIndex为swiper提供的真实id
                    slide-change为swiper提供的滑动方法事件
                 -->
                  <swiper ref='list' :options="{autoHeight:true}" @slide-change="()=>active=$refs.list.swiper.realIndex">
                      <swiper-slide v-for="(n,i) in categories" :key="i"> 
                       <slot name='items' :category='n'></slot>
                      </swiper-slide>
                  </swiper>  
              </div>
        </m-card>
</template>

<script>
export default {

 props:{
  
     icon:{type:String,required:true},
     title:{type:String,require:true},
     categories:{type:Array,requrie:true}
 },
 data() {
  return {
      active:0
  }
 },
 components: {

 }
}
</script>

<style lang="scss">

</style>
