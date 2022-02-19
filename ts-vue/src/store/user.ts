import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "./index";

// export default {
//   // namespace: "user",
//   namespaced: true,
//   state: () => ({}),
//   mutations: {},
//   actions: {
//     async getInfo({ state, commit, rootState, dispatch }) {
//       const roles = ["role1"];
//       commit("setRoles", roles, { root: true });
//       return new Promise((resolve, reject) => {
//         resolve(roles);
//       });
//     },
//   },
//   getters: {},
// };

@Module({ dynamic: true, store: store, name: "user", namespaced: true })
class UserModule extends VuexModule {
  @Action
  getInfo(): Promise<{ roles: string[] }> {
    const roles = ["role1"];
    this.context.commit("root/setRoles", roles, { root: true });
    return new Promise((resolve, reject) => {
      resolve({ roles });
    });
  }
}
export default getModule(UserModule);
