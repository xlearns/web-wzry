<template>
 <div class="container">
     <h1>{{id?"编辑":"新建"}}英雄</h1>
     <!-- 
         @submit.native.prevent="save"
         submit事件触发会执行save函数
         native.prevent为取消submit的默认事件
      -->
     <el-form @submit.native.prevent="save" label-width='120px'>
       <!-- 
         el:
         el-tabls -> value="name" el-tab-pane-> name="name"
        -->
         <el-tabs value='information' type='border-card'>
           <el-tab-pane label="基本信息" name='information'>
             <el-form-item label='名称'>
            <el-input v-model='model.name'></el-input>    
         </el-form-item>
          <el-form-item label='称号'>
            <el-input v-model='model.title'></el-input>    
         </el-form-item>
          <el-form-item label='头像'>
             <!-- 
                  el:
                  action="上传的图片地址" 
                  :on-success 成功之后执行的函数
                  :before-upload 上传之前做什么
                  $http.defaults.baseURL //$http.defaults表示默认参数

                  :on-success="res=>model.avatar=res.url"问题
                  在model.avatar不存在的时候可能会赋不上
              -->
            <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL+'/upload'"
            :show-file-list="false"
            :headers="getAuthHeaders()"
            :on-success="res=>$set(model,'avatar',res.url)">
            <img v-if="model.avatar" :src="model.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>   
         </el-form-item> 

           <el-form-item label='Banner'>
            <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL+'/upload'"
            :show-file-list="false"
            :headers="getAuthHeaders()"
            :on-success="res=>$set(model,'banner',res.url)">
            <img v-if="model.banner" :src="model.banner" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>   
         </el-form-item> 
         <el-form-item label='类型'>
           <!-- 
             el：
             multiple 多选
            -->
           <el-select v-model='model.categories' multiple>
             <el-option v-for="item of categories" :label="item.name" :value="item._id" :key="item._id"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label='难度'>
           <!-- 
             model.scores->undefinded
             undefined.defficult->error
             如果是这种两级或者两级以上的一定要在date里面提前声明
            -->
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model='model.scores.difficult'></el-rate>    
         </el-form-item>
          <el-form-item label='技能'>
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model='model.scores.skills'></el-rate>    
         </el-form-item>
          <el-form-item label='攻击'>
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model='model.scores.attack'></el-rate>    
         </el-form-item>
          <el-form-item label='生存'>
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model='model.scores.survive'></el-rate>    
         </el-form-item>

         <el-form-item label='顺风出装'>
           <!-- 
             el：
             multiple 多选
            -->
           <el-select v-model='model.items1' multiple>
             <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
           </el-select>
         </el-form-item>

         <el-form-item label='逆风出装'>
           <!-- 
             el：
             multiple 多选
            -->
           <el-select v-model='model.items2' multiple>
             <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="使用技巧">
            <el-input type='textarea' v-model='model.usageTips'></el-input>
         </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type='textarea' v-model='model.battleTips'></el-input>
         </el-form-item>
          <el-form-item label="团战思路">
            <el-input type='textarea' v-model='model.teamTips'></el-input>
         </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name='skills'>
          <el-button type='default' size='small' @click='model.skills.push({})'><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type='flex' style='flex-wrap:wrap'>
              <el-col :md="12" v-for="(item,i) in model.skills" :key='i'>
                <el-form-item label="名称">
                  <el-input v-model='item.name'></el-input>
                </el-form-item>
                  <el-form-item label="图标">
                    <!-- 
                       如果用item.icon=res.url。vue会不渲染。出现的原因，因为只在data里面定义了item而直接给它的icon赋值因为本身item.icon为空所有即使赋值成功。vue不会渲染。解决办法:
                       $set(item,'icon',res.url)
                     -->
                  <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="false"
                  :headers="getAuthHeaders()"
                  :on-success="res => $set(item,'icon',res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>  
                </el-form-item>
                <el-form-item label="冷却值">
                  <el-input v-model='item.delay'></el-input>
                </el-form-item>
                <el-form-item label="消耗">
                  <el-input v-model='item.cost'></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type='textarea' v-model='item.desciption'></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input type='textarea' v-model='item.tips'></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type='danger' size='small' @click='model.skills.splice(i,1)'>删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
        </el-tab-pane> 

  <!--  -->
  <el-tab-pane label="最佳搭档" name='partnes'>
          <el-button type='default' size='small' @click='model.partnes.push({})'><i class="el-icon-plus"></i>添加英雄</el-button>
          <el-row type='flex' style='flex-wrap:wrap'>
              <el-col :md="12" v-for="(item,i) in model.partnes" :key='i'>
                <el-form-item label="英雄">
                  <!-- 
                    filterable 可以输入
                   -->
                  <el-select filterable v-model='item.hero'>
                    <el-option 
                    :label="hero.name"
                    :value="hero._id"
                    v-for='hero in heroes' :key='hero._id'
                    ></el-option> 
                  </el-select>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type='textarea' v-model='item.description'></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type='danger' size='small' @click='model.partnes.splice(i,1)'>删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
        </el-tab-pane> 


  <!--  -->
         </el-tabs>
         <el-form-item style='margin-top:1rem'>
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
      items:[],
      model:{
        skills:[],
        partnes:[],
        name:"",
        heroes:[],
        scores:{
          diffault:0
        },
        avatar:""
      },
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
    this.fetchHero()
    this.fetchItems()
    this.fetchCategories()
    this.id && this.fetch() //=> 如果this.id 为true 既存在的时候执行this.fetch函数
 },
 methods:{
    afterUpload(res){  
      // 数据响应式的问题:this.model一开始是没有数据的空对象。而后期给空对象添加属性可能会引发赋值不上或者vue不渲染 解决办法用vue下面的$set(对象,key,value)方法
      // this.model.icon=res.url 会引发vue不渲染
        this.$set(this.model,"avatar",res.url)
    },
    async fetch(){
      //根据id查询数据
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      // this.model = res.data;//=>问题会覆盖之前在data中定义的categories
      this.model =  Object.assign({},this.model,res.data)//=>参数第一个为空对象。相当于将第二个参数添加到第一个参数里面去也就是空对象里面去。然后再把第3个参数添加到里面去。如果有同名的着覆盖掉。
     },
     async fetchCategories(){
      //根据id查询数据
      const res = await this.$http.get(`rest/Categories`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      this.categories = res.data; 
     },
     async fetchItems(){
      //根据id查询数据
      const res = await this.$http.get(`rest/items`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      this.items = res.data; 
     },
     async fetchHero(){
       const res = await this.$http.get("rest/heroes")
       this.heroes = res.data
     },
     async save(){
        if(this.id){
          await this.$http.put(`rest/heroes/${this.id}`,this.model)   
        }else{
          await this.$http.post('rest/heroes',this.model)
        }
       this.$router.push("/heroes/list")
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

<style>

</style>
