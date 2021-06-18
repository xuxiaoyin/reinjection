import Waterfall from 'vue-waterfall-common/lib/waterfall'
import WaterfallSlot from 'vue-waterfall-common/lib/waterfall-slot'
import elTableInfiniteScroll from 'el-table-infinite-scroll'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  props: {
    /**
     * 数据是否加载完毕,此时total传入-1
     * true: 加载完毕
     * false: 没加载完毕
     */
    isEnd: {
      type: Boolean,
      default: false
    },
    /**
     * 固定高度：
     * true:如果高度固定，给多少就显示多少
     * false:不固定，高度为：给的item的height*(计算后自适应的item宽度/给的item的width)
     */
    fixedHeight: {
      type: Boolean,
      default: false
    },
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    // 显示底部操作栏
    showWaterfallFooter: {
      type: Boolean,
      default: false
    },
    // 显示底部警示栏
    showWarningFooter: {
      type: Boolean,
      defalut: false
    },
    // 默认显示类型：card || grid
    defaultShowType: {
      type: String,
      default: 'card'
    },
    // 展示的数据集
    itemObj: {
      type: Array
    },
    // 异步获取数据的方法
    Callback: {
      type: Function
    },
    // 数据总条数
    totalData: {
      type: [Number, String]
    },
    // 固定表高度，使得表头固定，默认100%
    tableHeight: {
      type: [Number, String],
      default: '100%'
    },
    // 表格是否有边框
    tableBorder: {
      type: Boolean,
      default: false
    },
    // 表格的最小宽度,默认1024
    tableMinWidth: {
      type: [Number, String],
      default: 1024
    },

    /** 以下为card模式下需要的参数 */

    // 瀑布流唯一识别的boxId
    boxId: {
      type: String,
      default: 'waterfall'
    },
    // 每行之间的最小间距
    minLineGap: {
      type: Number,
      default: 100
    },
    // 队列的方向纵向或横向
    line: {
      type: String,
      default: 'v'
    },
    // line='h'时插槽的最大宽度
    maxWidth: {
      type: Number,
      default: 100
    },
    // 行的标准间距：最终会根据给的这个值，和页面的宽度来计算每行显示几个
    lineGap: {
      type: Number,
      default: 400
    }
  },
  components: {
    Waterfall,
    WaterfallSlot
  },
  data() {
    return {
      isBusy: false,
      // eslint-disable-next-line
      // this.isMobile || this.$store.state.WindowsStore.screenWidth < 1024 ? 'card' : this.defaultShowType,
      slotWidth: null,
      slotWidthStyle: {},
      style: {},
      offsetY: null,
      touchStartY: null,
      count: 0
    }
  },
  mounted() {
    this.setMainWidth()
    this.$refs['radio_group'].addEventListener('touchmove', this.touchmove, {
      passive: false
    })
    this.$refs['radio_group'].addEventListener('touchend', this.touchend, {
      passive: false
    })
  },
  beforeDestroy() {
    this.$refs['radio_group'].removeEventListener('touchmove', this.touchmove)
    this.$refs['radio_group'].removeEventListener('touchend', this.touchend)
  },
  computed: {
    ...mapGetters(['mainWidth', 'screenWidth', 'screenHeight', 'waterfallWidth', 'brower', 'waterfallShowType']),
    myBoxId() {
      return this.boxId + Math.floor(Math.random(0, 1) * 1000)
    },
    total() {
      return Number(this.totalData)
    },
    // 无更多数据控制
    noMore() {
      if (this.total !== -1) {
        const noMore = this.total > 0 && this.itemObj && this.itemObj.length >= this.total
        if (noMore && this.count > 0) {
          this.noMoreTips()
        }
        return noMore
      } else {
        if (this.isEnd) {
          this.noMoreTips()
        }
        return this.isEnd
      }
    },
    // 控制无限数据加载：为false时不再加载数据
    disabled() {
      return this.isBusy || this.noMore
    }
  },
  watch: {
    itemObj() {
      this.isBusy = false
    },
    mainWidth() {
      this.setMainWidth()
    },
    screenWidth() {
      this.setMainWidth()
    },
    waterfallWidth() {
      this.setMainWidth()
    },
    waterfallShowType() {
      this.$refs[this.myBoxId].reflowHandler()
    }
  },
  methods: {
    // 没有更多数据的提示
    noMoreTips() {
      this.$message({
        type: 'success',
        message: this.$t('waterfall.tips.noMoreData')
      });
    },
    touchstart(e) {
      this.touchStartY = e.changedTouches[0].clientY
    },
    touchend(e) {
      const endY = e.changedTouches[0].clientY
      if (endY > 120 && endY < this.screenHeight - 30 && Math.abs(this.touchStartY - endY) > 10) {
        this.style = {
          top: endY + 'px'
        }
      }
    },
    touchmove(e) {
      e.preventDefault()
      this.touchend(e)
    },
    // 元素拖动放下
    drop(e) {
      e.preventDefault()
      this.style = {
        top: this.offsetY + 'px'
      };
    },
    // 容器允许元素放下，阻止默认事件
    allowDrop(e) {
      e.preventDefault()
    },
    dragend(e) {
      this.offsetY = e.y
    },
    // 设置内容区宽度始终为整数，解决IE浏览器的问题
    setMainWidth() {
      if (this.myBoxId) {
        setTimeout(() => {
          if ($('#' + this.myBoxId)[0]) {
            this.slotWidth = Math.floor($('#' + this.myBoxId)[0].clientWidth) - 26
          }
          if (this.brower && this.brower.indexOf('Internet Explorer') > -1) {
            this.slotWidth = -2
          }
          this.slotWidthStyle = {
            width: this.slotWidth + 'px'
          }
          this.$refs[this.myBoxId].reflowHandler()
        }, 400)
      }
    },
    // 卡片双击事件
    cardDbClick(item, event) {
      if (event.target.className.indexOf('el-checkbox') > -1) {
        return
      }
      this.$emit('cardDbClick', item)
    },
    // 卡片点击事件
    cardClick(item, event) {
      if (event.target.className.indexOf('el-checkbox') > -1) {
        return
      }
      this.$emit('cardClick', item)
    },
    /**
     * 加载更多数据
     */
    addItems() {
      if ($('#main-body').hasClass('custom-mage-welcome')) {
        return false
      }
      if (!this.isBusy && this.itemObj && this.itemObj.length > 0) {
        this.isBusy = true
        this.count++
        this.waterfallCallBack()
      }
    },
    // 页面重排时的操作
    reflowed() {},

    // 调用获取数据的方法
    waterfallCallBack() {
      this.$props.Callback()
    },
    // 切换显示类型
    changeShowType(e, showType) {
      e.preventDefault()
      this.$store.dispatch('app/toggleWaterfallShowType', showType)
    }
  }
};
