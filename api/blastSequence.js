import request from '@/utils/request'

export default {
  // 根据项目id查询已保存的起爆网络
  getBlastSequenceInfo(projectId) {
    return request({
      baseURL: 'http://129.211.220.225:8089',
      url: '/project/blast-seq-info',
      method: 'get',
      params: { projectId }
    })
  }
}
