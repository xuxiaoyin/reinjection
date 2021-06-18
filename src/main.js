import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import '@/styles/index.less' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
// import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

import i18n from '@/lang/index' // 加载element-ui和做对应的国际化

// set ElementUI lang to EN
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 缓存
import { setStore, getStore, removeStore } from '@/utils/storage'
Vue.prototype.setStore = setStore
Vue.prototype.getStore = getStore
Vue.prototype.removeStore = removeStore

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
