import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "./index";

@Module({ dynamic: true, store: store, name: "root", namespaced: true })
class RootModule extends VuexModule {
  roles: string[] = [];
  @Mutation
  setRoles(payload: string[]) {
    this.roles = payload;
  }

  @Action
  getInfo(): Promise<string[]> {
    const roles = ["role1"];
    this.context.commit("setRoles", roles, { root: true });
    return new Promise((resolve, reject) => {
      resolve(roles);
    });
  }
  get getRoles(): string[] {
    return this.roles;
  }
}
export default getModule(RootModule);
