// 引入ajax(request)
import request from '@/utils/request'
const api_name = '/admin/product/baseTrademark'

export default {

  /*
  获取分页列表
  */
  getTrademarkList(page, limit) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: `get`
    })
    // return request.get(`${api_name}/${page}/${limit}`)
  },
  // 添加品牌
  addTrademark(trademark) {
    return request({
      url: `${api_name}/save`,
      method: `POST`,
      data: trademark
    })
    // return request.post(`${api_name}/save`,trademark)
  },
  // 更新品牌
  updateTrademark(trademark) {
    return request({
      url: `${api_name}/update`,
      method: `PUT`,
      data: trademark
    })
    // return request.put(`${api_name}/update`, trademark)
  },
  // 删除品牌
  deleteTrademark(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: `DELETE`
    })
    // return request.delete(`${api_name}/remove/${id}`)
  }
}
