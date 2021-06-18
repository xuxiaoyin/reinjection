<template>
  <div class="customise-button-wrapper">
    <!--回到顶部按钮-->
    <el-tooltip
      :content="$t('btnText.backTip')"
      placement="top"
      v-show="!foldButton && showTop && scrollTopNum > 0"
    >
      <el-button icon="el-icon-top" circle class="block" @click="scrollTop">
        <svg-icon icon-class="toTop"></svg-icon>
      </el-button>
    </el-tooltip>
    <div v-show="!foldButton">
      <slot></slot>
    </div>
    <!--折叠按钮组-->
    <el-tooltip
      :content="$t('btnText.packUpBtns')"
      placement="top"
      v-show="!foldButton && !isOneButton"
    >
      <el-button
        icon="el-icon-caret-bottom"
        circle
        class="block"
        @click="foldButton = true"
      >
        <svg-icon icon-class="fold"></svg-icon>
      </el-button>
    </el-tooltip>
    <!--展开按钮组-->
    <el-tooltip
      :content="$t('btnText.expandBtns')"
      placement="top"
      v-show="foldButton && !isOneButton"
    >
      <el-button
        icon="el-icon-caret-top"
        circle
        class="block"
        @click="foldButton = false"
      >
        <svg-icon icon-class="open"></svg-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>
<script src="./CustomButton.js"></script>
<style lang="less" src="./CustomButton.less"></style>
