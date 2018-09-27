import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import articles from './modules/articles'
import products from './modules/products'
import productStocks from './modules/productStocks'
import olds from './modules/olds'
import families from './modules/families'
import settings from './modules/settings'
import relations from './modules/relations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: 'zh-CN'
  },
  getters,
  actions,
  mutations,
  modules: {
    articles,
    products,
    productStocks,
    olds,
    families,
    settings,
    relations
  }
})
