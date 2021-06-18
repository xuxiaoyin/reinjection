<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-change="getFile"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :auto-upload="false">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      SignBase64: ''
    }
  },
  methods: {
    getFile(file, fileList) {
      this.fileList = fileList.slice(-1);
      this.getBase64(file.raw).then(res => {
        this.$emit('imgBase64', res);
      });
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
