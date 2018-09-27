import REST from 'apples/libs/REST'
import restHelpers from './helpers/restHelpers'
import { Toast } from 'vant'

export default class extends REST {
  /**
   * 重写父类 request 方法，按业务场景定制功能
   * @override
   */
  request (method = 'GET', options = {}) {
    if (method === 'GET') {
      if (!options.query) {
        options.query = {}
      }

      // 转 options.query.where 对象为字符串
      if (options.query.where) {
        options.query.where = restHelpers.whereToStr(options.query.where)
      }

      options.query._ = new Date().getTime()
    }

    return new Promise(resolve => {
      super.request(method, options)
        .then(res => {
          // 在这里可对 res 进行包装
          resolve(res.data)
        })
        .catch(res => {
          // 全局错误提示
          Toast(res.response.data.error.message)
        })
    })
  }
}
