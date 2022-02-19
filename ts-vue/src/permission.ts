import router from "./router";
import PermissionModule from "@/store/permission";
import RootModule from "@/store/rootStore";
import UserModule from "@/store/user";

const witeList = ["/login"];

router.beforeEach(async (to, from, next) => {
  const hasToken = localStorage.getItem("token");
  // 如果用户已经登陆
  if (hasToken) {
    if (to.path === "/login") {
      // 重定向到首页
      next("/");
    } else {
      const hasRoles = RootModule.getRoles && RootModule.getRoles.length > 0;
      if (hasRoles) {
        // 如果用户已经由角色信息
        next();
      } else {
        try {
          // 获取用户角色
          const { roles } = await UserModule.getInfo();
          // 获取用户可访问的路由
          const accessRoutes = await PermissionModule.generateRoutes(roles);
          // 路由添加到路由表中
          router.addRoutes(accessRoutes);
          // 继续进入这个页面
          next({ ...to, replace: true });
        } catch (error) {
          console.log(error);
        }
      }
    }
  } else {
    //白名单页面也可以不登陆也进入
    if (witeList.includes(to.path)) {
      next();
    } else {
      //没有登陆需要登陆
      next(`/login?redirect=${to.path}`);
    }
  }
});
