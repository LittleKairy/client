import { login, register, resetPwd, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    user: null, // 存储登录后的用户的信息
  };
};

const state = getDefaultState();

const mutations = {
  // RESET_STATE: (state) => {
  //   Object.assign(state, getDefaultState());
  // },
  // SET_TOKEN: (state, token) => {
  //   state.token = token;
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name;
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar;
  // },
  SET_USER: (state, payload) => {
    state.user = payload;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then((response) => {
          console.log(response);
          const token = response.token;
          const username = response.username;
          setToken(token);
          commit("SET_USER", username);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user register
  register({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register(userInfo)
        .then((response) => {
          console.log(response.message);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  // 根据token恢复登录状态
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          console.log(response);
          commit("SET_USER", response.username);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  // 只删除本地token
  logout({ commit, state }) {
    removeToken(); // must remove  token  first
    resetRouter();
    // commit("RESET_STATE");

    // return new Promise((resolve, reject) => {
    //   logout()
    //     .then(() => {
    //       removeToken(); // must remove  token  first
    //       resetRouter();
    //       commit("RESET_STATE");
    //       resolve();
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  },

  // 重置密码
  resetPwd({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      resetPwd(userInfo)
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  // 重新获取token
  // resetToken({ commit }) {
  //   return new Promise((resolve) => {
  //     removeToken(); // must remove  token  first
  //     commit("RESET_STATE");
  //     resolve();
  //   });
  // },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
