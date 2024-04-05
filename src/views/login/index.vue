<template>
  <div class="login-container">
    <LoginForm :type="'login'" @submit="handleSubmit" />
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
      };
      try {
        const data = await this.$store.dispatch("user/login", loginForm);
        console.log(data);
        this.$message.success(`欢迎${loginForm.username}`);
        this.$router.push({ path: this.redirect || "/" });
      } catch (err) {
        console.log(err);
        this.$message.error("账号或密码错误");
        this.$router.push({
          name: "Login",
          query: { redirect: this.redirect },
        });
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  height: 100%;
}
</style>
