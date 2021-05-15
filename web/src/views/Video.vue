<template>
 <div class="container" v-if='data'>

  <video-player  class="video-player vjs-custom-skin"
  ref="videoPlayer" 
  :playsinline="true" 
  :options="playerOptions"
></video-player>

<!--  -->
<div class="d-flex ai-center" style="padding: 15px;border: 1px solid rgb(212, 217, 222);margin: 12px 4px;">
<img style="height:15vh" src="http://game.gtimg.cn/images/yxzj/web201605/main/default_head.jpg" alt="" id="sFaceUrl">
<div class="d-flex flex-wrap" style="height: 15vh;color: rgb(150, 150, 150);font-size: 0.9rem;">
                {{data.name}}
                <p>投稿：<span>169</span>&nbsp;&nbsp;粉丝：<span>0</span></p>
                <p style="width: 200px;">个性签名：</p>
    </div>
</div>
<!--  -->
  <list-card icon='cc-menu-circle' style="background:#f1f1f1" title="猜你喜欢" :categories="videoCats">
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

       
 </div>
</template>

<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
 props:{
      id:{
         required:true
     }
 },
 created(){
     this.fetchGetContent()
     this.fetchVideoCats()
 },
 methods:{
     async fetchGetContent(){
       const res = await this.$http.get(`video/${this.id}`);
       const resData = res.data
       this.data = resData
       this.playerOptions.poster =resData.icon
       this.playerOptions.sources[0].src =resData.video
        console.log(this.playerOptions.sources)
    //    console.log(res.data)
     },async fetchVideoCats(){
       const res = await this.$http.get("videos/list")
       
       this.videoCats=res.data
       
    },
 },
 data() {
  return {
         data:null,
         videoCats:[],
         playerOptions: {
          // videojs options
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: ""
          }],
          poster: "/static/images/author.jpg",
        }
  }
 },
 components: {
  videoPlayer 
 }
}
</script>

<style  lang="scss">
.container{
//   .video-player,video,.vjs-tech,.vjs-poster{
//        width:100%;
//        height:200px
//    } 
    .video-js {
    width: 100% !important;
    height: 150px !important;
   }
   .vjs-big-play-button{
    top: 50%;
    left: 50%;
    margin-left: -1.5em;
    margin-top: -1em;
    background-color: rgba(0,0,0,.45);
    font-size: 3.5em;
    height: 2em!important;
    line-height: 2em!important;
    margin-top: -1em!important;
   }
}

</style>
