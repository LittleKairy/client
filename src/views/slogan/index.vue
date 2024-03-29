<template>
  <!-- app-container的类样式定义在index.css中 -->
  <div class="app-container">
    <el-table :data="banners" border style="width: 100%">
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="标题" width="180" align="center">
        <!-- <template slot-scope="scope">{{ scope.row.title }} </template> -->
        <template slot-scope="scope">{{ scope.row.title }} </template>
      </el-table-column>
      <el-table-column label="描述" align="center"
        ><template slot-scope="scope">{{ scope.row.description }} </template>
      </el-table-column>
      <el-table-column label="中图预览" width="180" align="center">
        <template slot-scope="scope"
          ><div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.midImg"
              :preview-src-list="[scope.row.midImg]"
            >
            </el-image></div
        ></template>
      </el-table-column>
      <el-table-column label="大图预览" width="180" align="center">
        <template slot-scope="scope"
          ><div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.bigImg"
              :preview-src-list="[scope.row.bigImg]"
            >
            </el-image></div
        ></template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="
                () => {
                  handleEditStart(scope.row, scope.$index);
                  dialogFormVisible = true;
                }
              "
            ></el-button>
          </el-tooltip>
          <delete-btn @deleteBtnClick="handleDelete(scope.row, scope.$index)" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加 -->
    <div class="add">
      <el-button
        type="primary"
        icon="el-icon-plus"
        circle
        @click="
          () => {
            dialogFormVisible = true;
          }
        "
      ></el-button>
    </div>

    <!-- 表单 -->
    <el-dialog title="首页标语" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12"
            ><el-form-item label="中图" :label-width="formLabelWidth">
              <upload-img-vue
                :imageUrl="form.midImg"
                @imgUpload="handleMidImgUpload"
              />
              <el-button plain @click="cancleMidImg"
                >取消</el-button
              ></el-form-item
            ></el-col
          >
          <el-col :span="12"
            ><el-form-item label="大图" :label-width="formLabelWidth">
              <upload-img-vue
                :imageUrl="form.bigImg"
                @imgUpload="handleBigImgUpload"
              />
              <el-button plain @click="cancleBigImg"
                >取消</el-button
              ></el-form-item
            ></el-col
          >
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            () => {
              handleEditCancle();
              dialogFormVisible = false;
            }
          "
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="
            () => {
              handleEditConfirm();
              dialogFormVisible = false;
            }
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanners, setBanner } from "@/api/banner";
import uploadImgVue from "@/components/uploadImg.vue";
import base_URL from "@/urlConfig.js";
import DeleteBtn from "@/components/deleteBtn.vue";
export default {
  components: { uploadImgVue, DeleteBtn },
  data() {
    return {
      banners: [],

      // 表单
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
      },
      formLabelWidth: "120px",

      // 图片上传
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBanners().then((resp) => {
        this.banners = resp.data;
      });
    },
    initForm() {
      this.form = {
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
      };
    },
    handleEditStart(banner, index) {
      this.form = { ...banner };
      this.banners[index].isEditing = true;
    },
    handleMidImgUpload(imgData) {
      this.form.midImg = base_URL + imgData;
    },
    handleBigImgUpload(imgData) {
      this.form.bigImg = base_URL + imgData;
    },
    async handleEditConfirm() {
      const index = this.banners.findIndex((item) => item.isEditing);
      if (index >= 0) {
        await setBanner(
          this.banners.map((item) => {
            if (item.isEditing) return this.form;
            else return item;
          })
        ).then((resp) => console.log(resp));
        this.fetchData();
        this.initForm();
        // api要求发送所有的首页标语
      } else {
        if (this.form !== {}) {
          // 添加了一个banner
          this.banners.push(this.form);
          await setBanner(this.banners).then((resp) => console.log(resp));
          this.initForm();
        }
      }
    },
    handleEditCancle() {
      const index = this.banners.findIndex((item) => item.isEditing);
      if (index >= 0) {
        this.banners[index].isEditing = false;
        this.initForm();
      } else {
        this.initForm();
      }
    },
    cancleMidImg() {
      if (this.form.midImg) {
        this.form.midImg = "";
      }
    },
    cancleBigImg() {
      if (this.form.bigImg) this.form.bigImg = "";
    },
    async handleDelete(banner, index) {
      this.banners.splice(index, 1);
      await setBanner(this.banners).then((resp) => console.log(resp));
    },
  },
};
</script>

<style scoped>
.add {
  position: fixed;
  right: 2em;
  bottom: 2em;
  opacity: 0.8;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
}
</style>
