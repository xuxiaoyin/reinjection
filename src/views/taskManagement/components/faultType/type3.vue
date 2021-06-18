<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="注入异常帧帧数" prop="information_insert.abnormal_frames">
      <el-select v-model="form.information_insert.abnormal_frames" placeholder="请选择注入异常帧帧数">
        <el-option v-for="item in typeList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="异常帧选择" prop="information_insert.abnormal_frames_picture">
      <upload></upload>
    </el-form-item>
    <el-form-item label="丢帧模式" prop="information_insert.frame_dropping_mode">
      <el-select v-model="form.information_insert.frame_dropping_mode" placeholder="请选择丢帧模式">
        <el-option v-for="item in modeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="故障每周期帧数" prop="information_insert.number_of_cycle_frames">
      <el-input placeholder="请输入故障每周期帧数" v-model="form.information_insert.number_of_cycle_frames"></el-input>
    </el-form-item>
    <el-form-item label="故障持续周期" prop="information_insert.duration">
      <el-input placeholder="请输入故障持续周期" v-model="form.information_insert.duration"></el-input>
    </el-form-item>
    <el-form-item label="故障起始位置" prop="information_insert.start_position">
      <el-input placeholder="请输入故障起始位置" v-model="form.information_insert.start_position"></el-input>
    </el-form-item>
    <el-form-item label="周期内故障位置" prop="information_insert.lost_frame_position">
      <el-input placeholder="请输入周期内故障位置" v-model="form.information_insert.lost_frame_position"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import saveGetMixin from '../saveGetMixin'
import Upload from '@/components/Upload'
export default {
  name: 'Type1',
  mixins: [saveGetMixin],
  components: { Upload },
  data() {
    return {
      form: {
        fault_type: 3,
        'information_insert': { // 信息插入
          'abnormal_frames': 1, // 注入异常帧帧数
          'abnormal_frames_picture': [
            {
              'picture_type': 'jpg', // 图片类型
              'picture_base64': '' // 图片base64编码后的字符串
            }
          ],
          'frame_dropping_mode': 1, // 丢帧模式  1、随机位置丢 2、固定位置丢
          'number_of_cycle_frames': 20, // 故障每周期帧数
          'duration': 2, // 故障持续周期
          'start_position': 59, // 故障起始位置
          'lost_frame_position': 20 // 周期内故障位置
        }
      },
      typeList: [1, 2, 3, 4, 5],
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
