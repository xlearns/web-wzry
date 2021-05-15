<template>
 <div class="container" v-if='data'>
     <div class="d-flex py-3 px-2">
         <div> &lt; </div>
         <strong class="flex-1 pl-2">
             {{data.title}}
         </strong>
         <div class="text-grey fs-xs">
            {{data.createdAt|toDate}}
         </div>
     </div>
     <div v-html='data.body' class="px-3 body"></div>
     <div class="px-3 py-2 border-top">
         <div class="d-flex ai-center">
             <i class="iconfont icon-cc-menu-circle"></i>
             <strong class="text-blue fs-lg ml-2">相关资讯</strong>
         </div>
         <div class="pt-2">
             <router-link v-for="item in data.related"
             class="py-2"
              :to="`/content/${item._id}`"
              tag='div'
              :key='item._id'>{{item.title}}</router-link>
              
         </div>
     </div>
 </div>
</template>

<script>
import dayjs from "dayjs"
export default {
   watch:{
       //解决同一组件不渲染的问题。因为当使用同一组件时create以及生成一次了。不会再触发一次。可以采用watch监听id强制从新获取数据
       id(){
           this.fetchGetContent()
           document.documentElement.scrollTop=0
       }
   },
  filters:{
   toDate(val){
     return dayjs(val).format("YY-MM-DD")
   }
 },
 props:{
      id:{
         required:true
     }
 },
 created(){
     this.fetchGetContent()
 },
 methods:{
     async fetchGetContent(){
       const res = await this.$http.get(`content/${this.id}`);this.data = res.data
       console.log(res.data)
     }
 },
 data() {
  return {
      data:null
  }
 },
 components: {

 }
}
</script>

<style  lang="scss">
.container{
    .body{
        img,iframe{
            max-width: 100%;
            height:auto;
        }
    }  
}

</style>
