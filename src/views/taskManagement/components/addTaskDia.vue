<template>
  <el-dialog
    title="新建任务"
    :visible.sync="isShow"
    append-to-body
    width="40%"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="small">
      <el-form-item label="任务名称" prop="task_name">
        <el-input placeholder="请输入任务名称" v-model="form.task_name"></el-input>
      </el-form-item>
      <el-form-item label="视频注入卡" prop="video_card_id">
        <el-select v-model="form.video_card_id" multiple filterable placeholder="请选择视频注入卡">
          <el-option v-for="item in videoCardList" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="VCI8卡" prop="VCI8_card_id">
        <el-select v-model="form.VCI8_card_id" multiple filterable placeholder="请选择VCI8卡">
          <el-option v-for="item in VCI8CardList" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件夹" prop="folder_path">
        <el-select v-model="form.folder_path" filterable placeholder="请选择文件夹">
          <el-option v-for="item in folderList" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
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
  name: 'AddTaskDia',
  data() {
    return {
      isShow: false,
      form: {
        task_name: '',
        video_card_id: [],
        VCI8_card_id: [],
        folder_path: ''
      },
      videoCardList: [
        { id: 1, label: '视频卡1' },
        { id: 2, label: '视频卡2' },
        { id: 3, label: '视频卡3' },
        { id: 4, label: '视频卡4' }
      ],
      VCI8CardList: [
        { id: 1, label: 'VCI8卡1' },
        { id: 2, label: 'VCI8卡2' },
        { id: 3, label: 'VCI8卡3' },
        { id: 4, label: 'VCI8卡4' },
        { id: 5, label: 'VCI8卡5' },
        { id: 6, label: 'VCI8卡6' }
      ],
      folderList: [
        { id: 1, label: '文件夹一' },
        { id: 2, label: '文件夹二' },
        { id: 3, label: '文件夹三' },
        { id: 4, label: '文件夹四' },
        { id: 5, label: '文件夹五' },
        { id: 6, label: '文件夹六' }
      ],
      rules: {
        task_name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        video_card_id: [
          { type: 'array', required: true, message: '请至少选择一个视频注入卡', trigger: 'change' }
        ],
        VCI8_card_id: [
          { type: 'array', required: true, message: '请至少选择一个VCI8卡', trigger: 'change' }
        ],
        folder_path: [
          { required: true, message: '请选择文件夹', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    show() {
      this.isShow = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$router.push({
            name: 'TaskEdite'
          })
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
