import request from '@/utils/request'

const api_name ='/excel'
const api_name2='/feedBack'

export default{
    //根据项目id下载炮孔表
    down(projectId){
        return request({
            url: `${api_name}/down/${projectId}`,
            method: 'get'
        })
    },
  //计算全断面楔形起爆顺序
  firingSequence(datas){
    return request({
      url: `blastSeq/firing-sequence`,
      // baseURL:'http://212.64.29.33:5000',
      data: datas,
      method: 'post'
    })
  },
  //计算全断面直控起爆顺序
  StraightSequence(datas){
    return request({
      url: `/straight_sequence`,
      data: datas,
      method: 'post'
    })
  },
  //计算上台阶起爆顺序
  up_sequence(datas){
    return request({
      url: `/up_sequence`,
      baseURL:'http://212.64.29.33:5000',
      data: datas,
      method: 'post'
    })
  },
  //计算中台阶起爆顺序
  md_sequence(datas){
    return request({
      url: `/md_sequence`,
      baseURL:'http://212.64.29.33:5000',
      data: datas,
      method: 'post'
    })
  },
  //计算中台阶起爆顺序
  dw_sequence(datas){
    return request({
      url: `/dw_sequence`,
      baseURL:'http://212.64.29.33:5000',
      data: datas,
      method: 'post'
    })
  },
  returnAdvice(datas){
    return request({
      url: `${api_name2}/returnAdvice`,
      data: datas,
      method: 'post'
    })
  },
}
