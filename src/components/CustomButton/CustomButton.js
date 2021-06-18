import $ from 'jquery';
export default {
  props: {
    /**
     * 要控制划到顶部的元素： class 或 id
     * 如： ".abc" 或 "#abc"
     */
    // 瀑布加载组件用到时该值固定为 #waterfallId
    scrollEl: {
      type: String,
      default: '#waterfallId'
    },
    // 是否展示 【回到顶部】 按钮
    showTop: {
      type: Boolean,
      default: true
    },
    // 是否只有一个按钮
    isOneButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollTopNum: null,
      foldButton: false
    };
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    // 获取控制元素的滚动距离，获取的是瀑布加载组件的ID，该ID为滚动条产生的节点
    handleScroll() {
      this.scrollTopNum = $(this.scrollEl).scrollTop();
    },
    // 回到顶部
    scrollTop() {
      this.scrollEl = this.scrollEl ? this.scrollEl : window;
      $(this.scrollEl).animate(
        {
          scrollTop: 0
        },
        150
      );
    }
  }
};
