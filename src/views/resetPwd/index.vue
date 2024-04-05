<template>
  <div class="resetPwd-container">
    <LoginForm :type="'resetPwd'" @submit="handleSubmit" />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  components: {
    LoginForm,
  },
  methods: {
    async handleSubmit(form) {
      const loginForm = {
        username: form.username,
        password: form.password,
        newPassword: form.checkPass,
      };
      try {
        console.log(loginForm);
        const data = await this.$store.dispatch("user/resetPwd", loginForm);
        console.log(data);
        this.$message.success("重设密码成功，请返回登录界面进行登录");
        this.$router.push({ path: "/login" });
      } catch (err) {
        console.log(err);
        this.$message.error("账号或密码错误");
        this.$router.push({ path: "/resetPwd" });
      }
    },
  },
};
</script>

<style scoped>
.resetPwd-container {
  height: 100%;
}
</style>
