<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="重复帧帧数" prop="frame_repeat.repeat_frames">
      <el-select v-model="form.frame_repeat.repeat_frames" placeholder="请选择重复帧帧数">
        <el-option v-for="item in repeatList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="信息损坏类型" prop="frame_repeat.damaged_type">
      <el-select v-model="form.frame_repeat.damaged_type" placeholder="请选择信息损坏类型">
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="故障帧触发模式" prop="frame_repeat.trigger_mode">
      <el-select v-model="form.frame_repeat.trigger_mode" placeholder="请选择故障帧触发模式">
        <el-option v-for="item in modeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="故障每周期帧数" prop="frame_repeat.number_of_cycle_frames">
      <el-input placeholder="请输入故障每周期帧数" v-model="form.frame_repeat.number_of_cycle_frames"></el-input>
    </el-form-item>
    <el-form-item label="故障持续周期" prop="frame_repeat.duration">
      <el-input placeholder="请输入故障每周期帧数" v-model="form.frame_repeat.duration"></el-input>
    </el-form-item>
    <el-form-item label="故障起始位置" prop="frame_repeat.start_position">
      <el-input placeholder="请输入故障每周期帧数" v-model="form.frame_repeat.start_position"></el-input>
    </el-form-item>
    <el-form-item label="周期内故障位置" prop="frame_repeat.lost_frame_position">
      <el-input placeholder="请输入周期内故障位置" v-model="form.frame_repeat.lost_frame_position"></el-input>
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
        fault_type: 7,
        'frame_repeat': { // 帧重复
          'repeat_frames': 1, // 重复帧帧数
          'damaged_type': 1, // 信息损坏类型 1、颜色缺失 2、颜色错误
          'trigger_mode': 1, // 故障帧触发模式,1、随机位置 2、固定位置
          'number_of_cycle_frames': 20, // 故障每周期帧数
          'duration': 2, // 故障持续周期
          'start_position': 59, // 故障起始位置
          'lost_frame_position': 20 // 周期内故障位置
        }
      },
      repeatList: [1, 2, 3, 4, 5],
      typeList: [
        { label: '颜色缺失', value: 1 },
        { label: '颜色错误', value: 2 }
      ],
      modeList: [
        { label: '随机位置', value: 1 },
        { label: '固定位置', value: 1 }
      ]
    }
  }
}
</script>

<style scoped>

</style>
