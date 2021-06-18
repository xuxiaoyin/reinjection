<template>
  <div class="task-container">
    <div class="icon-wrap">
      <el-card class="task-icon task-icon1" shadow="hover">
        <div @click="newTask">
          <svg-icon icon-class="addTask"></svg-icon>
          <div class="icon-text">新建任务</div>
        </div>
      </el-card>
      <el-card class="task-icon" shadow="hover">
        <div @click="openTask">
          <svg-icon icon-class="ImportTask"></svg-icon>
          <div class="icon-text">打开任务</div>
        </div>
      </el-card>
    </div>
    <add-task-dia ref="addTaskDia"></add-task-dia>
  </div>
</template>

<script>
import AddTaskDia from './components/addTaskDia'
export default {
  name: 'TaskManagement',
  components: { AddTaskDia },
  methods: {
    // 新建任务
    newTask() {
      console.log(123)
      this.$refs.addTaskDia.show()
    },
    // 打开任务
    openTask() {}
  }
}
</script>

<style scoped lang="scss">
.task {
  &-container {
    position: relative;
    width: 100%;
    height: 100%;
    .icon-wrap {
      position: absolute;
      top: calc(50% - 100px);
      left: calc(50% - 200px);
      display: flex;
      width: 400px;
      align-content: space-between;
      .task-icon {
        flex: 1;
        padding: 10px;
        text-align: center;
        cursor: pointer;
        .svg-icon {
          display: block;
          width: 100%;
          height: 100px;
        }
        .icon-text {
          line-height: 40px;
          font-size: 16px;
        }
      }
      .task-icon1 {
        margin-right: 20px;
      }
    }
  }
}
</style>
