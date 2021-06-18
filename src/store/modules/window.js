import Tool from '@/utils/tool'
const state = {
  brower: Tool.getSessionStorage('browse') ? Tool.getSessionStorage('browse') : undefined,
  screenWidth: document.documentElement.clientWidth, // 屏幕宽度
  screenHeight: document.documentElement.clientHeight, // 屏幕高度
  mainHeight: null, // 内容区宽度
  mainWidth: null, // 内容区高度
  waterfallWidth: false // 瀑布流宽度改变
}

const mutations = {
  TOGGLE_WINDOW: (state, payload) => {
    state.screenWidth = payload.screenWidth
    state.screenHeight = payload.screenHeight
    state.mainHeight = payload.mainHeight
    state.mainWidth = payload.mainWidth
  },
  TOGGLE_WATERFALLWIDTH: (state, width) => {
    state.waterfallWidth = width
  },
  SET_BROWER: (state, payload) => {
    state.brower = payload
  }
}

const actions = {
  toggleWindow({ commit }, payload) {
    commit('TOGGLE_WINDOW', payload)
  },
  toggleWaterfallWidth({ commit }, width) {
    commit('TOGGLE_WATERFALLWIDTH', width)
  },
  setBrower({ commit }, payload) {
    commit('SET_BROWER', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
