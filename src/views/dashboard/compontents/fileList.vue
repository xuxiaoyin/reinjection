<template>
  <waterfall
    :item-obj="list"
    :callback="callback"
    :total-data="total"
    :line-gap="410"
    :boxId="boxId"
    :min-line-gap="250"
    :show-waterfall-footer="true"
  >
    <!-- card start -->
    <template v-slot:item-header="item">
      <el-tooltip
        :open-delay="300"
        class
        effect="dark"
        :content="item.data.fileName"
        placement="top-start"
      >
        <span class="aboutText ellipsis">名称：{{ item.data.fileName }}</span>
      </el-tooltip>
    </template>
    <template slot="item-content" slot-scope="item">
      <div>
        <el-row>
          <el-col :span="24" class="el-col-left aboutText">
            文件大小：{{ item.data.fileSize }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="el-col-left aboutText">
            创建时间：{{ item.data.cjsj }}</el-col>
        </el-row>
      </div>
    </template>
    <template v-slot:item-buttons="item">
      <el-tooltip :open-delay="300" content="视频预览" placement="bottom">
        <svg-icon icon-class="videoPreview" class-name="icon" @click.prevent.stop="videoPreview(item.data)"/>
      </el-tooltip>
    </template>
    <!-- card end -->
    <!-- grid start -->
    <template v-slot:grid-content>
      <el-table
        :border="false"
        :data="list"
        stripe
        style="min-width:768px;"
        height="100%"
      >
        <el-table-column prop="fileName" align="left" label="名称"></el-table-column>
        <el-table-column prop="fileSize" align="left" label="文件大小"></el-table-column>
        <el-table-column
          prop="cjsj"
          align="left"
          sortable
          label="创建时间"
        >
          <template slot-scope="scope">
            {{ scope.row.cjsj }}
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作" width="110">
          <template slot-scope="scope">
            <el-tooltip
              :open-delay="300"
              content="视频预览"
              placement="bottom"
            >
              <svg-icon icon-class="videoPreview" class-name="icon" @click.prevent.stop="videoPreview(scope.row)"/>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- grid end -->
  </waterfall>
</template>

<script>
import Waterfall from '@/components/Waterfall/Waterfall.vue'
export default {
  name: 'FileList',
  components: { Waterfall },
  props: {
    list: {
      type: Array
    },
    total: {
      type: Number,
      default: 0
    },
    boxId: {
      type: String
    }
  },
  methods: {
    videoPreview() {},
    callback() {
      this.$emit('callback')
    }
  }
}
</script>

<style scoped>

</style>
