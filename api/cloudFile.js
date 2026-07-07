import request from '@/utils/request'

const api_name ='/project'
export default{
    //导入云端文件功能
    getAllData(userId){
        return request({
            url: `${api_name}/getAllData/${userId}`,
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
    }
}
