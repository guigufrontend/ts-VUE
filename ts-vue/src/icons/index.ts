import Vue from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

const req = require.context("./svg", false, /\.svg$/);
// req 从svg文件夹再加结尾时.svg的文件
console.log("req", req);
req.keys().map(req);
Vue.component("svg-icon", SvgIcon);
// 这个文件需要在main文件中引入，这样才能注册