<template>
  <div class="logo">
    <div class="logo-lg">
      <img v-if="themeType === 'fresh'" src="../../assets/LOGO_Dark.svg" class="img-responsive logo-img" />
      <img v-else src="../../assets/LOGO_white.svg" class="img-responsive logo-img" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Logo',
  computed: {
    ...mapGetters(['themeType'])
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.logo {
  height: 80px;
  width: $logoWidth;
  padding: 0 20px;
}
.logo .logo-lg img{
  max-width:200px;
  max-height:50px;
  padding: 4px;
}
</style>
