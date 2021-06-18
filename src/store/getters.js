const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  themeType: state => state.app.themeType, // 主题
  waterfallShowType: state => state.app.waterfallShowType, // 显示模式

  screenWidth: state => state.window.screenWidth, // 屏幕宽度
  screenHeight: state => state.window.screenHeight, // 屏幕高度
  mainHeight: state => state.window.mainHeight, // 内容区高度
  mainWidth: state => state.window.mainWidth, // 内容区宽度
  waterfallWidth: state => state.window.waterfallWidth, // 瀑布流宽度改变
  brower: state => state.window.brower
}
export default getters
