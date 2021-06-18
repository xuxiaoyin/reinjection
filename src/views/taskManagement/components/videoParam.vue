<template>
  <div class="videoParam">
    <el-divider content-position="left">视频参数配置</el-divider>
    <div class="formWrap">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="分辨率" prop="resolving_power">
          <el-select v-model="form.resolving_power" placeholder="请选择分辨率">
            <el-option v-for="item in powerList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="帧率(fps/s)" prop="frame_rate">
          <el-input v-model="form.frame_rate" placeholder="请输入帧率(fps/s)"></el-input>
        </el-form-item>

        <el-form-item label="畸变类型" prop="distortion_type">
          <el-select v-model="form.distortion_type" placeholder="请选择畸变类型">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="动态范围" prop="dynamic_range">
          <el-input v-model="form.dynamic_range" placeholder="请输入动态范围"></el-input>
        </el-form-item>

        <el-form-item label="信噪比(dB)" prop="signal_to_noise_ratio">
          <el-input v-model="form.signal_to_noise_ratio" placeholder="请输入信噪比(dB)"></el-input>
        </el-form-item>

        <el-form-item label="色彩还原度调节(dB)" prop="color_restoration">
          <el-input v-model="form.color_restoration" placeholder="请输入色彩还原度调节(dB)"></el-input>
        </el-form-item>

        <el-form-item label="对比度" prop="contrast_ratio">
          <el-input v-model="form.contrast_ratio" placeholder="请输入对比度"></el-input>
        </el-form-item>

        <el-form-item label="单通道增益调节" prop="single_channel_gain">
          <el-input v-model="form.single_channel_gain" placeholder="请输入单通道增益调节"></el-input>
        </el-form-item>

        <el-form-item label="全局增益调节" prop="global_gain">
          <el-input v-model="form.global_gain" placeholder="请输入全局增益调节"></el-input>
        </el-form-item>

        <el-form-item label="视频马赛克" prop="mosaic">
          <el-select v-model="form.mosaic" placeholder="请选择视频马赛克">
            <el-option v-for="item in mosaicList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoParam',
  props: {
    clickChannel: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        'resolving_power': '1024*768', // 分辨率
        'frame_rate': 60, // 帧率
        'distortion_type': 1, // 畸变类型1、窄角 2、广角 3、鱼眼
        'dynamic_range': 50, // 动态范围
        'signal_to_noise_ratio': 68, // 信噪比
        'color_restoration': 50, // 色彩还原度
        'contrast_ratio': 60, // 对比度
        'single_channel_gain': 50, // 单通道增益调节
        'global_gain': 70, // 全局增益
        'mosaic': 1 // 马赛克,1、全屏  2、重点区域
      },
      powerList: ['176*144', '352*288', '704*576', '1280*720', '1920*1080'],
      typeList: [
        { label: '窄角', value: 1 },
        { label: '广角', value: 2 },
        { label: '鱼眼', value: 3 }
      ],
      mosaicList: [
        { label: '全屏', value: 1 },
        { label: '重点区域', value: 2 }
      ]
    }
  },
  methods: {
    saveToStore() {
      this.setStore(`${this.clickChannel.channel_id}.videoParam`, this.form)
    },
    getFromStore() {
      const form = this.getStore(`${this.clickChannel.channel_id}.videoParam`)
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
.videoParam {
  border: 1px solid #DCDFE6;
  border-top: none;
  .formWrap {
    height: calc(100vh - 490px);
    overflow: auto;
    padding-right: 20px;
  }
}
</style>
