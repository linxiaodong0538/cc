import auth from '@/utils/auth'

export default {
  path: 'login',
  component: resolve => require(['@/pages/Login'], resolve),
  beforeEnter (to, from, next) {
    if (auth.loggedIn()) {
      next('/products/medicines/categories')
    } else {
      next()
    }
  }
}
