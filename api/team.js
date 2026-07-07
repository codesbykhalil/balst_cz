import request from '@/utils/request'
const api_name ='/team'
export default{
  //获取超欠挖数据
  listOverbreakData(tunnelName){
    return request({
      url: `http://m11g444059.oicp.vip:18793/quality/listOverbreakData/${encodeURIComponent(tunnelName)}`,
      method: 'post',
    })
  },
  //轮询接收project1的数据，由课题一请求
  getNewProject1Info(){
    return request({
      url: `${api_name}/project1/get_new_info`,
      method: 'get',
    })
  },
  saveDataFromP1(infoData){
    return request({
      url: `${api_name}/project1/save_data`,
      method: 'post',
      data: infoData
    })
  },
  submitDataToP1(projectId){
    return request({
      url: `${api_name}/project1/submit_data/${projectId}`,
      method: 'get',
    })
  },
  //登录铁建重工系统获取token
  getLoginData(){
    return request({
      url: `${api_name}/project3/get_login_data`,
      method: 'post',
    })
  },
  //上传数据，传输给铁建重工的课题三
  submitDataToP3(projectId){
    return request({
      url: `${api_name}/project3/submit_data`,
      method: 'post',
      data: projectId
    })
  },
  //推送数据给课题六
  submitDataToP6(projectId){
    return request({
      url: `${api_name}/project6/submit_data/${projectId}`,
      method: 'get',
    })
  },
  //推送起爆顺序和一些project的其他信息
  giveDataToP6(projectId){
    return request({
      url: `${api_name}/project6/submit_data/${projectId}`,
      method: 'get'
    })
  },
  giveDataToP6Two(projectId){
    return request({
      url: `${api_name}/project6/submit_data2/${projectId}`,
      method: 'get'
    })
  },
  //推送起爆顺序和一些project的其他信息
  pushLogData(jsonParam){
    return request({
      url: `${api_name}/project6/push_log_data`,
      data: jsonParam,
      method: 'post'
    })
  },
  //通过里程id查询课题一的信息
  getDataFromP1(mileageId){
    return request({
      url: `${api_name}/project1/get_data/${mileageId}`,
      method: 'get'
    })
  },
  //通过里程id查询课题二的信息
  getDataFromP2(mileageId){
    return request({
      url: `${api_name}/project2/get_data/${mileageId}`,
      method: 'get'
    })
  },
}
