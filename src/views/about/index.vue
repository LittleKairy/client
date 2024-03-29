<template>
  <div class="app-container">
    <p>关于我：</p>
    <el-input
      v-model="input"
      placeholder="请输入需要链接的地址"
      class="input"
    ></el-input>
    <el-button
      type="primary"
      class="button"
      @click="handleSubmit"
      :disabled="btnDisabled"
      >确认</el-button
    >
  </div>
</template>

<script>
import { getAbout, editAbout } from "@/api/about";
import { logger } from "runjs/lib/common";
export default {
  data() {
    return {
      initUrl: "",
      input: "",
      btnDisabled: true,
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    input() {
      if (this.input !== this.initUrl) {
        this.btnDisabled = false;
      } else {
        this.btnDisabled = true;
      }
    },
  },
  methods: {
    fetchData() {
      getAbout().then((resp) => {
        console.log(resp);
        this.initUrl = resp.data;
        this.input = resp.data;
      });
    },
    handleSubmit() {
      if (this.input !== this.initUrl) {
        editAbout({ url: this.input }).then((resp) => {
          console.log(resp);
          this.initUrl = resp.data;
          this.$message.success("重置链接成功");
        });
      }
    },
  },
};
</script>

<style scoped>
.input {
  width: 50%;
}
.button {
  display: block;
  margin-top: 1.5em;
}
</style>
