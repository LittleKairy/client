<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="pageList" border style="width: 100%">
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">
          {{ (currentPage - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="检测目标" width="250" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="点击在新标签页中查看视频"
            placement="top"
          >
            <el-image
              :src="scope.row.path"
              @click="showVideo(scope.row.path)"
            ></el-image>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="检测日期" align="center">
        <!-- 这里对时间戳进行处理 -->
        <template slot-scope="scope">{{ scope.row.time }} </template>
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
import { getVideoHist } from "@/api/history";
import formatDate from "@/utils/formatDate";
import deleteBtn from "@/components/deleteBtn.vue";
import PagerVue from "@/components/Pager.vue";

export default {
  components: { deleteBtn, PagerVue },
  data() {
    return {
      list: [],
      type: "img", // img 或 vedio
      // 分页
      total: 0, // 总共多少项
      currentPage: 1, // 当前页数
      limit: 10, // 一页显示多少项
      pageSizes: [5, 10, 20], // 分页规则

      loading: true,
      videoSrc: null,
      dialogVisible: false,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    pageList() {
      return this.list.slice(
        (this.currentPage - 1) * this.limit,
        this.currentPage * this.limit
      );
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
      this.loading = true;
      getVideoHist().then((resp) => {
        // console.log(resp);
        let rows = [];
        for (const jsonString of resp.rows) {
          // 去掉字符串中的转义符号
          let matchResult = jsonString.match(
            /time":\s"(.+)",\s"path":\s"(.+)"/
          );

          let jsonObject = {
            time: matchResult[1],
            path: matchResult[2],
          };

          // 移除路径末尾的多余字符
          jsonObject.path = jsonObject.path.replace(/\"/, "");

          // console.log(jsonObject);
          rows.push(jsonObject);
        }
        console.log(rows);
        this.list = rows;
        this.total = resp.total;
        this.loading = false;
      });
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
    showVideo(path) {
      console.log(path);
      window.open(path);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
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
