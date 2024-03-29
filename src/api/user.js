import request from "@/utils/request";

// params:  username、password
// 密码正确返回jsonify({'message':'Login successful','token': token.decode('utf-8')}), 200
// 错误返回jsonify({'message': 'Invalid username or password'}), 401
export function login(data) {
  // return request({
  //   url: "/vue-admin-template/user/login",
  //   method: "post",
  //   data,
  // });
  return request({
    url: "/api/login",
    method: "post",
    data,
  });
}

// params:  username、password
// 信息为空返回 jsonify({'message': 'The user or password cannot be empty'}), 400
// 用户已存在返回 jsonify({'message': 'Username already exists'}), 400
// 密码格式不规范返回 jsonify({'message': 'The password must be at least 8 digits long and contain uppercase and lowercase letters, numbers, and special characters'}), 400
// 成功注册返回jsonify({'message': 'Registration successful'}), 201
export function register(data) {
  return request({
    url: "/api/register",
    method: "post",
    data,
  });
}

export function getInfo() {
  // return request({
  //   url: "/vue-admin-template/user/info",
  //   method: "get",
  //   params: { token },
  // });
  const resp = request({
    url: "/api/whoami",
    method: "get",
  });
  // console.log("getInfo>>>>", resp);
  return resp;
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
