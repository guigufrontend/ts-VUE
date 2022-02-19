import Page1 from "@/views/Page1.vue";
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "./index";
// export default {
//   // namespace: "permission",
//   namespaced: true,
//   state: () => ({}),
//   mutations: {},
//   actions: {
//     generateRoutes({ state, commit, rootState }) {
//       return Promise.resolve([
//         {
//           path: "/Page1",
//           name: "Page1",
//           component: Page1,
//         },
//       ]);
//     },
//   },
//   getters: {},
// };

@Module({ dynamic: true, store: store, name: "permission", namespaced: true })
class PermissionModule extends VuexModule {
  @Action
  generateRoutes(roles:string[]) {
    // 这里需要根据roles筛选路由
    return Promise.resolve([
      {
        path: "/Page1",
        name: "Page1",
        component: Page1,
      },
    ]);
  }
}
export default getModule(PermissionModule);
