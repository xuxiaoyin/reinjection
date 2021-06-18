<template>
  <div class="Vic8ChannelConfig">
    <el-divider content-position="left">VCI8通道配置</el-divider>
    <div class="formWrap">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="回放总线文件" prop="file_path">
          <el-select v-model="form.file_path" placeholder="请选择回放总线文件">
            <el-option v-for="item in fileList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回放时间(S)">
          <el-col :span="11">
            <el-input v-model="form.start_offset"></el-input>
          </el-col>
          <el-col :span="2" style="text-align: center;">To</el-col>
          <el-col :span="11">
            <el-input v-model="form.end_offset"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vic8ChannelConfig',
  props: {
    clickChannel: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        file_path: '',
        start_offset: '',
        end_offset: ''
      },
      fileList: [
        { label: '文件1', value: '1' },
        { label: '文件2', value: '2' },
        { label: '文件3', value: '3' },
        { label: '文件4', value: '4' }
      ]
    }
  },
  methods: {
    saveToStore() {
      this.setStore(`${this.clickChannel.channel_id}.vic8`, this.form)
    },
    getFromStore() {
      const form = this.getStore(`${this.clickChannel.channel_id}.vic8`)
      if (form) {
        this.form = JSON.parse(form)
      } else {
        this.$refs.form.resetFields()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.Vic8ChannelConfig {
  border: 1px solid #DCDFE6;
  border-top: none;
  .formWrap {
    padding-right: 20px;
  }
}
</style>
