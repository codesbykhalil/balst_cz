import axios from 'axios'
import cookie from 'js-cookie'
// 创建axios实例
const service = axios.create({
withCredentials: true,
// baseURL: 'http://localhost:8091',
baseURL: 'http://111.229.115.234:8089',//后端服务器ip
// baseURL: 'http://111.229.115.234:8091',//后端服务器ip
  // baseURL: 'http://localhost:8088',
timeout: 20000, // 请求超时时间
})
let globalReferer = '';
service.interceptors.request.use(
    config => {
        if (cookie.get('user_token') && cookie.get('isAutoMode')!=0) {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
            config.headers['token'] = cookie.get('user_token');
         }
            return config
            },
            error => {
            return Promise.reject(error);
        }
);
//响应拦截器
service.interceptors.response.use(
    response => {
    //debugger
    if (response.data.msg == "not login") {
        console.log("未登录")
        // 返回 错误代码-1 清除ticket信息并跳转到登录页面
        //debugger
        alert("请先登录！")
        window.location.href="/login"
        return
    }else{
        return response;
    }
    },
    error => {
        console.log(error.data)
    return Promise.reject(error.response) // 返回接口返回的错误信息
});
export default service
