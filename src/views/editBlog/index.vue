<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" ref="input"></el-input>
      </el-form-item>
      <el-form-item label="文章编辑">
        <editor height="600px" ref="toastuiEditor" @change="onEditorChange" />
      </el-form-item>
      <el-form-item label="文章描述">
        <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="文章头图">
        <upload-img :imageUrl="form.img" @imgUpload="handleBigImgUpload" />
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="form.type" placeholder="请选择文章分类">
          <el-option
            v-for="type in blogTypes"
            :key="type.id"
            :label="type.name"
            :value="type.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button @click="clearForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import UploadImg from "@/components/uploadImg.vue";
import { getBlogTypes } from "@/api/blogType.js";
import base_URL from "@/urlConfig";
import { findOneBlog, editBlog } from "@/api/blog";
export default {
  components: {
    Editor,
    UploadImg,
  },
  data() {
    return {
      id: null,
      form: {
        title: "",
        htmlContent: "",
        desc: "",
        img: "",
        type: "",
      },
      blogTypes: [],
    };
  },
  created() {
    getBlogTypes().then((resp) => {
      console.log(resp);
      this.blogTypes = resp.data;
    });

    this.id = this.$route.query.id;
    console.log(this.id);
    findOneBlog(this.id).then(({ data }) => {
      console.log(data);
      this.form = {
        title: data.title,
        htmlContent: data.htmlContent,
        type: data.category.id,
        desc: data.description,
        img: data.thumb,
      };
      this.$refs.input.focus();
      this.$refs.toastuiEditor.invoke("setHTML", this.form.htmlContent, false);
    });
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log(this.form);
      console.log("submit!");

      // 图片可选，其他必填
      const data = {
        title: this.form.title,
        description: this.form.desc,
        createDate: Date.now(), // 时间戳
        categoryId: this.form.type,
        toc: [], // 目录，目录由服务器根据markdown内容生成，post请求中只需传递空数组即可
        markdownContent: this.form.markdown, // 传递markdown用于服务器生成html
        htmlContent: this.form.htmlContent,
        thumb: this.form.img, //图片地址
      };

      console.log(data);
      if (data.title && data.description && data.htmlContent) {
        editBlog({ id: this.id, data: data }).then((resp) => {
          console.log(resp);
          if (typeof resp !== "string") {
            this.form = {};
            this.$refs.toastuiEditor.invoke("setHTML", "", false);
            this.$message.success("修改成功");
            this.$router.push({ path: "/blog/list" });
          }
        });
      } else this.$message.error("请填写所有内容");
    },
    handleBigImgUpload(data) {
      this.form.img = base_URL + data;
    },

    // 获取markdown编辑器中的html
    getHTML() {
      this.form.htmlContent = this.$refs.toastuiEditor.invoke("getHTML");
    },
    getMarkdown() {
      this.form.markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
    },
    onEditorChange() {
      this.getHTML();
      this.getMarkdown();
    },
    clearForm() {
      this.form = {};
      this.$refs.toastuiEditor.invoke("setHTML", "", false);
      window.scrollTo({
        top: 0,
        behavior: "smooth", // 可选，实现平滑滚动
      });
    },
  },
};
</script>
