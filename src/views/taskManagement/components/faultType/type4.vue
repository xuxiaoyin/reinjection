<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="调换顺序帧帧数" prop="error_message_sequence.number_of_frames">
      <el-select v-model="form.error_message_sequence.number_of_frames" placeholder="请选择调换顺序帧帧数">
        <el-option v-for="item in framesList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="调整前帧顺序" prop="error_message_sequence.original_order">
      <div v-for="(item, index) in original_order" :key="index">
        <div class="inputGroup" :class="{'noPading': index === original_order.length - 1}" :style="{width: 100 / original_order.length + '%'}">
          <el-input v-model="original_order[index]"></el-input>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="调整后帧顺序" prop="error_message_sequence.transformation_order">
      <div v-for="(item, index) in transformation_order" :key="index">
        <div class="inputGroup" :class="{'noPading': index === transformation_order.length - 1}" :style="{width: 100 / transformation_order.length + '%'}">
          <el-input v-model="transformation_order[index]"></el-input>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="故障注入模式" prop="error_message_sequence.injection_mode">
      <el-select v-model="form.error_message_sequence.injection_mode" placeholder="请选择故障注入模式">
        <el-option v-for="item in modeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="故障注入位置" prop="error_message_sequence.injection_location">
      <el-input placeholder="请输入故障注入位置" v-model="form.error_message_sequence.injection_location"></el-input>
    </el-form-item>
    <el-form-item label="故障注入时间(S)" prop="error_message_sequence.injection_time">
      <el-input placeholder="请输入故障注入位置" v-model="form.error_message_sequence.injection_time"></el-input>
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
        fault_type: 4,
        'error_message_sequence': { // 错误信息顺序
          'number_of_frames': 4, // 调换顺序帧帧数
          'original_order': '1,2,3,4', // 调整前帧顺序
          'transformation_order': '4,3,2,1', // 调整后帧顺序
          'injection_mode': 1, // 注入模式 1、随机触发 2、固定时间点触发
          'injection_location': 36, // 注入位置
          'injection_time': 778 // 故障注入时间 ,秒为单位
        }
      },
      framesList: [2, 3, 4, 5],
      modeList: [
        { label: '随机触发', value: 1 },
        { label: '固定时间点触发', value: 2 }
      ],
      original_order: [],
      transformation_order: []
    }
  },
  mounted() {
    this.original_order = this.form.error_message_sequence.original_order.split(',')
    this.transformation_order = this.form.error_message_sequence.transformation_order.split(',')
  }
}
</script>

<style lang="scss">
.inputGroup {
  float: left;
  padding-right: 20px;
  .el-input__inner {
    text-align: center;
  }
}
.noPading {
  padding-right: 0;
}
</style>
