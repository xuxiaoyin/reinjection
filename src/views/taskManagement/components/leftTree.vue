<template>
  <div class="treeWrap">
    <el-tree :data="videoData" :props="defaultProps" highlight-current @node-click="videoNodeClick"></el-tree>
    <el-divider></el-divider>
    <el-tree :data="VCI8Data" :props="defaultProps" highlight-current @node-click="vic8NodeClick"></el-tree>
    <el-divider></el-divider>
    <el-tree :data="folderData" :props="defaultProps" highlight-current @node-click="folderNodeClick"></el-tree>
  </div>
</template>

<script>
export default {
  name: 'LeftTree',
  data() {
    return {
      clickChannel: {},
      type: '',
      videoData: [{
        label: '视频注入卡',
        children: [
          {
            label: '视频注入卡1',
            children: [
              { label: '通道1', channel_id: 'CH1' },
              { label: '通道2', channel_id: 'CH2' },
              { label: '通道3', channel_id: 'CH3' },
              { label: '通道4', channel_id: 'CH4' }
            ]
          },
          {
            label: '视频注入卡2',
            children: [
              { label: '通道1', channel_id: 'CH5' },
              { label: '通道2', channel_id: 'CH6' },
              { label: '通道3', channel_id: 'CH7' },
              { label: '通道4', channel_id: 'CH8' }
            ]
          }
        ]
      }],
      VCI8Data: [{
        label: 'VIC8卡',
        children: [
          {
            label: 'VIC8卡1',
            children: [
              { label: '通道1', channel_id: 'CH9' },
              { label: '通道2', channel_id: 'CH10' },
              { label: '通道3', channel_id: 'CH11' },
              { label: '通道4', channel_id: 'CH12' }
            ]
          },
          {
            label: 'VIC8卡2',
            children: [
              { label: '通道1', channel_id: 'CH13' },
              { label: '通道2', channel_id: 'CH14' },
              { label: '通道3', channel_id: 'CH15' },
              { label: '通道4', channel_id: 'CH16' }
            ]
          }
        ]
      }],
      folderData: [
        {
          label: '文件夹一',
          children: [
            {
              label: '视频文件一',
              children: [
                { label: '视频文件一' },
                { label: '视频文件二' }
              ]
            },
            {
              label: '总线文件',
              children: [
                { label: '总线文件一' },
                { label: '总线文件二' }
              ]
            },
            {
              label: '其他文件',
              children: [
                { label: '文件一' },
                { label: '文件二' }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    videoNodeClick(data) {
      this.type = 'video'
      this.clickChannel = data
      this.handleNodeClick(data)
    },
    vic8NodeClick(data) {
      this.type = 'VCI8'
      this.clickChannel = data
      this.handleNodeClick(data)
    },
    handleNodeClick(data) {
      if (data.channel_id) {
        this.$set(this.clickChannel, 'channel_id', data.channel_id)
      } else {
        this.$set(this.clickChannel, 'type', '')
        this.$set(this.clickChannel, 'channel_id', '')
      }
      this.$emit('nodeClick', this.clickChannel, this.type)
    },
    folderNodeClick(data) {
      this.type = ''
      this.clickChannel = data
      this.$emit('nodeClick', this.clickChannel, this.type)
    }
  }
}
</script>

<style scoped>

</style>
