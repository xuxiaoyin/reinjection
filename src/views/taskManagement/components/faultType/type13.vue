<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="供电故障" prop="serializer_power_error.error_type">
      <el-select v-model="form.serializer_power_error.error_type" placeholder="请选择供电故障">
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
        fault_type: 13,
        'serializer_power_error': { // 串行器供电错误
          'error_type': 1 // 供电故障类型 1、过压 2、欠压 3、尖峰电压 4、电压精度过低
        }
      },
      typeList: [
        { label: '过压', value: 1 },
        { label: '欠压', value: 2 },
        { label: '尖峰电压', value: 3 },
        { label: '电压精度过低', value: 4 }
      ]
    }
  }
}
</script>

<style scoped>

</style>
