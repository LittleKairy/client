<template>
  <el-popover placement="top" width="160" v-model="visible">
    <p>确定删除吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false"
        >取消</el-button
      >
      <el-button
        type="primary"
        size="mini"
        @click="
          () => {
            handleClick();
            visible = false;
          }
        "
        >确定</el-button
      >
    </div>
    <el-button slot="reference">删除</el-button>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleClick() {
      this.$emit("deleteBtnClick");
    },
  },
};
</script>
