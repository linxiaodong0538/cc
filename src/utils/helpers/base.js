import consts from '@/utils/consts'
import helpers from 'apples/libs/helpers'
import auth from '../auth'

export default {
  ...helpers,
  /**
   * 获取图片地址
   */
  getImageURL ({ id }) {
    return `${consts.BASE_URL}/apis/v1/files/${id}`
  },
  getRoutePrefix (params) {
    const { topLevelMenu, secondLevelMenu, alias } = params
    return `/${topLevelMenu}/${secondLevelMenu}/${alias}`
  },
  getItemById (items, id) {
    return items && items.length
      ? (items.find(item => +item.id === +id) || {})
      : {}
  },
  getAccessCount (permissions) {
    const myPermissions = auth.get()['user'].permissions
    const items = permissions.filter(item => myPermissions.indexOf(item) !== -1)

    return items.length
  },
  isAccessible (permissions) {
    return !!this.getAccessCount(permissions)
  },
  getDefaultPage () {
    switch (true) {
      case this.isAccessible([consts.PERMISSIONS.MANAGE_MEDICINES]):
        return '/products/medicines/categories'
      case this.isAccessible([consts.PERMISSIONS.MANAGE_FOODS]):
        return '/products/foods/categories'
      case this.isAccessible([consts.PERMISSIONS.MANAGE_SUPPLIES]):
        return '/products/supplies/categories'
      case this.isAccessible([consts.PERMISSIONS.MANAGE_CARS]):
        return '/cars/cars/index'
      case this.isAccessible([consts.PERMISSIONS.MANAGE_STAFFS]):
        return '/staffs/staffs/index'
      case this.isAccessible([consts.PERMISSIONS.MANAGE_OLDS]):
        return '/olds/olds/index'
      case this.isAccessible([consts.PERMISSIONS.MANAGE_FAMILIES]):
        return '/families/families/index'
      case this.isAccessible([consts.PERMISSIONS.MANAGE_CARERS]):
        return '/staffs/carers/index'
      default:
        return `/staffs/staffs/details/${auth.get()['user']['id']}/my`
    }
  }
}
