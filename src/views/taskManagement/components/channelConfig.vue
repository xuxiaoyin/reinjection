<template>
  <div class="channelConfig">
    <el-divider content-position="left">视频通道配置</el-divider>
    <div class="formWrap">
      <el-form ref="form" class="configForm" :model="form" label-width="120px">
        <el-form-item prop="video_path" label="回放视频文件">
          <el-select placeholder="请选择回放视频文件" v-model="form.video_path">
            <el-option v-for="item in videoFileList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回放时间(S)">
          <el-col :span="11">
            <el-input v-model="form.start_offset"></el-input>
          </el-col>
          <el-col :span="2" style="text-align: center;">To</el-col>
          <el-col :span="11">
            <el-input v-model="form.end_offset"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="videoWrap">
        <video controls width="100%" height="200" id="videoElement"></video>
      </div>
    </div>
  </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
  name: 'ChannelConfig',
  props: {
    clickChannel: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        video_path: '',
        start_offset: '',
        end_offset: ''
      },
      videoFileList: [
        { id: 1, label: '视频1' },
        { id: 2, label: '视频2' },
        { id: 3, label: '视频3' },
        { id: 4, label: '视频4' },
        { id: 5, label: '视频5' }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createVideo()
    })
  },
  methods: {
    createVideo() {
      if (flvjs.isSupported()) {
        const videoElement = document.getElementById('videoElement')
        const flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: 'http://192.168.3.106/live?app=myapp&stream=1' // 你的url地址
        })
        flvPlayer.attachMediaElement(videoElement)
        flvPlayer.load()
        flvPlayer.play()
      }
    },
    saveToStore() {
      this.setStore(`${this.clickChannel.channel_id}.video`, this.form)
    },
    getFromStore() {
      const form = this.getStore(`${this.clickChannel.channel_id}.video`)
      if (form) {
        this.form = JSON.parse(form)
      } else {
        this.$refs.form.resetFields()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.channelConfig {
  .formWrap {
    display: flex;
    align-content: space-between;
    .configForm {
      flex: 2;
      margin-right: 40px;
    }
    .videoWrap {
      flex: 3;
      height: 200px;
      padding-right: 20px;
    }
  }
}
</style>
