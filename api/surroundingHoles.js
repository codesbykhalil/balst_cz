import request from '@/utils/request'

const api_name ='/surroundingHoles'
export default{
  //计算所有周边孔的排距和光爆层厚度
  arrayRow(datas){
    return request({
      url: `${api_name}/array_row`,
      data:datas,
      method: 'post'
    })
  },

  //计算周边孔
  getSurrounding(tableData){
    return request({
      url: `${api_name}/get_surrounding`,
      data: tableData,
      method: 'post'
    })
  },
  /*长短孔的周边孔计算*/
  short_long_sur(datas){
    return request({
      url: `${api_name}/array_row/short_long_sur`,
      data:datas,
      method: 'post'
    })
  },
  get_short_long_surrounding(tableData){
    return request({
      url: `${api_name}/get_short_long_surrounding`,
      data: tableData,
      method: 'post'
    })
  },
  //保存周边孔
  saveSurrounding(tableData){
    return request({
      url: `${api_name}/save_surrounding`,
      data: tableData,
      method: 'post'
    })
  },

  //查询周边孔
  readSurrounding(projectId){
    return request({
      url: `${api_name}/read_surrounding/${projectId}`,
      method: 'get'
    })
  },

  //根据下台阶的projectId查询与之关联的上台阶的周边孔
  upSurInfo(projectId){
    return request({
      url: `${api_name}/up_sur_info/${projectId}`,
      method: 'get'
    })
  },
}
