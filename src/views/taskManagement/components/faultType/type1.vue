<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="延迟类型" prop="frame_transmission_delay.delay_type">
      <el-select v-model="form.frame_transmission_delay.delay_type" placeholder="请选择延迟类型">
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="延迟参考通道" prop="frame_transmission_delay.delay_channel">
      <el-select v-model="form.frame_transmission_delay.delay_channel" placeholder="请选择延迟参考通道">
        <el-option v-for="item in channelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="延迟时间/帧数" prop="frame_transmission_delay.delay_time_or_frames">
      <el-input v-model="form.frame_transmission_delay.delay_time_or_frames" placeholder="请输入延迟时间/帧数"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import saveGetMixin from '../saveGetMixin'
export default {
  name: 'Type1',
  mixins: [saveGetMixin],
  data() {
    return {
      form: {
        fault_type: 1,
        'frame_transmission_delay': {
          'delay_type': 1, // 延迟类型 1、基于时间 2、基于帧
          'delay_channel': 'CH1', // 延迟参考通道
          'delay_time_or_frames': '' // 延迟时间/帧数
        }
      },
      typeList: [
        { label: '基于时间', value: 1 },
        { label: '基于帧', value: 2 }
      ],
      channelList: [
        { label: 'CH1', value: 1 },
        { label: 'CH2', value: 2 },
        { label: 'CH3', value: 3 },
        { label: 'CH4', value: 4 }
      ]
    }
  }
}
</script>

<style scoped>

</style>
