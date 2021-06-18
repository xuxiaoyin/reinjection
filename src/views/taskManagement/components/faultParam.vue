<template>
  <div class="faultParam">
    <el-divider content-position="left">故障参数配置</el-divider>
    <div class="formWrap">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="故障类型" prop="fault_type">
          <el-select v-model="form.fault_type">
            <el-option v-for="item in faultTypeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <component :is="type" :clickChannel="clickChannel" ref="type"></component>
    </div>
  </div>
</template>

<script>
import Type1 from './faultType/type1'
import Type2 from './faultType/type2'
import Type3 from './faultType/type3'
import Type4 from './faultType/type4'
import Type5 from './faultType/type5'
import Type6 from './faultType/type6'
import Type7 from './faultType/type7'
import Type8 from './faultType/type8'
import Type9 from './faultType/type9'
import Type10 from './faultType/type10'
import Type11 from './faultType/type11'
import Type12 from './faultType/type12'
import Type13 from './faultType/type13'
import Type14 from './faultType/type14'
export default {
  name: 'FaultParam',
  components: { Type1, Type2, Type3, Type4, Type5, Type6, Type7, Type8, Type9, Type10, Type11, Type12, Type13, Type14 },
  computed: {
    type() {
      return `Type${this.form.fault_type}`
    }
  },
  props: {
    clickChannel: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        fault_type: 1
        // 故障类型,1、帧传输延迟 2、帧丢失 3、信息插入 4、错误信息顺序 5、信息损坏 6、通道阻塞 7、帧重复 8、串行器数据丢失
        // 9、串行器数据损坏 10、帧冻结 11、串行器通信中断 12、串行器通信错误 13、传感器供电故障 14、串行器供电故障
      },
      faultTypeList: [
        { label: '帧传输延迟', value: 1 },
        { label: '帧丢失', value: 2 },
        { label: '信息插入', value: 3 },
        { label: '错误信息顺序', value: 4 },
        { label: '信息损坏', value: 5 },
        { label: '通道阻塞', value: 6 },
        { label: '帧重复', value: 7 },
        { label: '串行器数据丢失', value: 8 },
        { label: '串行器数据损坏', value: 9 },
        { label: '帧冻结', value: 10 },
        { label: '串行器通信中断', value: 11 },
        { label: '串行器通信错误', value: 12 },
        { label: '传感器供电故障', value: 13 },
        { label: '串行器供电故障', value: 14 }
      ]
    }
  },
  methods: {
    saveToStore() {
      this.setStore(`${this.clickChannel.channel_id}.fault`, this.form)
      this.$refs.type.saveToStore()
    },
    getFromStore() {
      const form = this.getStore(`${this.clickChannel.channel_id}.fault`)
      if (form) {
        this.form = JSON.parse(form)
      } else {
        this.$refs.form.resetFields()
      }
      this.$refs.type.getFromStore()
    }
  }
}
</script>

<style scoped lang="scss">
.faultParam {
  border: 1px solid #DCDFE6;
  border-top: none;
  .formWrap {
    height: calc(100vh - 490px);
    overflow: auto;
    padding-right: 20px;
  }
}
</style>
