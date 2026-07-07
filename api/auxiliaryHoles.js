import request from '@/utils/request'
const api_name ='/auxiliaryHoles'
export default{
    //计算辅助孔
    getAuxHoles(getData){
        return request({
            url: `${api_name}/get_aux_holes`,
            method: 'post',
            data: getData
        })
    },
  //计算中下台阶辅助孔
  get_down_mid_aux(getData){
    return request({
      url: `${api_name}/get_down_mid_aux`,
      method: 'post',
      data: getData
    })
  },
    //保存辅助孔
    saveAuxHoles(datas){
        return request({
            url: `${api_name}/save_aux_holes`,
            method: 'post',
            data: datas
        })
    },

    //查询辅助孔
    readAuxHoles(projectId){
        return request({
            url: `${api_name}/read_aux_holes/${projectId}`,
            method: 'get'
        })
    },

    //根据下台阶的projectId查询与之关联的上台阶的辅助孔
    upAuxInfo(projectId){
        return request({
            url: `${api_name}/up_aux_info/${projectId}`,
            method: 'get'
        })
    },
}
