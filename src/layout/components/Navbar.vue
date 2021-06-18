<template>
  <div class="navbar">
    <!--    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->

    <!--    <breadcrumb class="breadcrumb-container" />-->

    <div class="left-menu">
      <top-menu />
    </div>
    <!--切换语言-->
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click" @command="LangSwitch">
        <a class="dropdown-toggle" data-toggle="dropdown">
          <span>{{ $t('app.Lang.title') }}</span>
        </a>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided command="0">
            <span style="display:block;">{{ $t('app.Lang.zh') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided command="1">
            <span style="display:block;">{{ $t('app.Lang.en') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--切换风格-->
      <el-dropdown class="avatar-container" trigger="click" @command="ThemeSwitch">
        <a class="dropdown-toggle" data-toggle="dropdown">
          <span>{{ $t('app.Theme.title') }}</span>
        </a>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided command="1">
            <span style="display:block;">{{ $t('app.Theme.black') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided command="0">
            <span style="display:block;">{{ $t('app.Theme.white') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import TopMenu from './TopMenu'
import $ from 'jquery'
import store from "@/store";

export default {
  components: {
    TopMenu
  },
  methods: {
    // 切换语言
    LangSwitch(value) {
      switch (value) {
        case '0':
          console.log(this.$i18n)
          this.$i18n.locale = 'zh'
          window.sessionStorage.setItem('locale', 'zh')
          break
        case '1':
          this.$i18n.locale = 'en'
          break
      }
    },
    // 切换主题
    ThemeSwitch(value) {
      const $mainBody = $('#main-body')
      const themeType = value === '0' ? 'fresh' : 'dark'
      this.$store.dispatch('app/toggleThemeType', themeType)
      switch (value) {
        case '0':
          $mainBody.removeClass('skin-black-light').addClass('skin-white-light')
          break
        case '1':
          $mainBody.removeClass('skin-white-light').addClass('skin-black-light')
          break
        default:
          $mainBody.removeClass('skin-black-light').addClass('skin-white-light')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .left-menu {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
