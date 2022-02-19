import { DirectiveOptions } from "vue";
import RootModule from "@/store/rootStore";

const permission: DirectiveOptions = {
  inserted(el, binding): void {
    // 拿到指令的值，应该是角色数组
    const { value: pRoles } = binding;

    const roles = RootModule.getRoles;
    if (pRoles?.length > 0) {
      const hasPermission = roles.some((role) => {
        return pRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode?.removeChild(el);
      }
    } else {
      throw new Error("需要指定按钮需要的角色数组");
    }
  },
};

export default permission;
