<template>
  <!-- app-container的类样式定义在index.css中 -->
  <div class="app-container">
    <el-table :data="projects" border style="width: 100%">
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="180" align="center">
        <template slot-scope="scope"
          ><a :href="scope.row.url" target="_blank"
            >{{ scope.row.name }}
          </a></template
        >
      </el-table-column>
      <el-table-column label="项目描述" align="center"
        ><template slot-scope="scope">
          <p v-for="(item, i) in scope.row.description" :key="i">{{ item }}</p>
        </template>
      </el-table-column>
      <el-table-column label="预览图" width="180" align="center">
        <template slot-scope="scope"
          ><div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]"
            >
            </el-image></div
        ></template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.github" target="_blank"
            ><i class="iconfont icon-github"></i
          ></a>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="
                () => {
                  handleEdit(scope.row, scope.$index);
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
        @click="dialogFormVisible = true"
      ></el-button>
    </div>

    <!-- 表单 -->
    <el-dialog title="首页标语" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述（以,分隔）" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目在线链接" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="github链接" :label-width="formLabelWidth">
          <el-input v-model="form.github" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传预览图" :label-width="formLabelWidth">
          <upload-img-vue :imageUrl="form.thumb" @imgUpload="handleImgUpload" />
          <!-- <el-button plain @click="cancleImg">取消</el-button> -->
        </el-form-item>
        <el-form-item label="选择排序等级" :label-width="formLabelWidth">
          <el-select v-model="form.order" placeholder="请选择等级">
            <el-option
              v-for="item in orders"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option> </el-select
        ></el-form-item>
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
import uploadImgVue from "@/components/uploadImg.vue";
import base_URL from "@/urlConfig.js";
import DeleteBtn from "@/components/deleteBtn.vue";
import { addProject, getProjects, setProject, delProject } from "@/api/project";
export default {
  components: { uploadImgVue, DeleteBtn },
  data() {
    return {
      projects: [], // projects中的description为数组
      orders: [1, 2, 3, 4, 5],

      // 表单相关
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        thumb: null, // 这里的thumb不能为undefined，否则上传图片的组件响应不到数据变化
      }, // form中的description为字符串
      formLabelWidth: "120px",

      // 图片上传
      dialogImageUrl: "",
      dialogVisible: false,

      isEditing: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getProjects().then((resp) => {
        this.projects = resp.data;
        console.log(resp.data);
      });
    },
    handleEdit(project, index) {
      this.form = { ...project, description: project.description.join(",") };
      this.isEditing = true;
    },
    handleDelete(project, index) {
      delProject(project.id).then((resp) => {
        console.log(resp);
        this.fetchData();
      });
    },
    handleImgUpload(imgData) {
      this.form.thumb = base_URL + imgData;
    },

    // 这里edit的api必须传入所有的数据，不能不传thumb
    // cancleImg() {
    //   if (this.form.thumb) {
    //     this.form.thumb = "";
    //   }
    // },
    handleEditConfirm() {
      const desc = [...this.form.description.split(",")]; // 包括只有一个描述的情况（api必须传入数组）
      const data = { ...this.form, description: desc };
      if (this.isEditing) {
        // 修改
        setProject(this.form.id, data).then((resp) => {
          console.log(resp);
          this.isEditing = false;
          this.fetchData();
          this.from = { thumb: null };
        });
      } else {
        // 添加
        addProject(data).then((resp) => {
          console.log(resp);
          this.fetchData();
          this.form = { thumb: null };
        });
      }
    },
    handleEditCancle() {
      this.form = { thumb: null };
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
.iconfont {
  font-size: 3em;
  vertical-align: middle;
}
</style>
