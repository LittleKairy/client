<template>
  <div class="login-container">
    <LoginForm :type="'resetPwd'" />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login-container {
  height: 100%;
}
</style>
