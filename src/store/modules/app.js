const state = {
  themeType: 'fresh',
  waterfallShowType: 'card'
}

const mutations = {
  TOGGLE_THEMETYPE: (state, type) => {
    state.themeType = type
  },
  TOGGLE_WATERFALLSHOWTYPE: (state, showType) => {
    state.waterfallShowType = showType
  }
}

const actions = {
  toggleThemeType({ commit }, type) {
    commit('TOGGLE_THEMETYPE', type)
  },
  toggleWaterfallShowType({ commit }, showType) {
    commit('TOGGLE_WATERFALLSHOWTYPE', showType)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
