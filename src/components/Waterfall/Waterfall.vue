<template>
  <div
    :class="[hasTopBorder ? 'border-top' : '', 'waterfall_component']"
    :id="myBoxId"
    v-if="myBoxId"
    @drop="drop($event)"
    @dragover="allowDrop($event)"
  >
    <!--  select button start -->
    <div
      ref="radio_group"
      class="waterfall_component__radio-group"
      :style="style"
      draggable="true"
      @drag="dragend($event)"
      @dragend="dragend($event)"
      @touchstart="touchstart($event)"
    >
      <!-- @touchend="touchend($event)"
      @touchmove="touchend($event)"-->
      <el-button
        type="text "
        v-bind:class="[waterfallShowType === 'card' ? 'el-button--active' : '']"
        @click.prevent.stop="changeShowType($event, 'card')"
      >
        <svg-icon icon-class="card"></svg-icon>
      </el-button>
      <el-button
        type="text"
        v-bind:class="[waterfallShowType === 'grid' ? 'el-button--active' : '']"
        @click.prevent.stop="changeShowType($event, 'grid')"
      >
        <svg-icon icon-class="list"></svg-icon>
      </el-button>
    </div>
    <!--  select button end  -->

    <!-- card  start-->
    <!--添加id="waterfallId"，显示回到顶部按钮，该按钮的作用域为瀑布加载组件-->
    <div
      id="waterfallId"
      class="waterfall_component__waterfall"
      v-infinite-scroll="addItems"
      infinite-scroll-delay="300"
      :infinite-scroll-disabled="disabled"
      :infinite-scroll-immediate="false"
      v-show="waterfallShowType === 'card'"
    >
      <Waterfall
        v-bind:style="slotWidthStyle"
        class="waterfall-slot-wrapper"
        align="center"
        :fixed-height="fixedHeight"
        :line="line"
        :boxId="myBoxId"
        :line-gap="lineGap"
        :min-line-gap="minLineGap"
        :single-max-width="maxWidth"
        :watch="itemObj"
        @reflowed="reflowed"
        :ref="myBoxId"
      >
        <WaterfallSlot
          @dblclick.native="cardDbClick(item, $event)"
          @click.native="cardClick(item, $event)"
          v-for="(item, index) in itemObj"
          :width="item.width ? item.width : '1.45'"
          :height="item.height ? item.height : '1'"
          :order="index"
          :key="index"
          move-class="item-move"
        >
          <div class="item waterfall-item">
            <el-container class="el-container is-vertical">
              <el-main v-bind:class="[!showWaterfallFooter ? 'full' : '', 'waterfall-main']">
                <div class="item-title">
                  <slot name="item-header" :data="item">
                    <!-- set your title here -->
                  </slot>
                </div>

                <slot name="item-content" :data="item">
                  <!-- set your customise content here -->
                </slot>
              </el-main>
              <el-footer class="waterfall-btn-wrapper" v-if="showWaterfallFooter">
                <slot name="item-buttons" :data="item">
                  <!-- set your customise button here -->
                </slot>
              </el-footer>
              <!-- 警示条 -->
              <el-footer class="waterfall-warning-footer" v-if="showWarningFooter">
                <slot name="item-warning-footer" :data="item">
                  <!-- set your customise button here -->
                </slot>
              </el-footer>
            </el-container>
          </div>
        </WaterfallSlot>
      </Waterfall>
    </div>

    <!-- card  end-->
    <!-- grid start -->
    <div
      class="table-wrapper"
      v-show="waterfallShowType === 'grid'"
      v-el-table-infinite-scroll="addItems"
      infinite-scroll-delay="300"
      infinite-scroll-disabled="disabled"
      :infinite-scroll-immediate="false"
    >
      <slot name="grid-content">
        <!-- set your customise content here -->
      </slot>
    </div>
    <!-- card  end-->
  </div>
</template>
<script src="./Waterfall.js"></script>
<style scoped lang="less" src="@/styles/base/vue-waterfall-style.less"></style>
<style lang="less" scoped src="./Waterfall.less"></style>
