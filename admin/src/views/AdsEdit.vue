<template>
 <div class="container">
     <h1>{{id?"编辑":"新建"}}广告位</h1>
     <!-- 
         @submit.native.prevent="save"
         submit事件触发会执行save函数
         native.prevent为取消submit的默认事件
      -->
     <el-form label-width="120px" @submit.native.prevent="save">
         <el-form-item label='名称'>
            <el-input v-model='model.name'></el-input>    
         </el-form-item> 
         <el-form-item label='广告'>
                 <el-button type='default' size='small' @click='model.items.push({})'><i class="el-icon-plus"></i>添加广告</el-button>
          <el-row type='flex' style='flex-wrap:wrap'>
            <!-- 
              element:
              24表示全宽
             -->
              <el-col :md="24" v-for="(item,i) in model.items" :key='i'>
                <el-form-item label="跳转链接URL">
                  <el-input v-model='item.url'></el-input>
                </el-form-item>
                  <el-form-item label="图片" style='margin-top:0.5rem'>
                    <!-- 
                       如果用item.icon=res.url。vue会不渲染。出现的原因，因为只在data里面定义了item而直接给它的icon赋值因为本身item.icon为空所有即使赋值成功。vue不会渲染。解决办法:
                       $set(item,'icon',res.url)
                     -->
                  <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item,'image',res.url)">
                  <img v-if="item.image" :src="item.image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>  
                </el-form-item>
                <el-form-item>
                  <el-button type='danger' size='small' @click='model.items.splice(i,1)'>删除</el-button>
                </el-form-item>
              </el-col>
            </el-row> 
         </el-form-item> 
         <el-form-item>
             <el-button type='primary' native-type='submit'>保存</el-button>
         </el-form-item>
     </el-form>
 </div>
</template>

<script>
export default {
 props:{
     //接受路由传递过来的值
     id:{type:String}
 },
 data() {
  return {
      model:{
          items:[]
      },
  }
 },
 created(){
     /* 
        true  && false =>false
        false && true => false
        true  || false =>true
        false || true =>true 
     */
    this.id && this.fetch() //=> 如果this.id 为true 既存在的时候执行this.fetch函数
 },
 methods:{
     async fetch(){
      //根据id查询数据
      const res = await this.$http.get(`rest/ads/${this.id}`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      this.model =Object.assign({},this.model,res.data)
      console.log(this.model)
     },
     async save(){
        if(this.id){
          await this.$http.put(`rest/ads/${this.id}`,this.model)   
        }else{
          await this.$http.post('rest/ads',this.model)
        }
       this.$router.push("/ads/list")
       this.$message({
           type:"success",
           message:"保存成功"
       })
     }
 },
 components: {

 }
}
</script>

<style scoped lang="scss">

</style>
