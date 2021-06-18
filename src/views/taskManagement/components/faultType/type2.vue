<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="循环丢帧周期" prop="frame_lose.cycle_frame_loss_period">
      <el-input v-model="form.frame_lose.cycle_frame_loss_period" placeholder="请输入循环丢帧周期"></el-input>
    </el-form-item>
    <el-form-item label="丢帧模式" prop="frame_lose.frame_dropping_mode">
      <el-select v-model="form.frame_lose.frame_dropping_mode" placeholder="请选择丢帧模式">
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="故障每周期帧数" prop="frame_lose.number_of_cycle_frames">
      <el-input v-model="form.frame_lose.number_of_cycle_frames" placeholder="请输入故障每周期帧数"></el-input>
    </el-form-item>
    <el-form-item label="故障持续周期" prop="frame_lose.duration">
      <el-input v-model="form.frame_lose.duration" placeholder="请输入故障故障持续周期"></el-input>
    </el-form-item>
    <el-form-item label="丢帧数量(fps)" prop="frame_lose.number">
      <el-input v-model="form.frame_lose.number" placeholder="请输入丢帧数量(fps)"></el-input>
    </el-form-item>
    <el-form-item label="丢帧起始位置" prop="frame_lose.start_position">
      <el-input v-model="form.frame_lose.start_position" placeholder="请输入丢帧起始位置"></el-input>
    </el-form-item>
    <el-form-item label="周期内丢帧位置" prop="frame_lose.lost_frame_position">
      <el-input v-model="form.frame_lose.lost_frame_position" placeholder="请输入周期内丢帧位置"></el-input>
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
        fault_type: 2,
        'frame_lose': { // 帧丢失
          'cycle_frame_loss_period': 20, // 循环丢帧周期
          'frame_dropping_mode': 1, // 丢帧模式  1、随机位置丢 2、固定位置丢
          'number_of_cycle_frames': 20, // 故障每周期帧数
          'duration': 2, // 持续周期
          'number': 20, // 丢帧数量
          'start_position': 59, // 丢帧起始位置
          'lost_frame_position': 20 // 周期内丢帧位置
        }
      },
      typeList: [
        { label: '随机位置丢', value: 1 },
        { label: '固定位置丢', value: 2 }
      ]
    }
  }
}
</script>

<style scoped>

</style>
