import request from '@/utils/request'

const api_name ='/overExcavation'
export default{
    //块度预测
    fragmentationPrediction(projectId){
        return request({
            url: `/project/fragmentation_prediction/${projectId}`,
            method: 'get'
        })
    },

    //计算超挖量
    calOverExcavation(projectId){
        return request({
            url: `${api_name}/calOverExcavation/${projectId}`,
            method: 'get'
        })
    },
}