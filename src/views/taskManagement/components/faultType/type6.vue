<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="循环丢帧周期" prop="channel_blocked.cycle_frame_loss_period">
      <el-input v-model="form.channel_blocked.cycle_frame_loss_period" placeholder="请输入循环丢帧周期"></el-input>
    </el-form-item>
    <el-form-item label="丢帧模式" prop="channel_blocked.frame_dropping_mode">
      <el-select v-model="form.channel_blocked.frame_dropping_mode" placeholder="请选择丢帧模式">
        <el-option v-for="item in modeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="故障每周期帧数" prop="channel_blocked.number_of_cycle_frames">
      <el-input v-model="form.channel_blocked.number_of_cycle_frames" placeholder="请输入故障每周期帧数"></el-input>
    </el-form-item>
    <el-form-item label="故障持续周期" prop="channel_blocked.duration">
      <el-input v-model="form.channel_blocked.duration" placeholder="请输入故障持续周期"></el-input>
    </el-form-item>
    <el-form-item label="丢帧数量(fps)" prop="channel_blocked.number">
      <el-input v-model="form.channel_blocked.number" placeholder="请输入丢帧数量(fps)"></el-input>
    </el-form-item>
    <el-form-item label="丢帧起始位置" prop="channel_blocked.start_position">
      <el-input v-model="form.channel_blocked.start_position" placeholder="请输入丢帧起始位置"></el-input>
    </el-form-item>
    <el-form-item label="周期内丢帧位置" prop="channel_blocked.lost_frame_position">
      <el-input v-model="form.channel_blocked.lost_frame_position" placeholder="请输入周期内丢帧位置"></el-input>
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
        fault_type: 6,
        'channel_blocked': { // 通道阻塞
          'cycle_frame_loss_period': 20, // 循环丢帧周期
          'frame_dropping_mode': 1, // 丢帧模式  1、随机位置丢 2、固定位置丢
          'number_of_cycle_frames': 20, // 故障每周期帧数
          'duration': 2, // 故障持续周期
          'number': 20, // 丢帧数量
          'start_position': 59, // 丢帧起始位置
          'lost_frame_position': 20 // 周期内丢帧位置
        }
      },
      modeList: [
        { label: '随机位置丢', value: 1 },
        { label: '固定位置丢', value: 2 }
      ]
    }
  }
}
</script>

<style scoped>

</style>
