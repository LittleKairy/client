<template>
  <div class="app-container">
    <el-input
      placeholder="请输入内容"
      v-model="input"
      class="input-with-select"
      @keyup.enter.native="addBlogType"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="等级1" value="1"></el-option>
        <el-option label="等级2" value="2"></el-option>
        <el-option label="等级3" value="3"></el-option>
        <el-option label="等级4" value="4"></el-option>
        <el-option label="等级5" value="5"></el-option>
      </el-select>
    </el-input>
    <el-button type="primary" @click="addBlogType">添加</el-button>

    <!-- 表格 -->
    <el-table :data="typeList" border style="width: 100%">
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="博客类别" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.name }} </template>
      </el-table-column>
      <el-table-column label="文章数量" align="center"
        ><template slot-scope="scope">{{ scope.row.articleCount }} </template>
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
          <delete-btn @deleteBtnClick="handleDelete(scope.row, scope.$index)"
        /></template>
      </el-table-column>
    </el-table>

    <!-- 表单 -->
    <el-dialog title="请编辑该分类信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序等级" :label-width="formLabelWidth">
          <el-select v-model="form.order" placeholder="请选择">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            () => {
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

    <!-- 添加 -->
    <!-- <div class="add">
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
    </div> -->
  </div>
</template>

<script>
import {
  getBlogTypes,
  addBlogType,
  delBlogType,
  findOneBlogType,
  updateOneBlogType,
} from "@/api/blogType";
import deleteBtn from "@/components/deleteBtn.vue";

export default {
  components: { deleteBtn },
  data() {
    return {
      input: "",
      select: "1",
      typeList: [],
      form: {
        name: "",
        order: 1,
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBlogTypes().then((res) => {
        this.typeList = res.data;
      });
    },
    handleEditStart(type, index) {
      const id = type.id;
      console.log(id);
      findOneBlogType(id).then((res) => {
        // console.log(res);
        this.form = { ...res.data };
        console.log(this.form);
      });
    },
    handleDelete(type, index) {
      delBlogType(type.id).then((res) => {
        console.log(res);
        this.fetchData();
      });
    },
    addBlogType() {
      if (this.input.trim())
        addBlogType({ name: this.input.trim(), order: this.select }).then(
          (resp) => {
            console.log(resp);
            this.fetchData();
            this.input = "";
          }
        );
    },
    handleEditConfirm() {
      console.log({ id: this.form.id, data: this.form });
      updateOneBlogType({
        id: this.form.id,
        data: this.form,
      }).then((res) => {
        console.log(res);
        this.fetchData();
      });
    },
  },
};
</script>

<style>
.el-select .el-input {
  width: 90px;
}

.input-with-select {
  width: 40%;
  margin-right: 1em;
  margin-bottom: 2em;
}
</style>
