<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="故障触发" prop="serializer_communication_interruption.fault_trigger_type">
      <el-select v-model="form.serializer_communication_interruption.fault_trigger_type" placeholder="请选择故障触发">
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
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
        fault_type: 11,
        'serializer_communication_interruption': { // 串行器通信中断
          'fault_trigger_type': 1 // 故障触发选择 1、使能 2、取消
        }
      },
      typeList: [
        { label: '使能', value: 1 },
        { label: '取消', value: 2 }
      ]
    }
  }
}
</script>

<style scoped>

</style>
