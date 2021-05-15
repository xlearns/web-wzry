<template>
 <div class="container">
     <h1>{{id?"编辑":"新建"}}管理员</h1>
     <!-- 
         @submit.native.prevent="save"
         submit事件触发会执行save函数
         native.prevent为取消submit的默认事件
      -->
     <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label='用户名'>
               <el-input v-model='model.username'></el-input>
         </el-form-item> 
          <el-form-item label='密码'>
               <el-input type='text' v-model='model.password'></el-input>  
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
    //  id:{type:String}
    id:{}
 },
 data() {
  return {
      model:{}
  }
 },
 created(){
    this.id && this.fetch() 
 },
 methods:{
     async fetch(){
      //根据id查询数据
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      this.model = res.data;
      console.log(this.model)
     },
     async save(){
        
        if(this.id){
          await this.$http.put(`rest/admin_users/${this.id}`,this.model)   
        }else{
          await this.$http.post('rest/admin_users',this.model)
        }
       this.$router.push("/admin_users/list")
       this.$message({
           type:"success",
           message:"保存成功"
       })
     },
 },
 components: {

 }
}
</script>

<style scoped lang="scss">

</style>
