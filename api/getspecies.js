import request from '@/utils/request'
const api_name ='/rockType'
// const api_name ='/dictionary'

export default{
    getRockType(){
        return request({
            url: `${api_name}/all`,//模板字符串
            method: 'get'
        })
    },

  getRockId(lithology){
    return request({
        url: `${api_name}/project1_4_rock`,//获取岩石对应的rockId
        method: 'post',
        data:lithology
    })
  }
}
