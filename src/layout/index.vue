<template>
  <div class="app-wrapper hideSidebar withoutAnimation">
<!--    <sidebar class="sidebar-container" />-->
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <logo></logo>
        <navbar />
      </div>
      <div class="main-wrap">
        <app-main />
      </div>
      <app-footer class="appFooter"></app-footer>
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain, Logo, AppFooter } from './components'
import $ from 'jquery'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Logo,
    AppFooter
  },
  created() {
    this.setScreen()
    this.getBrower()
  },
  mounted() {
    const _this = this
    window.onresize = function() {
      _this.setScreen()
    }
  },
  computed: {
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    ...mapGetters(['screenWidth'])
  },
  methods: {
    setScreen() {
      const windowSize = {
        screenWidth: $(window).width(),
        screenHeight: $(window).height(),
        mainHeight: $('.app-main').height(),
        mainWidth: $('.app-main').width()
      }
      this.$store.dispatch('window/toggleWindow', windowSize)
    },
    getBrower() {
      const browserInfo = this.getBrowserInfo()
      console.log(browserInfo)
      if (browserInfo[1] && browserInfo[2]) {
        this.browse = this.getBrowserInfo()[1] + ' ' + this.getBrowserInfo()[2]
      } else {
        this.browse = '未获取到浏览器信息'
      }

      switch (this.browse) {
        case 'msie 6.0':
          this.browse = 'Internet Explorer 6'
          break
        case 'msie 7.0':
          this.browse = 'Internet Explorer 7'
          break
        case 'tmsie 8.0':
          this.browse = 'Internet Explorer 8'
          break
        case 'msie 9.0':
          this.browse = 'Internet Explorer 9'
          break
        case 'msie 10.0':
          this.browse = 'Internet Explorer 10'
          break
        case 'msie 11.0':
          this.browse = 'Internet Explorer 11'
          break
        default:
          break
      }
      if (this.browse.indexOf('Internet Explorer') > -1) {
        this.isIE = true
      }
      window.sessionStorage.setItem('browse', this.browse)
      this.$store.dispatch('window/setBrower', this.browse)
    },
    getBrowserInfo() {
      const agent = navigator.userAgent.toLowerCase()
      const arr = []
      const system = agent
        .split(' ')[1]
        .split(' ')[0]
        .split('(')[1]
      arr.push(system)
      const REGSTR_EDGE = /edge\/[\d.]+/gi
      // let REGSTR_IE = /trident\/[\d.]+/gi;
      const OLD_IE = /msie\s[\d.]+/gi
      const REGSTR_FF = /firefox\/[\d.]+/gi
      const REGSTR_CHROME = /chrome\/[\d.]+/gi
      const REGSTR_SAF = /safari\/[\d.]+/gi
      const REGSTR_OPERA = /opr\/[\d.]+/gi
      // IE
      // OLD_IE
      if (agent.indexOf('msie') > 0) {
        arr.push(agent.match(OLD_IE)[0].split(' ')[0]);
        arr.push(agent.match(OLD_IE)[0].split(' ')[1]);
        return arr
      }
      // Edge
      if (agent.indexOf('edge') > 0) {
        arr.push(agent.match(REGSTR_EDGE)[0].split('/')[0]);
        arr.push(agent.match(REGSTR_EDGE)[0].split('/')[1]);
        return arr
      }
      // firefox
      if (agent.indexOf('firefox') > 0) {
        arr.push(agent.match(REGSTR_FF)[0].split('/')[0]);
        arr.push(agent.match(REGSTR_FF)[0].split('/')[1]);
        return arr
      }
      // Opera
      if (agent.indexOf('opr') > 0) {
        arr.push(agent.match(REGSTR_OPERA)[0].split('/')[0]);
        arr.push(agent.match(REGSTR_OPERA)[0].split('/')[1]);
        return arr
      }
      // Safari
      if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
        arr.push(agent.match(REGSTR_SAF)[0].split('/')[0]);
        arr.push(agent.match(REGSTR_SAF)[0].split('/')[1]);
        return arr
      }
      // Chrome
      if (agent.indexOf('chrome') > 0) {
        arr.push(agent.match(REGSTR_CHROME)[0].split('/')[0]);
        arr.push(agent.match(REGSTR_CHROME)[0].split('/')[1]);
        return arr
      } else {
        arr.push('未获取到浏览器信息')
        return arr
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }

  .main-wrap {
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    height: calc(100% - 74px);
    width: 100%;
    overflow: hidden;
    background: $bgColor;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    display: flex;
    height: 50px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }

  .fixed-header .navbar {
    flex: 1;
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
