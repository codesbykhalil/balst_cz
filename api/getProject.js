import request from '@/utils/request'
const api_name ='/project'

export default {
  getProject(projectId){
    return request({
      url: `${api_name}/get_project/${projectId}`,
      method: 'get'
    })
  },
  Up_Down_Project(projectId) {
    return request({
      url: `${api_name}/up_down_project/${projectId}`,
      method: 'get'
    })
  },
  delProject(projectId){
    return request({
      url: `${api_name}/delete_project/${projectId}`,
      method: 'get'
    })
  },
  //保存相关联项目
  save_relate_project(tableData){
    return request({
      url: `${api_name}/save_relate_project`,
      data: tableData,
      method: 'post'
    })
  },
  //查询相关联项目
  get_relate_project(tableData){
    return request({
      url: `${api_name}/get_relate_project`,
      data: tableData,
      method: 'post'
    })
  },
  delete_relate_project(tableData){
    return request({
      url: `${api_name}/delete_relate_project`,
      data: tableData,
      method: 'post'
    })
  }

}
