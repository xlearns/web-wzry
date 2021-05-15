<template>
 <div class="container">
     <div class="topbar bg-black py-2 px-3 d-flex ai-center">
           <img src="../assets/logo.jpg" alt="" height="30">
            <div class="px-2 flex-1">
                <!-- 
                    flex:1;
                    占据剩余得空间
                 -->
                <div class="text-white">王者荣耀</div>
                <div class="text-grey-1 fs-xxs">团队成绩更多</div>
            </div>
            <button type='button' class="btn bg-primary">立即下载</button>
     </div>
    <div class=" bg-primary pt-3 pb-2">
            <div class="nav nav-inverse pb-1 jc-around">
                <!-- 
                    justify-content:space-around 子容器沿主轴均匀分布 首位有距离
                    -----between 子容器沿主轴均匀分布，位于首尾两端的子容器与父容器无距离
                 -->
                <div class="nav-item  active">
                    <router-link class="nav-link" tag="div" to="/">首页</router-link>
                </div>
                 <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
                </div>
                 <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
                </div>
            </div>
    </div>

    <router-view :key="$route.path"></router-view>  
 </div>
</template>

<script>
export default {
 data() {
  return {

  }
 },
 components: {

 }
}
</script>

<style scoped lang="scss">
    .topbar{
        //吸顶效果
        position:sticky;
        top:0;
        z-index: 999;
    }
</style>
