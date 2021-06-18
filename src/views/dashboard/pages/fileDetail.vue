<template>
  <div class="fileDetail-container">
    <el-tabs tab-position="left" style="height: 100%">
      <el-tab-pane v-for="(item, index) in tabData" :key="index" :label="item.label">
        <file-list :list =item.list :total="item.total"></file-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FileList from '../compontents/fileList'
export default {
  name: 'FileDetail',
  components: {
    FileList
  },
  data() {
    return {
      tabData: [
        { label: '视频文件', list: [], total: 0, boxId: 'videoFile' },
        { label: '总线文件', list: [], total: 0, boxId: 'busFile' },
        { label: '其他文件', list: [], total: 0, boxId: 'otherFile' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.fileDetail {
  &-container {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-shadow: 0 2px 8px 2px rgba(0, 0, 0, .05);
    border-radius: 2px;
    background: #fff;
  }
}
</style>
