import request from '@/utils/request'

const api_name ='/user'
export default{
    queryLogs(userData){
        return request({
            url: `${api_name}/queryLogs`,
            data: userData,
            method: 'post'
        })
    },
    doLogin(formData){
        return request({
            url: `${api_name}/login`,
            data: formData,
            method: 'post'
        })
    },

    //token获取用户信息
    getUserInfo(){
        return request({
            url: `${api_name}/getLoginInfo`,
            method: 'get'
        })
    },

    //退出系统
    logOutSystem(){
        return request({
            url: `${api_name}/logout`,
            method: 'get'
        })
    },
}