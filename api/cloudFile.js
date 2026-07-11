import request from '@/utils/request'

const api_name ='/project'
const team_api_name = '/team'
export default{
    //导入云端文件功能
    getAllData(userId){
        return request({
            url: `${api_name}/getAllData/${userId}`,
            method: 'get'
        })
    },

    // 获取固定用户下的所有工程项目
    getProject1InfoList(userId){
        return request({
            url: `http://111.229.115.234:8090/project/getProject1InfoList/${userId}`,
            method: 'get'
        })
    },

    getAllHole(projectId){
        return request({
            url: `${api_name}/getAllHole/${projectId}`,
            method: 'get'
        })
    },

    // 获取项目详情
    getProject(projectId){
        return request({
            url: `${api_name}/get_project/${projectId}`,
            method: 'get'
        })
    },

    // 根据项目id获取课题一项目补充信息
    getProject1Info(projectId){
        return request({
            url: `${team_api_name}/project1/get_project1Info/${projectId}`,
            method: 'get'
        })
    }
}
