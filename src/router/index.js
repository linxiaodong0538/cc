import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/utils/auth'
import Layout from '@/components/Layout'
import Root from '@/pages/Root'
import notFound from './routes/notFound'
import home from './routes/home'
import login from './routes/login'
import password from './routes/password'
import logout from './routes/logout'
import olds from './routes/olds'
import my from './routes/my'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        {
          path: '/',
          component: Layout,
          children: [
            home,
            olds,
            my
          ],
          meta: {
            requiresAuth: true
          }
        },
        login,
        password,
        logout,
        notFound
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: 'login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
})

export default router
