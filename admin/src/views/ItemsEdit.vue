<template>
 <div class="container">
     <h1>{{id?"编辑":"新建"}}物品</h1>
     <!-- 
         @submit.native.prevent="save"
         submit事件触发会执行save函数
         native.prevent为取消submit的默认事件
      -->
     <el-form @submit.native.prevent="save" label-width='120px'>
         <el-form-item label='名称'>
            <el-input v-model='model.name'></el-input>    
         </el-form-item>
         <el-form-item label='图标'>
             <!-- 
                  el:
                  action="上传的图片地址" 
                  :on-success 成功之后执行的函数
                  :before-upload 上传之前做什么
                  $http.defaults.baseURL //$http.defaults表示默认参数
              -->
              <!-- 
                el::action
                因为是是el自带的方法。所有没用用到axios
                所有并不会有token
               -->
            <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUpload">
            <img v-if="model.icon" :src="model.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>   
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
      model:{}
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
    afterUpload(res){  
      // 数据响应式的问题:this.model一开始是没有数据的空对象。而后期给空对象添加属性可能会引发赋值不上或者vue不渲染 1解决办法用vue下面的$set(对象,key,value)方法2在对象中事先定义好
      // this.model.icon=res.url 会引发vue不渲染
        this.$set(this.model,"icon",res.url)
    },
    async fetch(){
      //根据id查询数据
      const res = await this.$http.get(`rest/items/${this.id}`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      this.model = res.data;
      console.log(this.model)
     },
     async save(){
        if(this.id){
          await this.$http.put(`rest/items/${this.id}`,this.model)   
        }else{
          await this.$http.post('rest/items',this.model)
        }
       this.$router.push("/items/list")
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
