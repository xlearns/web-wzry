<template>
  <div class="card bg-white p-3 mt-3">
        <div class="card-header d-flex ai-center "
        :class="{'border-bottom':!plain,'pb-3':!plain}"
        >
              <i class="iconfont" :class="`icon-${icon}`"></i>
              <div class="fs-xl flex-1 px-2"><strong>{{title}}</strong></div>
              <i class="iconfont icon-more2" v-if="!plain"></i>
        </div>
        <div class="card-body pt-3">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props:{
    //required表示必添
    plain:{type:Boolean},
    title:{type:String,required:true},
    icon:{type:String,required:true}

  },
 data() {
  return {

  }
 },
 components: {

 }
}
</script>

<style scoped lang="scss">
 @import "../assets/scss/var.scss";
 .card{
   /*  .card-header{
      border-bottom: 1px solid $border-color;
    } */
     border-bottom: 1px solid $border-color;
 }
</style>
