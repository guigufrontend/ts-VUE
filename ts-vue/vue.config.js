/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const port = 7070;

console.log("process.env.foo", process.env.foo);
console.log("process.env.VUE_APP_BASE_URL", process.env.VUE_APP_BASE_URL);
// 拼绝对路径的工具函数
function resolve(dir) {
  return path.join(__dirname, dir);
}
// vue inspect 命令可以打印webpack配置
// vue inspect --rules 只打印rules 也可以 -rule svg 根据rule name打印结果
module.exports = {
  publicPath: "/best-practice", // 配置地址前缀
  devServer: {
    port, // 配置开发端口号
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:3000/`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "", // 把url中的process.env.VUE_APP_BASE_API变成“”，根据实际情况设置
        },
      },
    },
  },
  // webpack配置, 这种配置不够灵活
  //   configureWebpack: {
  //     resolve: {
  //       alias: {
  //         comp: path.join(__dirname, "src/components"), // 配置别名
  //       },
  //     },
  //   },
  // 函数方式扩展webpack， config中是已经配置了的webpack配置， 这种配置loader等深嵌套的配置难以取值，太深了需要写好多xx.xx.xx
  //   configureWebpack(config) {
  //     console.log(config);
  //     config.resolve.alias.comp = path.join(__dirname, "src/components"); // 配置别名
  //     // 访问环境变量 动态配置
  //     if (process.env.NODE_ENV === "development") {
  //       // 如果是开发环境
  //       config.name = "vue项目最佳实践";
  //     } else {
  //       config.name = "这是生产环境";
  //     }
  //   },
  //   webpack 链式语法chainWebpack
  chainWebpack(config) {
    // 配置别名
    config.resolve.alias.store.set(
      "comp",
      path.join(__dirname, "src/components")
    );
    //   svg图标的加载， 已经存在的处理loader 为file-loader
    config.module
      .rule("svg") // svg的配置项
      .exclude.add(resolve("src/icon")); // 让当前处理svg的loader忽略icon文件夹, 使用resolve生成绝对路径，防止不同平台下对/解析不同
    //   svg-sprite-loader 处理svg
    config.module
      .rule("icons")
      .test(/\.svg$/) // .svg结尾的文件
      .include.add(resolve("src/icon")) // 包含src/icon中的文件
      .end() // 破坏了上下文，当前上下文变成了include的set，需要回退一层
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" }); // helloworld组件中可以使用这个icon
  },
};
