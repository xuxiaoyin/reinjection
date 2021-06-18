<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="信息损坏帧帧数" prop="serializer_data_corruption.damaged_frames">
      <el-select v-model="form.serializer_data_corruption.damaged_frames" placeholder="请选择信息损坏帧帧数">
        <el-option v-for="item in typeList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="信息损坏类型" prop="serializer_data_corruption.damaged_type">
      <el-select v-model="form.serializer_data_corruption.damaged_type" placeholder="请选择信息损坏类型">
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="信息损坏的行数" prop="serializer_data_corruption.damaged_lines">
      <el-input v-model="form.serializer_data_corruption.damaged_lines" placeholder="请输入信息损坏的行数"></el-input>
    </el-form-item>
    <el-form-item v-if="form.serializer_data_corruption.damaged_type === 2" label="错误的颜色选择" prop="serializer_data_corruption.wrong_color">
      <el-input v-model="form.serializer_data_corruption.wrong_color" placeholder="请输入错误的颜色选择"></el-input>
    </el-form-item>
    <el-form-item label="故障帧触发模式" prop="serializer_data_corruption.trigger_mode">
      <el-select v-model="form.serializer_data_corruption.trigger_mode" placeholder="请选择故障帧触发模式">
        <el-option v-for="item in modeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="故障每周期帧数" prop="serializer_data_corruption.number_of_cycle_frames">
      <el-input v-model="form.serializer_data_corruption.number_of_cycle_frames" placeholder="请输入故障每周期帧数"></el-input>
    </el-form-item>
    <el-form-item label="故障持续周期" prop="serializer_data_corruption.duration">
      <el-input v-model="form.serializer_data_corruption.duration" placeholder="请输入故障持续周期"></el-input>
    </el-form-item>
    <el-form-item label="故障起始位置" prop="serializer_data_corruption.start_position">
      <el-input v-model="form.serializer_data_corruption.duration" placeholder="请输入故障起始位置"></el-input>
    </el-form-item>
    <el-form-item label="周期内故障位置" prop="serializer_data_corruption.lost_frame_position">
      <el-input v-model="form.serializer_data_corruption.lost_frame_position" placeholder="请输入周期内故障位置"></el-input>
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
        fault_type: 9,
        'serializer_data_corruption': { // 串行器数据损坏
          'damaged_frames': 1, // 信息损坏帧帧数
          'damaged_type': 1, // 信息损坏类型 1、颜色缺失 2、颜色错误
          'damaged_lines': 3, // 信息损坏的行数
          'wrong_color': '#fffff', // 颜色错误的颜色 ，当信息损坏类型为2时，这个字段才有值
          'trigger_mode': 1, // 故障帧触发模式,1、随机位置 2、固定位置
          'number_of_cycle_frames': 20, // 故障每周期帧数
          'duration': 2, // 故障持续周期
          'start_position': 59, // 故障起始位置
          'lost_frame_position': 20 // 周期内故障位置
        }
      },
      typeList: [
        { label: '颜色缺失', value: 1 },
        { label: '颜色错误', value: 2 }
      ],
      framesList: [1, 2, 3, 4, 5],
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
