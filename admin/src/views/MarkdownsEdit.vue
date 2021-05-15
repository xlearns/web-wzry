<template>
 <div class="container">
     <h1>{{id?"编辑":"新建"}}文章</h1>
     <!-- 
         @submit.native.prevent="save"
         submit事件触发会执行save函数
         native.prevent为取消submit的默认事件
      -->
     <el-form label-width='120px' @submit.native.prevent="save">
          <el-form-item label='所属分类'>
              <!-- 
                  上级请求列表接口
               -->
            <el-select v-model='model.categories' multiple>
                <!-- 
                    显示的是item.name
                    关联用item._id
                 -->
                <el-option v-for="item in categories" :key='item._id' :label="item.name" :value="item._id"></el-option>    
            </el-select>    
         </el-form-item> 
         <el-form-item label='标题'>
            <el-input v-model='model.title'></el-input>    
         </el-form-item>
          <el-form-item label='详情'>
          <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
         </el-form-item>  
         <el-form-item>
             <el-button type='primary' native-type='submit'>保存</el-button>
         </el-form-item>
     </el-form>
 </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
 props:{
     //接受路由传递过来的值
     id:{type:String}
 },
 data() {
  return {
      model:{},
      categories:[]
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
    this.fetchCategories()
 },
 methods:{ 
     async handleImageAdded(file, Editor, cursorLocation, resetUploader){
     //=>html:new FormData()自带的表单提交数据
     //=>提交数据有两种方式：一种是提交表单数据、另一种是提交json数据
     //=>因为要上传文件所有这里要使用表单数据 既然new FormData()
      const formData = new FormData();
     //append 添加字段
      formData.append("file", file);
     //存储图片
      const res = await this.$http.post("upload",formData)
     //将存储的图片url发送到图标所在的位置上。Editor.insertEmbed 为VueEditor内置方法参数1为光标所在的位置。参数2为类型。参数3为图片的url地址
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();  
    },
     async fetch(){
      //根据id查询数据
      const res = await this.$http.get(`rest/markdowns/${this.id}`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      this.model = res.data;
      console.log(this.model)
     },
     async save(){
        if(this.id){
          await this.$http.put(`rest/markdowns/${this.id}`,this.model)   
        }else{
          await this.$http.post('rest/markdowns',this.model)
        }
       this.$router.push("/markdowns/list")
       this.$message({
           type:"success",
           message:"保存成功"
       })
     },
     async fetchCategories(){
      //根据id查询数据
      const res = await this.$http.get(`rest/categories`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      this.categories=res.data
     }
 },
 components: {
  VueEditor
 }
}
</script>

<style scoped lang="scss">

</style>
