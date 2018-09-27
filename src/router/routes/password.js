import auth from '@/utils/auth'

export default {
  path: 'password',
  component: resolve => require(['@/pages/Password'], resolve),
  beforeEnter (to, from, next) {
    if (auth.loggedIn()) {
      next('/')
    } else {
      next()
    }
  }
}
