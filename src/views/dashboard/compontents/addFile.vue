<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    append-to-body
    width="30%"
  >
    <el-form ref="form" label-width="100px" :model="form" :rules="rules" size="small">
      <el-form-item prop="fileName" label="文件名称">
        <el-input v-model="form.fileName"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddFile',
  props: {
    title: String,
    currentRow: Object
  },
  data() {
    return {
      isShow: false,
      form: {
        fileName: ''
      },
      rules: {
        fileName: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show() {
      this.isShow = true
      this.$nextTick(() => {
        this.initForm()
      })
    },
    initForm() {
      if (this.title === '新增文件') {
        this.form.fileName = ''
      } else {
        this.form.fileName = this.currentRow.clbh
      }
      this.$refs.form.clearValidate()
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isShow = false
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
