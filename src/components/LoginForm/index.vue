<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <!-- 这里的使用的图标在icons/svg目录下 -->
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>

        <!-- key属性为element ui中定义的属性 -->
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          :auto-complete="passAutoComplete"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <template v-if="!isLogin">
        <el-form-item prop="checkPass">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>

          <el-input
            :key="checkPassType"
            ref="checkPass"
            v-model="loginForm.checkPass"
            :type="checkPassType"
            placeholder="请确认密码"
            name="checkPass"
            tabindex="3"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showCheckPass">
            <svg-icon
              :icon-class="checkPassType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </template>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >{{ buttonText }}</el-button
      >

      <span class="changeRoute"
        ><router-link v-if="isLogin" :to="{ name: 'Register' }"
          >注册</router-link
        >
        <router-link v-if="isRegister || isResetPwd" :to="{ name: 'Login' }"
          >登录</router-link
        >
      </span>

      <span v-if="isLogin" class="forgetPwd"
        ><router-link :to="{ name: 'ResetPwd' }">忘记密码？</router-link></span
      >
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      typeof: String, // 值只能为login, register, resetPwd中的一种
      required: true,
    },
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validateCheckPass = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        checkPass: [
          { required: true, trigger: "blur", validator: validateCheckPass },
        ],
      },
      loading: false,
      passwordType: "password",
      checkPassType: "password",
      redirect: undefined,
    };
  },
  computed: {
    isLogin() {
      return this.type === "login";
    },
    isRegister() {
      return this.type === "register";
    },
    isResetPwd() {
      return this.type === "resetPwd";
    },
    passAutoComplete() {
      return this.isLogin ? "on" : "off";
    },
    buttonText() {
      if (this.isLogin) return "登录";
      else if (this.isRegister) return "注册";
      else return "重置密码";
    },
    title() {
      if (this.isLogin) return "Login";
      else if (this.isRegister) return "Register";
      else return "重置密码";
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    showCheckPass() {
      if (this.checkPassType === "password") {
        this.checkPassType = "";
      } else {
        this.checkPassType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 表单验证通过
          this.loading = true;
          this.$router.push({ path: this.redirect || "/" });

          // this.$store
          //   .dispatch("user/login", this.loginForm)
          //   .then((data) => {
          //     console.log(data);
          //     this.$router.push({ path: this.redirect || "/" });
          //     this.loading = false;
          //   })
          //   .catch((err) => {
          //     // 这里接收到错误的response
          //     if (typeof err === "string") {
          //       this.$message.error("验证码错误");
          //     } else {
          //       this.$message.error("账号或密码错误");
          //     }
          //     this.loading = false;
          //   });
        } else {
          return;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

input[type="password"]::-ms-reveal {
  display: none;
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.captchaContainer {
  display: flex;
  .captchaInput {
    width: 70%;
  }
}

.checkbox {
  margin-bottom: 2em;
}

.changeRoute {
  float: right;
  color: #409eff;
}

.forgetPwd {
  float: left;
  color: #409eff;
}
</style>
