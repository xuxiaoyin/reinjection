<template>
  <div class="dashboard-container">
    <!-- 瀑布流 开始 -->
    <waterfall
      :item-obj="items"
      :callback="initData"
      :total-data="total"
      :line-gap="410"
      :min-line-gap="250"
      :show-waterfall-footer="true"
      @cardClick="cardClick"
    >
      <!-- card start -->
      <template v-slot:item-header="item">
        <el-tooltip
          :open-delay="300"
          class
          effect="dark"
          :content="item.data.clbh"
          placement="top-start"
        >
          <span class="aboutText ellipsis">名称：{{ item.data.clbh }}</span>
        </el-tooltip>
      </template>
      <template slot="item-content" slot-scope="item">
        <div>
          <el-row>
            <el-col :span="24" class="el-col-left aboutText">
              创建时间：{{ item.data.cjsj }}</el-col>
          </el-row>
        </div>
      </template>
      <template v-slot:item-buttons="item">
        <el-tooltip :open-delay="300" content="编辑" placement="bottom">
          <svg-icon icon-class="edite" class-name="icon" @click.prevent.stop="editView(item.data)"/>
        </el-tooltip>
      </template>
      <!-- card end -->
      <!-- grid start -->
      <template v-slot:grid-content>
        <el-table
          :border="false"
          :data="items"
          stripe
          style="min-width:768px;"
          height="100%"
        >
          <el-table-column prop="clbh" align="left" label="名称">
            <template slot-scope="scope">
              <el-link @click="cardClick(scope.row)">{{ scope.row.clbh }}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="clzt"
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
                content="编辑"
                placement="bottom"
              >
                <svg-icon icon-class="edite" class-name="icon" @click.prevent.stop="editView(scope.row)"/>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- grid end -->
    </waterfall>
    <CustomButton :showTop="true" :isOneButton="true">
      <div>
        <el-tooltip
          :open-delay="300"
          :content="$t('btnText.addFile')"
          placement="top"
        >
          <el-button circle @click="addFile">
            <svg-icon icon-class="addFile"></svg-icon>
          </el-button>
        </el-tooltip>
      </div>
    </CustomButton>

    <add-file ref="addFile" :title="diaTitle" :currentRow="currentRow"></add-file>
  </div>
</template>

<script>
import Waterfall from '@/components/Waterfall/Waterfall.vue'
import CustomButton from '@/components/CustomButton/CustomButton.vue'
import AddFile from './compontents/addFile'

export default {
  name: 'Dashboard',
  components: { Waterfall, CustomButton, AddFile },
  data() {
    return {
      items: [
        { 'id': '1ebbf951b97d6469e81838f5cebe5d4', 'cjsj': '2021-05-28T09:14:29.000+0000', 'clbh': '文件夹1', width: 1.4, height: 0.6 },
        { 'id': '1eb9b38cb489ede91ca6dda85203238', 'clbh': '文件夹2', 'cjsj': '2021-04-12T02:42:59.000+0000', width: 1.4, height: 0.6 },
        { 'id': '1eb9b38cb489ede91ca6dda85203239', 'clbh': '文件夹3', 'cjsj': '2021-04-12T02:42:59.000+0000', width: 1.4, height: 0.6 },
        { 'id': '1eb9b38cb489ede91ca6dda85203210', 'clbh': '文件夹4', 'cjsj': '2021-04-12T02:42:59.000+0000', width: 1.4, height: 0.6 },
        { 'id': '1eb9b38cb489ede91ca6dda85203211', 'clbh': '文件夹5', 'cjsj': '2021-04-12T02:42:59.000+0000', width: 1.4, height: 0.6 },
        { 'id': '1eb9b38cb489ede91ca6dda85203212', 'clbh': '文件夹6', 'cjsj': '2021-04-12T02:42:59.000+0000', width: 1.4, height: 0.6 },
        { 'id': '1eb9b38cb489ede91ca6dda85203213', 'clbh': '文件夹7', 'cjsj': '2021-04-12T02:42:59.000+0000', width: 1.4, height: 0.6 },
        { 'id': '1eb9b38cb489ede91ca6dda85203214', 'clbh': '文件夹8', 'cjsj': '2021-04-12T02:42:59.000+0000', width: 1.4, height: 0.6 }
      ],
      total: 10,
      diaTitle: '新增',
      currentRow: {}
    }
  },
  methods: {
    initData() {},
    editView(row) {
      this.diaTitle = '编辑文件'
      this.currentRow = row
      this.$nextTick(() => {
        this.$refs.addFile.show()
      })
    },
    addFile() {
      this.diaTitle = '新增文件'
      this.$refs.addFile.show()
    },
    // 点击卡片或表格
    cardClick(item) {
      console.log(item)
      this.$router.push({
        name: 'FileDetail',
        params: {
          currentRow: { ...item }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    width: 100%;
    height: 100%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
