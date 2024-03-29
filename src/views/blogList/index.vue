<template>
  <div class="app-container">
    <el-table :data="blogList" border style="width: 100%">
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">
          {{ (currentPage - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="文章名称" width="180" align="center">
        <!-- <template slot-scope="scope">{{ scope.row.title }} </template> -->
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="200"
            trigger="hover"
          >
            <el-image :src="scope.row.thumb" fit="contain"></el-image>
            <a href="" slot="reference">{{ scope.row.title }}</a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="文章描述" align="center"
        ><template slot-scope="scope">{{ scope.row.description }} </template>
      </el-table-column>
      <el-table-column label="浏览数" align="center"
        ><template slot-scope="scope">{{ scope.row.scanNumber }} </template>
      </el-table-column>
      <el-table-column label="评论数" align="center"
        ><template slot-scope="scope">{{ scope.row.commentNumber }} </template>
      </el-table-column>
      <el-table-column label="所属分类" align="center"
        ><template slot-scope="scope"
          >{{ scope.row.category ? scope.row.category.name : "未分类" }}
        </template>
      </el-table-column>
      <el-table-column label="创建日期" align="center">
        <!-- 这里对时间戳进行处理 -->
        <template slot-scope="scope">{{ scope.row.createDate }} </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row, scope.$index)"
            ></el-button>
          </el-tooltip>
          <delete-btn @deleteBtnClick="handleDelete(scope.row, scope.$index)"
        /></template>
      </el-table-column>
    </el-table>

    <!-- 添加 -->
    <div class="add">
      <el-button
        type="primary"
        icon="el-icon-plus"
        circle
        @click="handleAddBlog()"
      ></el-button>
    </div>

    <pager-vue
      style="margin-top: 2em"
      :total="total"
      :pagSize="limit"
      :currentPage="currentPage"
      :pageSizes="pageSizes"
      @currentChange="handleCurrentChange"
      @sizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import { getBlogs, deleteBlog } from "@/api/blog";
import formatDate from "@/utils/formatDate";
import deleteBtn from "@/components/deleteBtn.vue";
import PagerVue from "@/components/Pager.vue";
export default {
  components: { deleteBtn, PagerVue },
  data() {
    return {
      blogList: [
        {
          title: "",
          description: "",
          scanNumber: null,
          commentNumber: null,
          category: {
            id: null,
            name: "",
          },
          createDate: null,
          thumb: "",
        },
      ],

      // 分页
      total: 0, // 总共多少项
      currentPage: 1, // 当前页数
      limit: 10, // 一页显示多少项
      pageSizes: [5, 10, 20], // 分页规则
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    currentPage() {
      this.fetchData();
    },
    limit() {
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      getBlogs(this.currentPage, this.limit).then((res) => {
        console.log("fetchBlogs", res);
        this.blogList = res.data.rows.map((it) => {
          return {
            ...it,
            createDate: formatDate(it.createDate),
          };
        });
        this.total = res.data.total;
        console.log(this.total);
        console.log(this.blogList);
      });

      // console.log("fetchdata");
    },
    formatDate(timestamp) {
      return formatDate(timestamp);
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      console.log(this.currentPage);
    },
    handleSizeChange(newSize) {
      this.limit = newSize;
      this.currentPage = 1;
    },
    handleDelete(blog, index) {
      if (this.blogList.length === 1) {
        deleteBlog(blog.id).then((resp) => {
          console.log(resp);
          this.currentPage--;
          this.fetchData();
        });
      } else {
        deleteBlog(blog.id).then((resp) => {
          console.log(resp);
          this.fetchData();
        });
      }
    },
    handleAddBlog() {
      this.$router.push({ path: "/blog/addBlog" });
    },
    handleEdit(blog) {
      this.$router.push({
        path: "/blog/editBlog",
        query: {
          id: blog.id,
        },
      });
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
  z-index: 99;
}
</style>
