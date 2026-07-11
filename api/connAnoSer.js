import request from '@/utils/request'

// http://47.108.197.105:5000/api/v2/get_excavate_plan
// http://202.115.65.7:9500 /get_topic_4_info_verify/
// http://39.101.79.114:5000/api/v4/get_decision_result
const api_name ='/api/v2'

export default{
    //获取开挖方法
    getExcavatePlan(){
        return request({
            url: `${api_name}/get_excavate_plan`,
            baseURL:'http://101.37.147.243/api/v2',
            method: 'get',
        })
    },
    //临时接口获取开挖方法
    getDecisionResult(){
        return request({
            url: `/api/v4/get_decision_result`,
            baseURL:'http://101.37.147.243/api/v4',
            method: 'post',
        })
    },
    //课题组一调取数据登录,身份鉴权token获取
    info_Verify(userData){
        return request({
            url: `/get_topic_4_info_verify/`,
            baseURL:'https://www.znfj.top:8443/api',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;'
             },
            data: userData,
            method: 'post'
        })
    },
    //调取隧道工作面名、围岩参数
    get_Info(workData,token){
        return request({
            url: `/get_topic_4_info/`,
            baseURL:'https://www.znfj.top:8443/api',
            data: workData,
            headers: {
                'authorization': token
             },
            method: 'post'
        })
    },
    //数据推送接口
    get_Data(workData){
        return request({
            url: `/get_topic_4_data/`,
            baseURL:'https://www.znfj.top:8443/api',
            data: workData,
            headers: {
                'Authorization': '85A1AC7C1F3430D8'
             },
            method: 'post'
        })
    },
  listOverbreakData(){
    return request({
      url: `/listOverbreakData`,
      baseURL:'http://m11g444059.oicp.vip:18793/quality',
      method: 'get',
    })
  },

}
