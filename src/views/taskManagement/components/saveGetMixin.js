export default {
  props: {
    clickChannel: {
      type: Object
    }
  },
  methods: {
    saveToStore() {
      this.setStore(this.clickChannel.channel_id, this.form)
    },

    getFromStore() {
      const form = this.getStore(this.clickChannel.channel_id)
      if (form) {
        this.form = JSON.parse(form)
      } else {
        this.$refs.form.resetFields()
      }
    }
  }
}
