import Vue from 'vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en' // 引入Element UI的英文包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // 引入Element UI的中文包
Vue.use(VueI18n)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
}) // 兼容i18n 7.x版本设置
// 注册i18n实例并引入语言文件，文件格式等下解析
let localea
const lang = navigator.language
if (lang === 'zh-CN') {
  localea = 'zh'
} else {
  localea = 'en'
}

const i18n = new VueI18n({
  locale: localea,
  messages: {
    zh: Object.assign(
      require('@/lang/zh.json'),
      zhLocale
    ), // 这里需要注意一下，是如何导入多个语言包的
    en: Object.assign(
      require('@/lang/en.json'),
      enLocale
    )
  }
})

export default i18n
