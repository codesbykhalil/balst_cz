import request from '@/utils/request'

const api_name ='/cutting'
const api_name2 ='/cuttingArray'
const api_name3 ='/cuttingHoles'
export default{
    //计算掏槽孔排距信息
    getCuttingArray(tableData){
        return request({
            url: `${api_name}/get_cuttingArray`,
            data: tableData,
            method: 'post'
        })
    },
    //获取最小角度
    getMinAngle(tableData){
      return request({
        url: `${api_name}/get_min_angle`,
        data: tableData,
        method: 'post'
      })
    },

    //保存掏槽孔信息
    saveCutting(tableData){
        return request({
            url: `${api_name}/save_cutting`,
            data: tableData,
            method: 'post'
        })
    },

    //保存掏槽排距表
    saveCuttingArray(tableData){
        return request({
            url: `${api_name2}/save_cutting_array`,
            data: tableData,
            method: 'post'
        })
    },

    //计算掏槽孔
    // getCutting(cuttingId){
    //     return request({
    //         url: `${api_name3}/get_cutting_holes/${cuttingId}`,
    //         method: 'get'
    //     })
    // },

    //保存掏槽孔
    saveCuttingHoles(tableData){
        return request({
            url: `${api_name3}/save_cutting_holes`,
            data: tableData,
            method: 'post'
        })
    },

    //查询掏槽孔
    getCuttingHoles(projectId){
        return request({
            url: `${api_name3}/read_cutting_holes/${projectId}`,
            method: 'get'
        })
    },

  //计算直孔掏槽孔排距信息
  getCuttingStraightArray(tableData){
    return request({
      url: `${api_name}/get_cuttingStraightArray`,
      data: tableData,
      method: 'post'
    })
  },
  //计算直孔掏槽孔
  getstraightCutting(tableData){
    return request({
      url: `${api_name3}/get_straight_cutting_holes`,
      data: tableData,
      method: 'post'
    })
  },


  //计算楔形掏槽孔
  getCutting(cuttingObj){
    return request({
      url: `${api_name3}/get_cutting_holes`,
      method: 'post',
      data:cuttingObj
    })
  },
//保存掏槽排距表
  readCuttingArrayByProjectId(projectId){
    return request({
      url: `${api_name2}/read_cuttingArray_by_projectId/${projectId}`,
      method: 'get'
    })
  },
//获取掏槽孔级数
  get_CuttingNum(cuttingObj){
    return request({
      url: `${api_name}/get_cuttingNum`,
      data: cuttingObj,
      method: 'post'
    })
  }


}
