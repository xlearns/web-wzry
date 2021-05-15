<template>
 <div class="login-container">
   <el-card header="请先登入" class="login-card">
     <el-form @submit.native.prevent="login">
       <el-form-item label="用户名">
         <el-input  v-model="model.username"></el-input>
       </el-form-item>
       <el-form-item label="密码">
         <el-input  type='password' v-model="model.password"></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" native-type='submit'>登入</el-button>
       </el-form-item>
     </el-form>
   </el-card>
 </div>
</template>

<script>
export default {
 data() {
  return {
    model:{}
  }
 },
 methods:{
   async login(){
     const res=await this.$http.post("login",this.model)
     //localStorage浏览器一直存储。sessionStorage表示页面关闭就删除掉 localStorage.clear()情空所有localStorage
     localStorage.token = res.data.token
     //跳转到首页
     this.$router.push("/")
     //弹出信息
     this.$message({
       type:"success",
       message:"登入成功"
     })

   }
 }, 
 components: {

 }
}
</script>

<style scoped>
  .login-card{
    width:30rem;
    margin:5rem auto;
  }
</style>
