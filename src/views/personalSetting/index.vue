<template>
  <div class="app-container">
    <el-form
      :model="adminInfo"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="adminInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input type="password" v-model="adminInfo.oldLoginPwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd">
        <el-input
          type="password"
          v-model="adminInfo.loginPwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="loginPwdConfirm">
        <el-input
          type="password"
          v-model="adminInfo.loginPwdConfirm"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >修改</el-button
        >
        <el-button @click="handleReturn">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo, logout, setUser } from "@/api/user";
import { removeToken } from "@/utils/auth";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.adminInfo.loginPwd !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.adminInfo.loginPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      adminInfo: {
        id: "",
        loginId: "", // loginId
        name: "", // 用户名
        oldLoginPwd: "", // 旧密码
        loginPwd: "", // 新密码
        loginPwdConfirm: "", // 密码确认
      },

      rules: {
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        oldLoginPwd: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        loginPwd: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        loginPwdConfirm: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getInfo().then((resp) => {
        console.log(resp);
        this.adminInfo.name = resp.data.name;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setUser(this.adminInfo).then((resp) => {
            console.log(resp);
            this.$message.success("修改成功");
            removeToken();
            this.$router.push({ path: "/login" });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    handleReturn() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
