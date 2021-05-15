<template>
 <div class="container">
     <h1>{{id?"编辑":"新建"}}音乐</h1>
     <el-form @submit.native.prevent="save" label-width='120px'>
        <el-form-item label='所属分类'>  
            <el-select v-model='model.parent'>
                <el-option v-for="item in parentOptions" :key='item._id' :label="item.name" :value="item._id"></el-option>    
            </el-select>   
         </el-form-item> 
         <el-form-item label='标题'>
            <el-input v-model='model.name'></el-input>    
         </el-form-item>
         <el-form-item label='播放量'>
            <el-input v-model='model.number'></el-input>    
         </el-form-item>

         <el-form-item label='音乐封面'>
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

         <el-form-item label='上传音乐'>
        <el-upload 
        :action="uploadUrl" 
        :headers="getAuthHeaders()"
        :show-file-list="false" 
        :on-success="afterAudioUpload" 
        :on-progress="uploadVideoProcess">
          <audio
          width="200px"
          height="200px"
          :src="model.audio"
          v-if="model.audio !='' && videoFlag == false" 
          controls="controls">
          您的浏览器不支持视频播放
          </audio>
              <i v-else-if="model.audio =='' && videoFlag == false"
               class="el-icon-plus avatar-uploader-icon"></i>
              <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
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
      parentOptions:[],
      model:{},
      videoFlag:true,
      videoUploadPercent:0
  }
 },
 created(){
    
    this.id && this.fetch()
    this.fetchParentOptions()
 },
 methods:{
    async fetchParentOptions(){
      
      
      //根据id查询数据
      const res = await this.$http.get(`rest/categories`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      this.parentOptions=res.data
    },
    uploadVideoProcess(event, file, fileList){
    this.videoFlag = true;
    this.videoUploadPercent = Math.floor(event.percent)
    },
    afterUpload(res){  
      // 数据响应式的问题:this.model一开始是没有数据的空对象。而后期给空对象添加属性可能会引发赋值不上或者vue不渲染 1解决办法用vue下面的$set(对象,key,value)方法2在对象中事先定义好
      // this.model.icon=res.url 会引发vue不渲染
        this.$set(this.model,"icon",res.url)
    },
    afterAudioUpload(res){  
      // 数据响应式的问题:this.model一开始是没有数据的空对象。而后期给空对象添加属性可能会引发赋值不上或者vue不渲染 1解决办法用vue下面的$set(对象,key,value)方法2在对象中事先定义好
      // this.model.icon=res.url 会引发vue不渲染

    this.videoFlag = false;
    this.videoUploadPercent = 0;
    if(res.url){
        this.$set(this.model,"audio",res.url)
    }else{
        this.$message.error('音乐上传失败，请重新上传！');
    }
    },
    async fetch(){
     
     
      //根据id查询数据
      const res = await this.$http.get(`rest/audios/${this.id}`);
      //问题: 为啥 this.model.name = res.data.name 不行？
      this.model = res.data;
      console.log(this.model)
       if(this.model.audio ){
         this.videoFlag=false
        
      }
     },
     async save(){
        if(this.id){
          await this.$http.put(`rest/audios/${this.id}`,this.model)   
        }else{
          await this.$http.post('rest/audios',this.model)
        }
       this.$router.push("/audios/list")
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
