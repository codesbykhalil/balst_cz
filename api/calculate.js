import request from '@/utils/request'
const api_name ='/project'
export default{
  getExplosivityIndex(calObj){
    return request({
      url: `${api_name}/get_explosivity_index`,
      method: 'post',
      data: calObj
    })
  },
  //保存工程信息
  saveProject(message){
    return request({
      url: `${api_name}/save_project`,
      method: 'post',
      data: message
    })
  },
  // 根据上台阶保存下台阶
  upDownProject(projectId){
    return request({
      url: `${api_name}/up_down_project/${projectId}`,
      method: 'get'
    })
  },
  //计算单耗
  getUnitCon(projectId){
    return request({
      url: `${api_name}/get_unitCon/${projectId}`,
      method: 'get'
    })
  },
  //铁建重工接口
  //获取登录token
  getLoginData(){
    return request({
      url: `${api_name}/getLoginData`,
      method: 'post',
    })
  },
  get_exp_class(datas){
    return request({
      url: `${api_name}/get_exp_class`,
      method: 'post',
      data: datas
    })
  },
  getCost(message){
    return request({
      url: `/costing/get_cost`,
      method: 'post',
      data: message
    })
  },

}
