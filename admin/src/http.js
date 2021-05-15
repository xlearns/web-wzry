import axios from 'axios'
import Vue from "vue"
import router from "./router"

const http = axios.create({
  //线上。Process在开发中是没有的。打包之后才会有。VUE_APP+变量名
  baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    // baseURL:"http://localhost:3000/admin/api"
})

//可以在处理请求之前拦截它们
http.interceptors.request.use(function (config) {
    // Do something before request is sent

    //它会将Authorization挂载到request.headers上面
    //Bearer 表示一种类型，因为不光这一种类型。行业规范
    if(localStorage.token){
      //当然这样解决也不行。如果token是伪造的也会抛出错误
      config.headers.Authorization = "Bearer "+localStorage.token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 

//全局捕获
//http.interceptors.response给所有http请求加个拦截器
http.interceptors.response.use(res=>{
return res
},err=>{
//状态码不是200的都会进入这里
//$message=>elementui的方法 作用显示一个提示
if(err.response.data.message){
    Vue.prototype.$message({
        type:'error',
        message:err.response.data.message
    })
    //这个状态码可以跟后台协商具体多少
    if(err.response.status===401){
      //跳到登入页
      router.push("/login")
    }
}
return Promise.reject(err)
})
export default http