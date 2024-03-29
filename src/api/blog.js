import request from "@/utils/request";

export function getBlogs(page = 1, limit = 10) {
  return request({
    url: "/api/blog",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}

export function deleteBlog(blogId) {
  return request({
    url: `/api/blog/${blogId}`,
    method: "delete",
  });
}

export function addBlog(data) {
  return request({
    url: "/api/blog",
    method: "post",
    data,
  });
}

// 根据 id 查找某一篇文章
export function findOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: "get",
  });
}

// 编辑文章
// 倒时候调用这个接口时，需要传递一个对象
// {
//     id : 要修改的文章的 id,
//     data : 修改的文章的所有内容
// }
export function editBlog(blogInfo) {
  return request({
    url: `/api/blog/${blogInfo.id}`,
    method: "put",
    data: blogInfo.data,
  });
}
