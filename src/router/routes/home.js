import auth from '@/utils/auth'

export default {
  path: '/',
  component: resolve => require(['@/pages/Home'], resolve),
  beforeEnter (to, from, next) {
    if (auth.loggedIn()) {
      next('/home')
    } else {
      next()
    }
  }
}
