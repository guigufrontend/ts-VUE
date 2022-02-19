import store from "@/store";
import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础url地址
  timeout: 5000, // 超时时间
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // token 存在
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers["Authorization"] = "bearer" + token;
    }
    return config;
  },
  (error) => {
    // 请求错误的处理
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 1) {
      Message({
        message: res.message || "Erroe",
        type: "error",
        duration: 5 * 1000,
      });
    }
    // 假设10008 非法令牌 10012 其他客户已登陆 10014 令牌过期
    if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
      MessageBox.confirm("登陆状态异常，请重新登陆", "确认登陆信息", {
        confirmButtonText: "重新登陆",
        cancelButtonText: "取消",
        type: "waring",
      }).then(() => {
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });
      });
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 5000,
    });
    return Promise.reject(error);
  }
);

export default axios;
