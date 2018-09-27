import auth from '@/utils/auth'
import helpers from '@/utils/helpers/base'

export default {
  path: '/',
  component: resolve => require(['@/pages/Home'], resolve),
  beforeEnter (to, from, next) {
    if (auth.loggedIn()) {
      next(helpers.getDefaultPage())
    } else {
      next()
    }
  }
}
