<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px" label-position="top">
      <el-form-item label="网站标题">
        <el-input
          v-model="form.siteTitle"
          :placeholder="setting.siteTitle"
          :disabled="inputDisabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          v-model="form.mail"
          :placeholder="setting.mail"
          :disabled="inputDisabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="备案号">
        <el-input
          v-model="form.icp"
          :placeholder="setting.icp"
          :disabled="inputDisabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="网站头像">
        <el-image
          v-if="inputDisabled"
          style="width: 100px; height: 100px"
          :src="setting.avatar"
          fit="fill"
        ></el-image>
        <upload-img
          v-else
          :imageUrl="form.avatar"
          @imgUpload="
            (e) => {
              handleImgUpload('avatar', e);
            }
          "
        />
      </el-form-item>
      <el-form-item label="网站图标地址">
        <el-input
          v-model="form.favicon"
          :placeholder="setting.favicon"
          :disabled="inputDisabled"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="inputDisabled" label="网站图标预览"
        ><el-image
          style="width: 100px; height: 100px"
          :src="setting.favicon"
          fit="fill"
        ></el-image
      ></el-form-item>

      <el-form-item label="github 名字">
        <el-input
          v-model="form.githubName"
          :placeholder="setting.githubName"
          :disabled="inputDisabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="github 地址">
        <el-input
          v-model="form.github"
          :placeholder="setting.github"
          :disabled="inputDisabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="qq 号码">
        <el-input
          v-model="form.qq"
          :placeholder="setting.qq"
          :disabled="inputDisabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="qq二维码图片预览"
        ><el-image
          v-if="inputDisabled"
          style="width: 100px; height: 100px"
          :src="setting.qqQrCode"
          fit="fill"
        ></el-image>
        <upload-img
          v-else
          :imageUrl="form.qqQrCode"
          @imgUpload="
            (e) => {
              handleImgUpload('qq', e);
            }
          "
      /></el-form-item>
      <el-form-item label="微信 号码">
        <el-input
          v-model="form.weixin"
          :placeholder="setting.weixin"
          :disabled="inputDisabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="微信二维码图片预览">
        <el-image
          v-if="inputDisabled"
          style="width: 100px; height: 100px"
          :src="setting.weixinQrCode"
          fit="fill"
        ></el-image>
        <upload-img
          v-else
          :imageUrl="form.weixinQrCode"
          @imgUpload="
            (e) => {
              handleImgUpload('weixin', e);
            }
          "
        />
      </el-form-item>
      <el-form-item>
        <el-button v-if="inputDisabled" type="primary" @click="SatrtEdit"
          >编辑</el-button
        >
        <div v-else>
          <el-button type="primary" @click="editConfirm">确定</el-button>
          <el-button type="primary" @click="editCancle">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSetting, setSetting } from "@/api/setting";
import uploadImg from "@/components/uploadImg.vue";
import base_URL from "@/urlConfig";
export default {
  components: {
    uploadImg,
  },
  data() {
    return {
      inputDisabled: true,
      setting: {},
      form: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getSetting().then((resp) => {
        console.log(resp);
        this.setting = resp.data;
      });
    },
    SatrtEdit() {
      this.inputDisabled = false;
      this.form = { ...this.setting };
      window.scrollTo({
        top: 0,
        behavior: "smooth", // 可选，实现平滑滚动
      });
    },
    editConfirm() {
      setSetting(this.form).then((resp) => {
        console.log(resp);
        this.fetchData();
        this.inputDisabled = true;
        window.scrollTo({
          top: 0,
          behavior: "smooth", // 可选，实现平滑滚动
        });
      });
    },
    editCancle() {},
    handleAvatarUpload(data) {
      this.form.avatar = base_URL + data;
    },
    handleImgUpload(type, data) {
      const url = base_URL + data;
      if (type === "weixin") this.form.weixinQrCode = url;
      else if (type === "qq") this.form.qqQrCode = url;
      else if (type === "avatar") this.form.avatar = url;

      console.log(this.form);
    },
  },
};
</script>

<style></style>
