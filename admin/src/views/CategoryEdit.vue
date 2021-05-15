<template>
 <div class="container">
     <h1>{{id?"编辑":"新建"}}分类</h1>
     <!-- 
         @submit.native.prevent="save"
         submit事件触发会执行save函数
         native.prevent为取消submit的默认事件
      -->
     <el-form @submit.native.prevent="save">
          <el-form-item label='上级'>
              <!-- 
                  上级请求列表接口
               -->
            <el-select v-model='model.parent'>
                <!-- 
                    显示的是item.name
                    关联用item._id
                 -->
                <el-option v-for="item in parentOptions" :key='item._id' :label="item.name" :value="item._id"></el-option>    
            </el-select>    
         </el-form-item> 
         <el-form-item label='名称'>
            <el-input v-model='model.name'></el-input>    
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
      model:{},
      parentOptions:[]
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
    this.fetchParentOptions()
 },
 methods:{
     async fetch(){
      //根据id查询数据
      const res = await this.$http.get(`rest/categories/${this.id}`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      this.model = res.data;
      console.log(this.model)
     },
     async save(){
        if(this.id){
          await this.$http.put(`rest/categories/${this.id}`,this.model)   
        }else{
          await this.$http.post('rest/categories',this.model)
        }
       this.$router.push("/categories/list")
       this.$message({
           type:"success",
           message:"保存成功"
       })
     },
     async fetchParentOptions(){
      //根据id查询数据
      const res = await this.$http.get(`rest/categories`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      this.parentOptions=res.data
     }
 },
 components: {

 }
}
</script>

<style scoped lang="scss">

</style>
