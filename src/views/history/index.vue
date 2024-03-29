<template>
  <div class="app-container">
    <el-table :data="commentList" border style="width: 100%">
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">
          {{ (currentPage - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="快递图像" width="100" align="center">
        <!-- <template slot-scope="scope">{{ scope.row.title }} </template> -->
        <template slot-scope="scope">
          <el-image :src="scope.row.img" fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="破损程度" align="center"
        ><template slot-scope="scope">{{ scope.row.grade }} </template>
      </el-table-column>
      <el-table-column label="检测日期" align="center">
        <!-- 这里对时间戳进行处理 -->
        <template slot-scope="scope"
          >{{ formatDate(scope.row.createDate) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <delete-btn @deleteBtnClick="handleDelete(scope.row, scope.$index)"
        /></template>
      </el-table-column>
    </el-table>

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
// import { getComment, delComment } from "@/api/comment";
import formatDate from "@/utils/formatDate";
import deleteBtn from "@/components/deleteBtn.vue";
import PagerVue from "@/components/Pager.vue";
export default {
  components: { deleteBtn, PagerVue },
  data() {
    return {
      commentList: [
        {
          // id: "",
          // nickname: "",
          // content: "",
          // createDate: 1604976798936,
          // avatar: "",
          // blog: {
          //   id: "",
          //   title: "博客标题",
          // },
          img: "",
          grade: 0,
          createDate: "",
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
      // getComment(this.currentPage, this.limit).then((res) => {
      //   console.log("fetchBlogs", res);
      //   this.commentList = res.data.rows.map((it) => {
      //     return {
      //       ...it,
      //       createDate: formatDate(it.createDate),
      //     };
      //   });
      //   this.total = res.data.total;
      // });
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
    handleDelete(comment, index) {
      if (this.commentList.length === 1) {
        // delComment(comment.id).then((resp) => {
        //   console.log(resp);
        //   this.currentPage--;
        //   this.fetchData();
        // });
      } else {
        // delComment(comment.id).then((resp) => {
        //   console.log(resp);
        //   this.fetchData();
        // });
      }
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
