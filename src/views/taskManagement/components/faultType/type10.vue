<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="重复帧帧数" prop="frame_freezing.repeat_frames">
      <el-select v-model="form.frame_freezing.repeat_frames" placeholder="请选择重复帧帧数">
        <el-option v-for="item in framesList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="信息损坏类型" prop="frame_freezing.damaged_type">
      <el-select v-model="form.frame_freezing.damaged_type" placeholder="请选择信息损坏类型">
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="故障帧触发模式" prop="frame_freezing.trigger_mode">
      <el-select v-model="form.frame_freezing.trigger_mode" placeholder="请选择故障帧触发模式">
        <el-option v-for="item in modeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="故障每周期帧数" prop="frame_freezing.number_of_cycle_frames">
      <el-input v-model="form.frame_freezing.number_of_cycle_frames" placeholder="请输入故障每周期帧数"></el-input>
    </el-form-item>
    <el-form-item label="故障持续周期" prop="frame_freezing.duration">
      <el-input v-model="form.frame_freezing.duration" placeholder="请输入故障持续周期"></el-input>
    </el-form-item>
    <el-form-item label="故障起始位置" prop="frame_freezing.start_position">
      <el-input v-model="form.frame_freezing.start_position" placeholder="请输入故障起始位置"></el-input>
    </el-form-item>
    <el-form-item label="周期内故障位置" prop="frame_freezing.lost_frame_position">
      <el-input v-model="form.frame_freezing.lost_frame_position" placeholder="请输入周期内故障位置"></el-input>
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
        fault_type: 10,
        'frame_freezing': { // 帧冻结
          'repeat_frames': 1, // 重复帧帧数
          'damaged_type': 1, // 信息损坏类型 1、颜色缺失 2、颜色错误
          'trigger_mode': 1, // 故障帧触发模式,1、随机位置 2、固定位置
          'number_of_cycle_frames': 20, // 故障每周期帧数
          'duration': 2, // 故障持续周期
          'start_position': 59, // 故障起始位置
          'lost_frame_position': 20 // 周期内故障位置
        }
      },
      framesList: [1, 2, 3, 4, 5],
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
