<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      :unique-opened="false"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="horizontal"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  name: 'TopMenu',
  components: { SidebarItem },
  computed: {
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      console.log(path)
      return path
    },
    variables() {
      return variables
    }
  },
  watch: {
    activeMenu(val) {
      console.log('val')
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
.el-menu--horizontal > .el-menu-item, .el-menu-item, .el-submenu__title {
  height: 50px;
  line-height: 50px;
}
</style>

