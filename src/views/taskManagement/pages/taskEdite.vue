<template>
  <div class="TaskEdite">
    <section class="leftSide">
      <left-tree @nodeClick="nodeClick"></left-tree>
    </section>

    <section class="rightSide">
      <div class="topBtn">
        <el-button type="primary" size="small" @click="saveToLocal">保存到本地</el-button>
        <el-button type="primary" size="small" @click="startInject">开始注入</el-button>
        <el-button class="lastBtn" type="primary" size="small" :disabled="!type" @click="saveToStore">暂存</el-button>
      </div>

      <div v-if="type && type === 'video' && clickChannel.channel_id" class="rightCotent">
        <div class="topSection">
          <channel-config ref="videoChannel" :clickChannel="clickChannel"></channel-config>
        </div>
        <div class="bottomSection">
          <div class="left">
           <fault-param ref="faultParam" :clickChannel="clickChannel"></fault-param>
          </div>
          <div class="right">
            <video-param ref="videoParam" :clickChannel="clickChannel"></video-param>
          </div>
        </div>
      </div>

      <div v-if="type && type === 'VCI8' && clickChannel.channel_id" class="rightCotent">
        <vic8-channel-config ref="vic8Channel" :clickChannel="clickChannel"></vic8-channel-config>
      </div>

      <div class="tips" v-if="!type">
        ————————请点击左侧的视频注入卡通道或VIC8卡通道进行配置————————
      </div>
    </section>
  </div>
</template>

<script>
import LeftTree from '../components/leftTree'
import ChannelConfig from '../components/channelConfig'
import FaultParam from '../components/faultParam'
import VideoParam from '../components/videoParam'
import Vic8ChannelConfig from '../components/vic8ChannelConfig'
import { creatJsonPath, writeJson } from '@/utils/nodeToFile'
export default {
  name: 'TaskEdite',
  components: { LeftTree, ChannelConfig, FaultParam, VideoParam, Vic8ChannelConfig },
  data() {
    return {
      clickChannel: {},
      oldClickData: {},
      type: ''
    }
  },
  methods: {
    // 点击左侧菜单，先把当前页面数据存localstorage,再把当前点击的页面看localstorage是否存在，存在就取出赋值
    nodeClick(data, type) {
      this.saveToStore()
      setTimeout(() => {
        this.clickChannel = data
        this.type = type
        setTimeout(() => {
          this.getFromStore()
        }, 40)
      }, 40)
    },
    // 点击暂存
    saveToStore() {
      this.$refs.videoChannel && this.$refs.videoChannel.saveToStore()
      this.$refs.faultParam && this.$refs.faultParam.saveToStore()
      this.$refs.videoParam && this.$refs.videoParam.saveToStore()
      this.$refs.vic8Channel && this.$refs.vic8Channel.saveToStore()
    },
    getFromStore() {
      this.$refs.videoChannel && this.$refs.videoChannel.getFromStore()
      this.$refs.faultParam && this.$refs.faultParam.getFromStore()
      this.$refs.videoParam && this.$refs.videoParam.getFromStore()
      this.$refs.vic8Channel && this.$refs.vic8Channel.getFromStore()
    },
    // 保存到本地
    async saveToLocal() {
      await creatJsonPath()
      writeJson()
    },
    // 开始注入
    startInject() {}
  }
}
</script>

<style scoped lang="scss">
.TaskEdite {
  position: relative;
  height: 100%;
  width: 100%;
  .leftSide, .rightSide {
    position: absolute;
    overflow: auto;
    top: 0;
    bottom: 0;
    padding: 10px;
    box-shadow: 0 2px 8px 2px rgba(0, 0, 0, .05);
    border-radius: 2px;
    background: #fff;
  }
  .leftSide {
    width: 210px;
  }
  .rightSide {
    left: 220px;
    right: 0;
    .topBtn {
      margin-bottom: 20px;
      .lastBtn {
        float: right;
      }
    }
    .tips {
      text-align: center;
      padding: 100px 0;
      font-size: 20px;
      color: #d8d8d8;
    }
    .rightCotent {
      .topSection {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border: 1px solid #DCDFE6;
        border-top: none;
      }
    }
    .bottomSection {
      display: flex;
      .left {
        margin-right: 40px;
        flex: 1;
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>
