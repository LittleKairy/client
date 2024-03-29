import request from "@/utils/request";

export function login(data) {
  // return request({
  //   url: "/vue-admin-template/user/login",
  //   method: "post",
  //   data,
  // });
  return request({
    url: "/api/admin/login",
    method: "post",
    data,
  });

  // 若返回验证码错误，则为字符串形式
  // 若返回账号密码错误，则为对象形式
  // 登录成功后在响应头中携带token
}

export function getInfo() {
  // return request({
  //   url: "/vue-admin-template/user/info",
  //   method: "get",
  //   params: { token },
  // });
  const resp = request({
    url: "/api/admin/whoami",
    method: "get",
  });
  // console.log("getInfo>>>>", resp);
  return resp;

  // 没有响应或者登录过期，返回字符串
  // 成功登录，返回对象
}

// 这里登出时目前不记录在服务器，只是删除本地token
export function logout() {
  // return request({
  //   url: "/vue-admin-template/user/logout",
  //   method: "post",
  // });
}

// 修改用户
export function setUser(data) {
  return request({
    url: "/api/admin",
    method: "PUT",
    data,
  });
}
