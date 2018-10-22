import types from './types'

export default {
  [types.GET_MESSAGES] (state, payload) {
    state.relations = payload.data
  },
  [types.GET_MESSAGE] (state, payload) {
    state.relation = payload.data
  }
}
