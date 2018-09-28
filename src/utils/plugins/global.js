import time from 'jt-time'
import helpers from '../helpers/base'
import consts from '../consts/index'
import auth from '../auth'
import toast from '@/components/Toast'

export default {
  install (Vue) {
    Vue.prototype.$consts = consts
    Vue.prototype.$helpers = helpers
    Vue.prototype.$auth = auth
    Vue.prototype.$time = time
    Vue.prototype.$toast = toast

    Vue.filter('time', val => time.getTime(val))
    Vue.filter('date', val => time.getDate(val))
  }
}
